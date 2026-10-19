import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { CURRENT_WEEK_NEWS } from './src/data/seedNews.ts';
import { formatCreatorMinutePost, toLinkedInBoldSans } from './src/utils/postFormatter.ts';
import type { NewsItem, GenerationSettings, GeneratedPost, CarouselSlide } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI client if API key is provided
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health and API key status endpoint
app.get('/api/status', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    model: 'gemini-3.8-flash',
  });
});

// Endpoint: Autonomous Weekly Radar Scan
app.post('/api/scan-weekly', async (req: Request, res: Response) => {
  const { category = 'all', specificFocus = '', targetSource = '' } = req.body || {};

  if (!aiClient) {
    // Return curated seed data if Gemini API key is not set
    let items = category === 'all'
      ? CURRENT_WEEK_NEWS
      : CURRENT_WEEK_NEWS.filter(item => item.category === category);

    if (targetSource) {
      items = items.filter(item =>
        item.sourceName.toLowerCase().includes(targetSource.toLowerCase()) ||
        item.sourceUrl.toLowerCase().includes(targetSource.toLowerCase())
      );
      if (items.length === 0) items = CURRENT_WEEK_NEWS.slice(0, 4);
    }

    return res.json({
      items,
      source: 'curated-radar',
      summary: 'Radar cargado con las fuentes curadas verificadas de la semana.',
    });
  }

  try {
    const prompt = `Actúa como un Senior AI & Data Intelligence Curator para LinkedIn.
Investiga y sintetiza las 5 a 6 noticias, lanzamientos tangibles, repositorios de GitHub virales y novedades que más llamen la atención a la gente común y profesionales de tecnología en los últimos 7 días.

DEBES PRIORIZAR Y RASTREAR EXPLÍCITAMENTE INFORMACIÓN PUBLICADA O DISCUTIDA EN ESTOS PORTALES Y HUBS DE REFERENCIA:
🚀 Lanzamientos Tangibles, Herramientas & Repositorios Virales (Lo que a la gente común le llama la atención):
- GitHub Trending (github.com/trending) - Repositorios open source con miles de estrellas (ej. Browser-Use, ArtCraft, Ollama, Open-WebUI, Whisper local).
- Product Hunt AI (producthunt.com/topics/artificial-intelligence) - Nuevos productos, apps y extensiones que cualquiera puede usar hoy.
- Hugging Face Spaces (huggingface.co/spaces) - Demos web interactivas y modelos abiertos sin coste.

🇪🇸 Portales y Blogs en Español:
- Aprender Big Data (aprenderbigdata.com) - Arquitecturas Spark, Kafka, streaming, lakehouse.
- Conceptos Claros (conceptosclaros.com) - Estadística y analítica aplicada sin tecnicismos oscuros.
- Datapath Blog (datapath.ai/blog) - Data engineering y automatizaciones con IA.
- The Bridge Blog (thebridge.tech/blog) - Tendencias, herramientas de data science y empleo tech.
- IEBS School Data & Analytics (iebschool.com/hub) - Analítica web y métricas de negocio.
- Roadmap de Data Engineering en Español (github.com/natayadev/dataengineering-roadmap).

🤖 Inteligencia Artificial (IA) — Global:
- TLDR AI (tldr.tech/ai) - Resúmenes diarios de papers, herramientas open source y lanzamientos.
- The Batch por Andrew Ng (deeplearning.ai/the-batch) - Análisis crítico semanal.
- Ben's Bites (bensbites.co) - Nuevos productos y extensiones de IA generativa.
- MIT Technology Review (technologyreview.com) - Cobertura periodística profunda.

📊 Analítica de Datos y Business Intelligence (BI) — Global:
- Towards Data Science (towardsdatascience.com) - Casos prácticos de machine learning, BI y visualización.
- Analytics Vidhya (analyticsvidhya.com) - Guías paso a paso y analítica aplicada.
- KDnuggets (kdnuggets.com) - Software analítico y opiniones expertas.
- Data Science Central (datasciencecentral.com) - Webinars técnicos y analítica de datos.

💾 Big Data e Ingeniería de Datos — Global:
- Data Engineering Weekly (dataengineeringweekly.com) - Infraestructuras modernas de datos, Iceberg, dbt, warehouses y ETLs.
- Datanami (datanami.com) - Computación de alto rendimiento y bases de datos a gran escala.
- Data Council (datacouncil.ai) - Stacks de datos modernos de ingenieros líderes.

ADEMÁS, RASTREA DECLARACIONES Y POSTURAS DE ESTOS EXPERTOS DE REFERENCIA:
- Andrew Ng (DeepLearning.AI) - modelos destilados de 8B/14B vs LLMs monolíticos.
- Andrej Karpathy (Eureka Labs / OpenAI) - ingeniería asistida por agentes (Cursor, Claude Code, REA).
- Cassie Kozyrkov (ex-Google) - fin de métricas de vanidad y trazabilidad auditable.
- Simon Willison (Datasette) - Model Context Protocol (MCP) y herramientas abiertas.
- Chip Huyen - infraestructura de contexto y datos para agentes en producción.
- Zach Wilson (DataExpert.io) - Apache Iceberg y el fin del secuestro de datos.
- Allie K. Miller - IA práctica integrada en Workspace (Sheets, Docs, Slides).
- Jordan Tigani (MotherDuck) - analítica rápida con DuckDB en memoria/navegador.

${targetSource ? `Foco específico en la fuente: ${targetSource}.` : ''}
${specificFocus ? `Enfoque temático: ${specificFocus}.` : ''}
Categoría solicitada: ${category}.

Devuelve tu respuesta ÚNICAMENTE como un array JSON válido con la siguiente estructura exacta por cada elemento:
[
  {
    "id": "scan-1",
    "title": "Titular conciso y directo en español (ej. Gráficos que dan la cara: Claude Dashboards)",
    "category": "launches-tools" (debe ser uno de: "launches-tools", "github-repos", "ai-models", "agentic-ai", "data-engineering", "analytics-bi", "industry-roi"),
    "itemType": "lanzamiento" (debe ser: "lanzamiento", "repositorio", "herramienta" o "noticia"),
    "githubStars": "38.5k" (opcional si es repositorio),
    "repoUrl": "https://github.com/..." (opcional si es repositorio),
    "summary": "Resumen claro de lo que ocurrió (2 oraciones directas)",
    "whyItMatters": "Por qué le importa a un profesional o líder tech",
    "forNormalPeople": "Por qué le llama la atención a la gente común (1 frase llana, ej: 'Te ahorra 3 horas haciendo tablas en Excel')",
    "authorNote": "Metáfora ingeniosa del mundo real (ej: 'Es como darle un destornillador a un robot curioso')",
    "keyMetricOrInsight": "Dato numérico, porcentaje o métrica clave destacada",
    "sourceName": "Nombre de la fuente (ej. GitHub Trending, Product Hunt AI, Aprender Big Data, The Batch)",
    "sourceUrl": "URL de referencia o portal correspondiente",
    "publishedDate": "Octubre 2026",
    "tags": ["Tag1", "Tag2", "Tag3"],
    "impactLevel": "Disruptivo" (o "Alto" o "Relevante")
  }
]
Asegúrate de que sea JSON estrictamente parseable, sin texto antes ni después.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.3,
      },
    });

    const responseText = response.text || '';
    let parsedItems: NewsItem[] = [];

    const jsonMatch = responseText.match(/\[\s*\{[\s\S]*\}\s*\]/);
    if (jsonMatch) {
      try {
        parsedItems = JSON.parse(jsonMatch[0]);
      } catch (parseErr) {
        console.error('Failed to parse model JSON search response:', parseErr);
      }
    }

    if (!parsedItems || parsedItems.length === 0) {
      // Fallback to rich seed list enriched with date
      parsedItems = CURRENT_WEEK_NEWS;
    }

    // Extract grounding URLs if available
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const webSources = groundingChunks
      .map((c: any) => c.web?.title ? { title: c.web.title, uri: c.web.uri } : null)
      .filter(Boolean);

    res.json({
      items: parsedItems,
      source: 'live-gemini-grounded',
      groundingSources: webSources,
      summary: 'Radar actualizado en tiempo real con Gemini 3.8 Flash y Google Search Grounding.',
    });
  } catch (error: any) {
    console.error('Error during weekly scan:', error);
    // Return curated items gracefully on error
    res.json({
      items: CURRENT_WEEK_NEWS,
      source: 'fallback-curated',
      error: error.message || 'Error consultando novedades en vivo; se presenta el radar curado semanal.',
    });
  }
});

// Endpoint: Consolidate Selected News into LinkedIn Post
app.post('/api/generate-post', async (req: Request, res: Response) => {
  const {
    selectedItems = [],
    settings = {
      template: 'weekly-roundup',
      tone: 'visionary',
      language: 'es',
      includeHashtags: true,
      includeMetrics: true,
      includeSources: true,
      authorPerspective: '',
      callToActionType: 'debate',
    },
  }: { selectedItems: NewsItem[]; settings: GenerationSettings } = req.body;

  if (!selectedItems || selectedItems.length === 0) {
    return res.status(400).json({ error: 'Debes seleccionar al menos una novedad o noticia.' });
  }

  const itemsContext = selectedItems
    .map(
      (item, idx) => `
NOTICIA ${idx + 1}:
- Titular: ${item.title}
- Categoría: ${item.category}
- Resumen: ${item.summary}
- Por qué importa: ${item.whyItMatters}
- Métrica clave: ${item.keyMetricOrInsight}
- Fuente: ${item.sourceName} (${item.sourceUrl})
- Mi opinión personal: ${item.authorNote || 'Ninguna especificada'}
`
    )
    .join('\n');

  const templateGuidelines: Record<string, string> = {
    'creator-minute':
      'Formato: "En 1 Minuto (Estilo Creador Tech Viral)". Gancho inicial exacto: "Esta semana 𝗹𝗮 𝗜𝗔 no se tomó ni un respiro. Tú sí. Te pongo al día 𝗲𝗻 𝟭 𝗺𝗶𝗻𝘂𝘁𝗼." (o variación similar con palabras clave en negrita matemática unicode). Cada noticia debe ir con un guion y titular en negrita matemática unicode (ej: "-𝗚𝗿á𝗳𝗶𝗰𝗼𝘀 𝗾𝘂𝗲 𝗱𝗮𝗻 𝗹𝗮 𝗰𝗮𝗿𝗮."), seguido de 1-2 oraciones cortas con una metáfora o analogía ingeniosa del mundo real (ej: "Es como darle un destornillador a un robot curioso", "Por fin un dato que no se hace el misterioso"). Cierre rotundo: "[Número en palabras] lanzamientos. Una semana. Cero excusas para decir \'no sabía\'. 😅" y pregunta para la comunidad.',
    'weekly-roundup':
      'Formato: Resumen semanal tipo "Roundup". Un hook contundente de 1-2 líneas, un párrafo corto de contexto, viñetas numeradas (1️⃣, 2️⃣, 3️⃣...) para cada noticia con "👉 Por qué importa" y "📊 Métrica clave", reflexión final y llamada a la acción.',
    'deep-dive':
      'Formato: Análisis a fondo y reflexivo. Selecciona la tendencia más disruptiva de las proporcionadas y conéctala con las demás en un hilo narrativo coherente. Enfoque en lecciones de arquitectura, errores comunes a evitar y consejos prácticos para profesionales.',
    'contrarian-debate':
      'Formato: Debate constructivo y desmitificador (Hype vs Realidad). Cuestiona la euforia superficial del mercado, explicando qué funciona de verdad en producción y qué es solo marketing. Tono honesto y valiente que incite a comentar.',
    'carousel-slides':
      'Formato: Guion estructurado para carrusel de diapositivas en LinkedIn. Organiza el texto en [SLIDE 1] (Portada con gancho irresistible), [SLIDE 2], [SLIDE 3]... hasta [SLIDE 5] o [SLIDE 6] (Conclusión + CTA). Cada slide debe tener Título, 2-3 viñetas concisas y un Callout destacado.',
    'executive-summary':
      'Formato: Resumen Ejecutivo tipo TL;DR para Directores, VPs y C-Level. Lenguaje orientado a impacto de negocio, costes, eficiencia de equipos y decisiones estratégicas sin tecnicismos innecesarios.',
  };

  const toneGuidelines: Record<string, string> = {
    visionary: 'Tono: Líder de opinión, estratégico, visionario, que anticipa hacia dónde va la industria.',
    technical: 'Tono: Ingenieril, riguroso, enfocado en arquitecturas, rendimiento, patrones y buenas prácticas.',
    educational: 'Tono: Claro, divulgativo, accesible para perfiles de negocio y analistas, explicando conceptos complejos de forma sencilla.',
    candid: 'Tono: Directo, sin rodeos, honesto, conversacional como si hablaras con un colega con un café.',
  };

  const selectedTemplateGuide = templateGuidelines[settings.template] || templateGuidelines['weekly-roundup'];
  const selectedToneGuide = toneGuidelines[settings.tone] || toneGuidelines['visionary'];

  if (!aiClient) {
    // Generate deterministic rich post when no API key
    const generated = generateFallbackPost(selectedItems, settings);
    return res.json(generated);
  }

  try {
    const prompt = `Eres un estratega de contenido de élite para LinkedIn especializado en Inteligencia Artificial, Big Data y Analytics para perfiles tech que buscan construir autoridad y engagement orgánico.

Crea un post extraordinario en LinkedIn a partir de las siguientes noticias seleccionadas:

${itemsContext}

Parámetros de estilo:
- ${selectedTemplateGuide}
- ${selectedToneGuide}
- Idioma: ${settings.language === 'en' ? 'Inglés' : 'Español'}
- Perspectiva personal del autor: ${settings.authorPerspective || 'Enfatizar que la arquitectura y la gobernanza importan más que los modelos masivos.'}
- Tipo de CTA: ${settings.callToActionType} (hacer una pregunta inteligente que invite a debatir en los comentarios).

Reglas de formato esenciales para LinkedIn:
1. El "Hook" inicial (las primeras 2-3 líneas antes de que LinkedIn corte con "...ver más") debe ser magnético, intrigante y generar un clic inmediato.
2. Usa saltos de línea dobles para que el texto sea escaneable y visualmente limpio en móviles.
3. No uses párrafos de más de 2-3 oraciones.
4. Usa viñetas limpias (1️⃣, 2️⃣, 👉, 💡) con moderación elegante, sin saturar de emojis genéricos.
5. Incluye al final 3 a 5 hashtags específicos y populares (ej. #InteligenciaArtificial #DataEngineering #Analytics).

Devuelve tu respuesta ÚNICAMENTE como un objeto JSON válido con la siguiente estructura:
{
  "title": "Título interno de la publicación",
  "fullContent": "El contenido completo del post listo para copiar y pegar en LinkedIn",
  "hooks": [
    "Opción de hook 1 (provocador / curiosidad)",
    "Opción de hook 2 (orientado a métrica / impacto)",
    "Opción de hook 3 (reflexivo / contrarian)"
  ],
  "callToAction": "La frase de cierre con la pregunta para la comunidad",
  "hashtags": ["#Tag1", "#Tag2", "#Tag3", "#Tag4"]
}
No agregues explicaciones fuera del bloque JSON.`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const responseText = response.text || '';
    const parsed = JSON.parse(responseText);

    let carouselSlides: CarouselSlide[] | undefined;
    if (settings.template === 'carousel-slides') {
      carouselSlides = generateSlidesFromContent(parsed.fullContent, selectedItems);
    }

    const post: GeneratedPost = {
      id: `post-${Date.now()}`,
      title: parsed.title || 'Resumen Semanal de IA & Data',
      fullContent: parsed.fullContent,
      hooks: parsed.hooks && parsed.hooks.length > 0 ? parsed.hooks : [parsed.fullContent.split('\n')[0]],
      selectedHookIndex: 0,
      template: settings.template,
      tone: settings.tone,
      selectedNewsIds: selectedItems.map((i) => i.id),
      createdAt: new Date().toISOString(),
      hashtags: parsed.hashtags || ['#InteligenciaArtificial', '#DataEngineering', '#Analytics'],
      callToAction: parsed.callToAction || '¿Cuál es tu postura al respecto? Te leo en los comentarios.',
      carouselSlides,
    };

    res.json(post);
  } catch (error: any) {
    console.error('Error generating LinkedIn post with Gemini:', error);
    const fallback = generateFallbackPost(selectedItems, settings);
    res.json(fallback);
  }
});

// Endpoint: Quick AI Refine / Polish for Post
app.post('/api/refine-post', async (req: Request, res: Response) => {
  const { postContent, instruction } = req.body;

  if (!postContent) {
    return res.status(400).json({ error: 'Falta el contenido del post.' });
  }

  if (!aiClient) {
    // Basic local transformation
    let refined = postContent;
    if (instruction.includes('breve') || instruction.includes('conciso')) {
      refined = postContent.split('\n\n').slice(0, 4).join('\n\n');
    }
    return res.json({ refinedContent: refined });
  }

  try {
    const prompt = `Eres un editor profesional de contenido para LinkedIn.
Toma el siguiente post y aplícale la siguiente mejora específica:
"${instruction}"

Reglas:
- Conserva el tono profesional y la esencia de los datos técnicos.
- Mantén saltos de línea limpios para lectura móvil en LinkedIn.
- Devuelve SOLAMENTE el texto resultante refinado, sin notas adicionales ni comillas.

Post original:
${postContent}`;

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.5,
      },
    });

    res.json({ refinedContent: response.text || postContent });
  } catch (error: any) {
    console.error('Error refining post:', error);
    res.json({ refinedContent: postContent, error: error.message });
  }
});

// Helper for deterministic fallback post generation
function generateFallbackPost(
  selectedItems: NewsItem[],
  settings: GenerationSettings
): GeneratedPost {
  if (settings.template === 'creator-minute') {
    const creatorContent = formatCreatorMinutePost(selectedItems);
    const creatorHooks = [
      `Esta semana ${toLinkedInBoldSans('la IA')} no se tomó ni un respiro. Tú sí. Te pongo al día ${toLinkedInBoldSans('en 1 minuto')}.`,
      `¿Sientes que el ritmo de la IA va demasiado rápido? Aquí lo que de verdad importa ${toLinkedInBoldSans('en 60 segundos')}:`,
      `De dashboards auditables a robots con destornillador: Lo mejor de la semana ${toLinkedInBoldSans('en 1 minuto')}.`,
    ];
    return {
      id: `post-creator-${Date.now()}`,
      title: `Te pongo al día en 1 minuto: ${selectedItems.length} temas clave`,
      fullContent: creatorContent,
      hooks: creatorHooks,
      selectedHookIndex: 0,
      template: 'creator-minute',
      tone: settings.tone,
      selectedNewsIds: selectedItems.map((i) => i.id),
      createdAt: new Date().toISOString(),
      hashtags: ['#InteligenciaArtificial', '#Data', '#TechTrends', '#Productividad', '#AgentesAI'],
      callToAction: '¿Cuál de estos vas a probar primero? Te leo en comentarios 👇',
      carouselSlides: generateSlidesFromContent(creatorContent, selectedItems),
    };
  }

  const hooks = [
    `🚨 Lo que está pasando en IA, Data y Analytics esta semana cambiará la forma en que construimos pipelines:`,
    `¿Por qué el 78% de los proyectos de IA en BI fallan y cómo resolverlo con la arquitectura correcta?`,
    `Se acabó la fase de experimentación superficial en IA. Bienvenidos a la ingeniería de valor real:`,
  ];

  const bullets = selectedItems
    .map(
      (item, idx) => `
${idx + 1}️⃣ ${item.title}
${item.summary}
👉 Por qué importa: ${item.whyItMatters}
${item.keyMetricOrInsight ? `📊 Métrica clave: ${item.keyMetricOrInsight}` : ''}
${item.authorNote ? `💬 Mi postura: ${item.authorNote}` : ''}`
    )
    .join('\n');

  const fullContent = `${hooks[0]}

Si lideras o desarrollas proyectos de datos e inteligencia artificial, aquí tienes el resumen curado de las novedades más impactantes:
${bullets}

💡 Conclusión estratégica:
${settings.authorPerspective || 'El verdadero diferenciador ya no es qué modelo fundacional utilizas, sino la solidez, gobernanza y calidad de tu infraestructura de datos.'}

¿Cuál de estos movimientos impactará más en tu roadmap este año? Te leo en comentarios 👇

#InteligenciaArtificial #DataEngineering #Analytics #BusinessIntelligence #CloudData`;

  return {
    id: `post-local-${Date.now()}`,
    title: `Resumen Curado: ${selectedItems.length} temas clave de la semana`,
    fullContent,
    hooks,
    selectedHookIndex: 0,
    template: settings.template,
    tone: settings.tone,
    selectedNewsIds: selectedItems.map((i) => i.id),
    createdAt: new Date().toISOString(),
    hashtags: ['#InteligenciaArtificial', '#DataEngineering', '#Analytics', '#BusinessIntelligence', '#CloudData'],
    callToAction: '¿Cuál de estos movimientos impactará más en tu roadmap este año? Te leo en comentarios 👇',
    carouselSlides: generateSlidesFromContent(fullContent, selectedItems),
  };
}

function generateSlidesFromContent(content: string, items: NewsItem[]): CarouselSlide[] {
  const slides: CarouselSlide[] = [
    {
      slideNumber: 1,
      title: 'RADAR SEMANAL',
      subtitle: 'IA, Big Data & Analytics',
      bullets: [
        'Las 3 transformaciones clave de la semana',
        'Impacto real para ingenieros y líderes',
        'Lecciones para aplicar en tu equipo',
      ],
      callout: 'Desliza para ver el análisis completo 👉',
      badge: 'Portada',
    },
  ];

  items.slice(0, 4).forEach((item, index) => {
    slides.push({
      slideNumber: index + 2,
      title: item.title,
      bullets: [
        item.summary,
        `Impacto: ${item.whyItMatters}`,
        item.keyMetricOrInsight ? `Dato: ${item.keyMetricOrInsight}` : '',
      ].filter(Boolean),
      callout: item.authorNote || undefined,
      badge: item.category.toUpperCase(),
    });
  });

  slides.push({
    slideNumber: slides.length + 1,
    title: '¿Qué opinas tú?',
    subtitle: 'El valor está en la conversación',
    bullets: [
      'Guarda este carrusel para consultarlo luego',
      'Compártelo con tu equipo de datos',
      'Deja tu comentario con la tendencia más relevante para tu negocio',
    ],
    callout: 'Sígueme en LinkedIn para no perderte el radar semanal.',
    badge: 'Cierre',
  });

  return slides;
}

// Serve Vite dev server or production build
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {},
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port} (Mode: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer();
