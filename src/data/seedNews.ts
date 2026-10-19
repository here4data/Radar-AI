import type { NewsItem, WeeklyEdition } from '../types/index.ts';

export const CURRENT_WEEK_NEWS: NewsItem[] = [
  // 1. Towards Data Science / Anthropic (Lanzamiento Viral)
  {
    id: 'news-claude-dashboards',
    title: 'Gráficos que dan la cara: Claude Dashboards interactivos con trazabilidad',
    category: 'launches-tools',
    itemType: 'lanzamiento',
    summary:
      'Claude ahora genera dashboards interactivos donde cada métrica muestra la consulta SQL exacta de dónde salió y cuándo se actualizó, conectándose a Snowflake, Databricks y Microsoft Fabric vía MCP.',
    whyItMatters:
      'Por fin un dato que no se hace el misterioso. Termina con las alucinaciones en métricas ejecutivas porque los analistas pueden auditar el linaje del cálculo en un clic.',
    keyMetricOrInsight: '100% de consultas SQL auditables en cada gráfico del dashboard',
    sourceName: 'Towards Data Science / Anthropic',
    sourceUrl: 'https://towardsdatascience.com',
    sourcePortalId: 'towards-data-science',
    publishedDate: '18 Oct 2026',
    tags: ['ClaudeDashboards', 'BI', 'Snowflake', 'Auditable'],
    impactLevel: 'Disruptivo',
    authorNote:
      'Por fin un dato que no se hace el misterioso. Si el número no muestra el SQL detrás, no entra a la reunión de directorio.',
    forNormalPeople:
      'Para quien hace reportes en Excel o BI: ya no tienes que adivinar si el gráfico dice la verdad o se inventó los números, te muestra de qué celda o base de datos salió.',
  },

  // 2. TLDR AI / GitHub (Repo Viral)
  {
    id: 'news-rea-agents',
    title: 'Agentes que desarman software: REA para Claude Code, Codex y Cursor',
    category: 'github-repos',
    itemType: 'repositorio',
    githubStars: '14.2k',
    repoUrl: 'https://github.com/rea-agent/rea',
    summary:
      'REA (Reverse Engineer Anything) conecta agentes de programación con herramientas de ingeniería inversa (decompiladores, análisis de AST e inspectores de runtime) para averiguar cómo está hecha cualquier aplicación.',
    whyItMatters:
      'Es como darle un destornillador a un robot curioso. Permite a los desarrolladores desarmar librerías complejas, entender dependencias opacas y recrear módulos paso a paso.',
    keyMetricOrInsight: 'Compatible con Claude Code, Cursor, Codex y servidores MCP locales',
    sourceName: 'TLDR AI / GitHub Trending',
    sourceUrl: 'https://tldr.tech/ai',
    sourcePortalId: 'github-trending',
    publishedDate: '17 Oct 2026',
    tags: ['REA', 'ReverseEngineering', 'ClaudeCode', 'Cursor'],
    impactLevel: 'Disruptivo',
    authorNote:
      'Es como darle un destornillador a un robot curioso: pasamos de escribir código desde cero a entender cualquier arquitectura legacy en segundos.',
    forNormalPeople:
      'Como una radiografía de cualquier app o página: le preguntas a la IA "¿cómo hicieron esto?" y te explica cómo está armada pieza por pieza sin tecnicismos.',
  },

  // 3. Ben's Bites / GitHub (Repo Libre)
  {
    id: 'news-artcraft-suite',
    title: 'La suite de Adobe, en versión libre: ArtCraft open source',
    category: 'github-repos',
    itemType: 'repositorio',
    githubStars: '22.8k',
    repoUrl: 'https://github.com/artcraft-suite/artcraft',
    summary:
      'ArtCraft trae siete alternativas de código abierto a programas de diseño y edición multimedia, con más del 75% del código co-escrito por modelos de IA avanzados en Rust.',
    whyItMatters:
      'Ojo: todavía en pañales, no canceles nada aún, pero marca el inicio del software creativo open-source impulsado colaborativamente por agentes de código.',
    keyMetricOrInsight: '7 herramientas alternativas y 77% de código generado por agentes en Rust',
    sourceName: "Ben's Bites / GitHub Trending",
    sourceUrl: 'https://bensbites.co',
    sourcePortalId: 'github-trending',
    publishedDate: '16 Oct 2026',
    tags: ['ArtCraft', 'OpenSource', 'DesignAI', 'Rust'],
    impactLevel: 'Alto',
    authorNote:
      'Ojo: todavía en pañales, no canceles nada aún. Pero el software open source impulsado por agentes avanza a velocidad supersónica.',
    forNormalPeople:
      'Alternativas gratuitas a programas caros como Photoshop, Illustrator o Premiere que puedes usar en tu equipo sin pagar suscripciones mensuales.',
  },

  // 4. MIT Technology Review / Google (Lanzamiento Práctico)
  {
    id: 'news-claude-workspace',
    title: 'Claude en Docs, Sheets y Slides: Barra lateral integrada',
    category: 'launches-tools',
    itemType: 'lanzamiento',
    summary:
      'Llega la integración nativa de Claude en Google Workspace mediante una barra lateral inteligente que redacta, genera fórmulas complejas en hojas de cálculo y estructura presentaciones.',
    whyItMatters:
      'Tus docs acaban de recibir un copiloto sin salir de la pestaña del navegador ni copiar y pegar prompts.',
    keyMetricOrInsight: 'Generación directa de fórmulas matriciales y resúmenes sin salir de Google Docs/Sheets',
    sourceName: 'MIT Technology Review / Product Hunt',
    sourceUrl: 'https://technologyreview.com',
    sourcePortalId: 'mit-tech-review',
    publishedDate: '16 Oct 2026',
    tags: ['Workspace', 'Sheets', 'Docs', 'Copilot'],
    impactLevel: 'Alto',
    authorNote:
      'Tus docs acaban de recibir un copiloto: la IA más útil es la que vive dentro de la herramienta que ya abres todas las mañanas.',
    forNormalPeople:
      'Ya no tienes que pelearte con fórmulas de Excel raras ni copiar textos a ChatGPT: la IA está en una barra lateral de tus documentos y te arregla la tabla en 1 clic.',
  },

  // 5. GitHub Trending: Browser-Use (Repo Viral de Alto Impacto)
  {
    id: 'news-browser-use',
    title: 'El robot que toma el volante: Browser-Use controla tu navegador',
    category: 'github-repos',
    itemType: 'repositorio',
    githubStars: '38.5k',
    repoUrl: 'https://github.com/browser-use/browser-use',
    summary:
      'Browser-Use supera las 38.000 estrellas en GitHub: un agente autónomo de código abierto que abre Google Chrome, navega sitios web reales, compara precios, rellena formularios largos y compra reservas por ti.',
    whyItMatters:
      'Se acabaron las tareas repetitivas de hacer 50 clics para extraer datos o reservar citas: la IA interactúa con la interfaz web exactamente como una persona.',
    keyMetricOrInsight: '38.5k estrellas en GitHub y soporte completo para cualquier navegador Chromium',
    sourceName: 'GitHub Trending / Open Source',
    sourceUrl: 'https://github.com/browser-use/browser-use',
    sourcePortalId: 'github-trending',
    publishedDate: '18 Oct 2026',
    tags: ['BrowserUse', 'Automation', 'Chrome', 'OpenSource'],
    impactLevel: 'Disruptivo',
    authorNote:
      'Es como contratar a un asistente invisible que no se cansa de hacer clics por ti. El futuro de la navegación no es buscar en Google, es delegar la tarea.',
    forNormalPeople:
      'Le dices "búscame los 3 hoteles más baratos cerca del centro para el sábado y llena los datos de reserva" y ves al robot abriendo pestañas y rellenando los campos solo en pantalla.',
  },

  // 6. Product Hunt AI: NotebookLM Audio Overviews
  {
    id: 'news-notebooklm-audio',
    title: 'De PDF aburrido a podcast de radio: Audio Overviews de NotebookLM en Español',
    category: 'launches-tools',
    itemType: 'lanzamiento',
    summary:
      'Google expande las Audio Overviews de NotebookLM en español: subes un informe financiero, contrato o temario de 50 páginas y dos locutores virtuales crean un podcast con voces ultra-realistas debatiendo los puntos clave.',
    whyItMatters:
      'Revoluciona el consumo de documentos para la gente común: convierte lecturas pesadas de trabajo o estudio en episodios entretenidos para escuchar en el coche o caminando.',
    keyMetricOrInsight: 'Genera podcasts de 10 a 15 minutos en menos de 2 minutos a partir de cualquier PDF o texto',
    sourceName: 'Product Hunt AI / Google',
    sourceUrl: 'https://www.producthunt.com/topics/artificial-intelligence',
    sourcePortalId: 'product-hunt-ai',
    publishedDate: '17 Oct 2026',
    tags: ['NotebookLM', 'AudioOverviews', 'Podcast', 'Productividad'],
    impactLevel: 'Alto',
    authorNote:
      'Nadie quiere leer PDFs de 50 páginas. Pero si dos presentadores te lo cuentan con humor mientras vas en el metro, la retención se multiplica por diez.',
    forNormalPeople:
      'Subes cualquier documento aburrido de tu trabajo o apuntes de estudio y en 2 minutos tienes un programa de radio de dos amigos explicándote todo con bromas y ejemplos sencillos.',
  },

  // 7. GitHub Trending: Ollama + Open-WebUI
  {
    id: 'news-ollama-openwebui',
    title: 'Tu propio ChatGPT privado y gratis en tu PC: Ollama + Open-WebUI',
    category: 'github-repos',
    itemType: 'repositorio',
    githubStars: '64.1k',
    repoUrl: 'https://github.com/open-webui/open-webui',
    summary:
      'El stack open-source definitivo para correr modelos de IA en tu propia laptop con interfaz idéntica a ChatGPT, soporte para adjuntar PDFs, historial y sin enviar un solo dato a internet.',
    whyItMatters:
      'Ahorro directo de $240 al año por persona y garantía absoluta de privacidad para abogados, médicos, autónomos y creadores celosos de sus borradores.',
    keyMetricOrInsight: '+64.000 estrellas en GitHub y soporte para modelos ligeros de 3B a 14B',
    sourceName: 'GitHub Trending / Open Source',
    sourceUrl: 'https://github.com/open-webui/open-webui',
    sourcePortalId: 'github-trending',
    publishedDate: '17 Oct 2026',
    tags: ['Ollama', 'OpenWebUI', 'Privacidad', 'Offline'],
    impactLevel: 'Alto',
    authorNote:
      'La independencia digital empieza por no depender de una tarjeta de crédito para pensar. Correr IA en local ya no es de hackers: es de gente que valora su privacidad.',
    forNormalPeople:
      'Instalas una aplicación en tu computadora y tienes un clon gratuito de ChatGPT que funciona incluso sin internet y donde nadie puede espiar tus archivos.',
  },

  // 8. Hugging Face Spaces: Whisper Turbo Web
  {
    id: 'news-whisper-turbo-web',
    title: 'Transcripción ilimitada en el navegador: Whisper Turbo Web sin servidores',
    category: 'launches-tools',
    itemType: 'herramienta',
    summary:
      'Nueva herramienta web que ejecuta el modelo Whisper de transcripción directamente en la GPU del navegador del usuario mediante WebGPU. Transcribe audios de WhatsApp, notas de voz y reuniones enteras en segundos.',
    whyItMatters:
      'Cero costes de API, velocidad instantánea y máxima seguridad: ningún audio sale de tu dispositivo ni se sube a servidores de terceros.',
    keyMetricOrInsight: 'Transcripción 5 veces más rápida que el tiempo real directamente en el navegador',
    sourceName: 'Hugging Face Spaces',
    sourceUrl: 'https://huggingface.co/spaces',
    sourcePortalId: 'huggingface-spaces',
    publishedDate: '16 Oct 2026',
    tags: ['Whisper', 'WebGPU', 'Transcripción', 'Privacidad'],
    impactLevel: 'Alto',
    authorNote:
      'El fin de escuchar audios de WhatsApp de 4 minutos a velocidad 2x. Lo arrastras a la pestaña y tienes el texto limpio en un abrir y cerrar de ojos.',
    forNormalPeople:
      '¿Te mandaron una nota de voz de 6 minutos en WhatsApp o grabaste una clase entera? La arrastras a la página y la lees como texto en 10 segundos.',
  },

  // 9. The Batch (DeepLearning.AI / Andrew Ng)
  {
    id: 'news-andrew-ng-batch',
    title: 'The Batch (Andrew Ng): "Los modelos destilados y de razonamiento local ganan en producción"',
    category: 'ai-models',
    itemType: 'noticia',
    summary:
      'Andrew Ng analiza el cambio de paradigma empresarial: las organizaciones migran de LLMs monolíticos de 70B+ a modelos destilados de 8B a 14B parámetros hiperoptimizados para tareas específicas.',
    whyItMatters:
      'Menores costes de inferencia, latencia predecible y control estricto de privacidad sin depender de APIs externas para datos confidenciales.',
    keyMetricOrInsight: 'Ahorro de hasta un 80% en costes de inferencia en despliegues especializados',
    sourceName: 'The Batch (DeepLearning.AI)',
    sourceUrl: 'https://deeplearning.ai/the-batch',
    sourcePortalId: 'the-batch',
    publishedDate: '16 Oct 2026',
    tags: ['TheBatch', 'AndrewNg', 'Destilación', 'Inference'],
    impactLevel: 'Disruptivo',
    authorNote:
      'Cuando Andrew Ng te dice que el hype de modelos monstruosos terminó en favor de modelos compactos, es hora de ajustar la arquitectura de tu empresa.',
    forNormalPeople:
      'Las empresas están dejando de pagar por modelos gigantescos y caros para usar IAs pequeñas, rápidas y baratas que hacen una sola cosa a la perfección.',
  },

  // 10. Aprender Big Data
  {
    id: 'news-aprender-bigdata',
    title: 'Streaming sin peajes: Aprender Big Data analiza la ingestión de Kafka directo a Iceberg',
    category: 'data-engineering',
    itemType: 'noticia',
    summary:
      'Guía técnica sobre la eliminación de capas ETL intermedias: eventos procesados en Apache Kafka se escriben directamente en tablas Apache Iceberg con consistencia ACID.',
    whyItMatters:
      'Despídete de mantener dos pipelines paralelos (tiempo real vs batch); un solo formato abierto alimenta dashboards en segundos y analítica histórica a bajo coste.',
    keyMetricOrInsight: 'Reducción de 50% en pipelines redundantes y latencia menor a 15 segundos',
    sourceName: 'Aprender Big Data',
    sourceUrl: 'https://aprenderbigdata.com',
    sourcePortalId: 'aprender-big-data',
    publishedDate: '15 Oct 2026',
    tags: ['AprenderBigData', 'Kafka', 'Iceberg', 'Streaming'],
    impactLevel: 'Alto',
    authorNote:
      'Menos herramientas intermedias, menos mantenimiento los fines de semana. La arquitectura de datos más limpia en español.',
    forNormalPeople:
      'Permite que los datos de una tienda online o banco pasen de ocurrir en tiempo real a los gráficos de ventas sin retrasos ni fallos en el camino.',
  },

  // 11. Conceptos Claros
  {
    id: 'news-conceptos-claros',
    title: 'Conceptos Claros: El fin de las métricas de vanidad y cómo auditar el ROI real de la IA',
    category: 'industry-roi',
    itemType: 'noticia',
    summary:
      'Desmitificación estadística sobre métricas infladas en pilotos de IA: cómo calcular tasas de error acumuladas y retorno de inversión medible en EBITDA antes de pasar a producción.',
    whyItMatters:
      'Diferencia a los científicos de datos de valor de los que solo hacen demos bonitas: permite justificar presupuestos ante el CFO con datos fríos.',
    keyMetricOrInsight: 'Solo el 22% de pilotos de IA demuestran impacto financiero positivo sin gobernanza previa',
    sourceName: 'Conceptos Claros',
    sourceUrl: 'https://conceptosclaros.com',
    sourcePortalId: 'conceptos-claros',
    publishedDate: '15 Oct 2026',
    tags: ['ConceptosClaros', 'Estadística', 'ROI', 'Métricas'],
    impactLevel: 'Alto',
    authorNote:
      'Saber defender un proyecto con números de negocio es la habilidad que separa a un técnico de un líder de datos respetado.',
    forNormalPeople:
      'Cómo saber si una herramienta de inteligencia artificial en tu empresa realmente ahorra dinero o si es solo una moda cara que nadie usa.',
  },

  // 12. Datapath Blog
  {
    id: 'news-datapath-blog',
    title: 'Datapath: DataOps con guardianes: Agentes que corrigen Schema Drift en CI/CD',
    category: 'data-engineering',
    itemType: 'noticia',
    summary:
      'Datapath detalla la integración de agentes de código en flujos CI/CD para detectar y corregir automáticamente desajustes en esquemas de tablas SQL antes de que rompan dashboards en producción.',
    whyItMatters:
      'El 40% de los incidentes en BI nacen de cambios no anunciados en bases de datos transaccionales. Los guardianes autónomos ahorran horas de guardias nocturnas.',
    keyMetricOrInsight: 'Resolución proactiva de desajustes en menos de 3 minutos sin intervención manual',
    sourceName: 'Datapath Blog',
    sourceUrl: 'https://datapath.ai/blog',
    sourcePortalId: 'datapath-blog',
    publishedDate: '15 Oct 2026',
    tags: ['Datapath', 'DataOps', 'SchemaDrift', 'Automation'],
    impactLevel: 'Alto',
    authorNote:
      'Dormir tranquilo un viernes sabiendo que un cambio de columna no tirará el reporte del lunes a primera hora.',
  },

  // 13. The Bridge Blog
  {
    id: 'news-the-bridge-skills',
    title: 'The Bridge: El nuevo perfil híbrido: "Data Engineer + Prompt Systems Architect"',
    category: 'industry-roi',
    itemType: 'noticia',
    summary:
      'Estudio salarial y de demanda de empleo en el ecosistema hispanohablante: los ingenieros de datos con dominio de integración de LLMs y evaluación de RAG duplican las ofertas recibidas.',
    whyItMatters:
      'Saber mover datos ya no basta; el mercado exige conectar esos datos limpios a interfaces generativas seguras y evaluables.',
    keyMetricOrInsight: 'Aumento del 68% en demanda de perfiles con experiencia combinada SQL + RAG',
    sourceName: 'The Bridge Blog',
    sourceUrl: 'https://thebridge.tech/blog',
    sourcePortalId: 'the-bridge',
    publishedDate: '14 Oct 2026',
    tags: ['TheBridge', 'EmpleoTech', 'CarreraDatos', 'Habilidades'],
    impactLevel: 'Relevante',
    authorNote:
      'La mejor inversión laboral de este año: entender cómo los LLMs consumen los datos que tú preparas.',
  },

  // 14. IEBS School
  {
    id: 'news-iebs-school',
    title: 'IEBS School: De analistas descriptivos a consultores de impacto con IA generativa',
    category: 'analytics-bi',
    itemType: 'noticia',
    summary:
      'Informe sobre la transformación del departamento de analítica en empresas retail y fintech: cómo los dashboards estáticos son reemplazados por resúmenes ejecutivos automatizados con recomendaciones contextuales.',
    whyItMatters:
      'El dashboard que solo muestra números está muerto; los directores esperan que el sistema les diga qué palanca comercial mover.',
    keyMetricOrInsight: 'Reducción del 75% en tiempo dedicado a armar diapositivas mensuales de resultados',
    sourceName: 'IEBS School (Data & Analytics)',
    sourceUrl: 'https://iebschool.com/hub',
    sourcePortalId: 'iebs-hub',
    publishedDate: '14 Oct 2026',
    tags: ['IEBSSchool', 'Analytics', 'Negocio', 'Transformación'],
    impactLevel: 'Relevante',
    authorNote:
      'El verdadero valor del analista nunca fue hacer gráficos bonitos, sino explicar con valentía qué significan para el negocio.',
  },

  // 15. Roadmap Data Engineering en Español
  {
    id: 'news-roadmap-de-es',
    title: 'Roadmap DE en Español: Lanzamiento del módulo interactivo sobre DuckDB + dbt',
    category: 'github-repos',
    itemType: 'repositorio',
    githubStars: '4.8k',
    repoUrl: 'https://github.com/natayadev/dataengineering-roadmap',
    summary:
      'El repositorio comunitario referente en español estrena guía práctica paso a paso para orquestar transformaciones analíticas ultrarrápidas en local con DuckDB y dbt Core sin pagar nubes caras.',
    whyItMatters:
      'Permite a profesionales y estudiantes practicar con millones de filas en su propia máquina sin gastar un céntimo en créditos cloud.',
    keyMetricOrInsight: 'Más de 1.200 estudiantes activos en el reto comunitario de la semana',
    sourceName: 'Roadmap DE en Español',
    sourceUrl: 'https://github.com/natayadev/dataengineering-roadmap',
    sourcePortalId: 'roadmap-de-es',
    publishedDate: '13 Oct 2026',
    tags: ['Roadmap', 'DuckDB', 'dbt', 'OpenSource'],
    impactLevel: 'Alto',
    authorNote:
      'Aprender con datos reales sin miedo a que te llegue una factura de $300 a fin de mes. Oro puro para la comunidad.',
    forNormalPeople:
      'Una guía comunitaria gratuita en español para aprender a procesar millones de datos en tu propia computadora sin pagar nada.',
  },

  // 16. KDnuggets
  {
    id: 'news-kdnuggets-benchmarks',
    title: 'KDnuggets: Comparativa definitiva de Small Language Models (SLMs) para entornos locales',
    category: 'ai-models',
    itemType: 'noticia',
    summary:
      'Análisis exhaustivo de rendimiento entre Llama-3.2-3B, Qwen-2.5-7B y Phi-3.5: cuál ofrece mejor ratio precisión/consumo de memoria en servidores modestos y laptops.',
    whyItMatters:
      'Permite elegir el modelo exacto para tareas sin sobrepagar en infraestructura; la eficiencia de cómputo es el nuevo KPI de la IA.',
    keyMetricOrInsight: 'Qwen-2.5-7B supera a modelos de 14B anteriores en razonamiento lógico y JSON estructurado',
    sourceName: 'KDnuggets',
    sourceUrl: 'https://kdnuggets.com',
    sourcePortalId: 'kdnuggets',
    publishedDate: '13 Oct 2026',
    tags: ['KDnuggets', 'SLM', 'Benchmarks', 'Eficiencia'],
    impactLevel: 'Alto',
    authorNote:
      'No mates moscas a cañonazos: para extraer campos de un texto, un modelo de 7B corre en tu portátil y cuesta diez veces menos.',
  },

  // 17. Data Engineering Weekly
  {
    id: 'news-data-engineering-weekly',
    title: 'Data Engineering Weekly: La consolidación de Polaris Catalog y la guerra de catálogos Iceberg',
    category: 'data-engineering',
    itemType: 'noticia',
    summary:
      'Análisis de la newsletter líder sobre la batalla entre Snowflake Polaris, Unity Catalog de Databricks y catálogos REST abiertos para gobernar tablas Iceberg en arquitecturas multicloud.',
    whyItMatters:
      'Evita el temido vendor lock-in; las empresas pueden cambiar de motor de consulta (Trino, DuckDB, Snowflake) sin mover un solo byte de datos.',
    keyMetricOrInsight: 'Adopción del estándar REST Catalog crece un 110% en el último semestre',
    sourceName: 'Data Engineering Weekly',
    sourceUrl: 'https://dataengineeringweekly.com',
    sourcePortalId: 'data-engineering-weekly',
    publishedDate: '12 Oct 2026',
    tags: ['DEWeekly', 'Polaris', 'UnityCatalog', 'Iceberg'],
    impactLevel: 'Alto',
    authorNote:
      'Tus datos deben ser tuyos, no rehenes de tu proveedor de base de datos. El catálogo abierto es la póliza de seguros.',
  },

  // 18. Datanami
  {
    id: 'news-datanami-lakehouse',
    title: 'Datanami: "El almacenamiento en disco es barato, la ineficiencia de consultas es lo que quiebra presupuestos"',
    category: 'data-engineering',
    itemType: 'noticia',
    summary:
      'Entrevista sobre la optimización de almacenamiento columnar: cómo el particionamiento inteligente y Z-Ordering reducen los escaneos de datos en un 80% en Snowflake y BigQuery.',
    whyItMatters:
      'Impacto directo en la cuenta de resultados: una consulta mal diseñada puede costar miles de dólares al mes en clusters cloud.',
    keyMetricOrInsight: 'Reducción del 80% en bytes escaneados con clustering automático en data lakes',
    sourceName: 'Datanami',
    sourceUrl: 'https://datanami.com',
    sourcePortalId: 'datanami',
    publishedDate: '12 Oct 2026',
    tags: ['Datanami', 'Optimizacion', 'CloudCosts', 'BigData'],
    impactLevel: 'Alto',
    authorNote:
      'El código rápido es un lujo; la consulta barata en la nube es una necesidad de supervivencia empresarial.',
  },

  // 19. Data Council
  {
    id: 'news-data-council-talk',
    title: 'Data Council: Diseñando arquitecturas RAG que sobrevivan a datos sucios en producción',
    category: 'agentic-ai',
    itemType: 'noticia',
    summary:
      'Keynote técnica sobre por qué el 90% de fallos en RAG se deben a mala calidad en la segmentación (chunking) y metadatos inexistentes, y cómo solucionarlo con pipelines de enriquecimiento previo.',
    whyItMatters:
      'Ningún modelo inteligente puede responder bien si los documentos que le entregas son basura desestructurada.',
    keyMetricOrInsight: 'La limpieza de chunks duplica la precisión de recuperación respecto a modelos más costosos',
    sourceName: 'Data Council',
    sourceUrl: 'https://datacouncil.ai',
    sourcePortalId: 'data-council',
    publishedDate: '11 Oct 2026',
    tags: ['DataCouncil', 'RAG', 'Chunking', 'Arquitectura'],
    impactLevel: 'Alto',
    authorNote:
      'Garbage in, garbage out: no le eches la culpa al modelo de lenguaje si tu base de conocimiento es un caos de PDFs sin índice.',
  },

  // 20. Analytics Vidhya
  {
    id: 'news-analytics-vidhya-guide',
    title: 'Analytics Vidhya: Guía completa para crear agentes de análisis de datos con LangGraph',
    category: 'agentic-ai',
    itemType: 'noticia',
    summary:
      'Tutorial paso a paso para construir un grafo cíclico de agentes que reciben una pregunta de negocio, formulan consultas SQL, validan los resultados y generan conclusiones en lenguaje natural con gráficos.',
    whyItMatters:
      'Pasa de simples chatbots conversacionales a sistemas autónomos estructurados con capacidad de autocorrección.',
    keyMetricOrInsight: 'Arquitectura de grafo de 4 nodos con verificación cruzada de sintaxis SQL',
    sourceName: 'Analytics Vidhya',
    sourceUrl: 'https://analyticsvidhya.com',
    sourcePortalId: 'analytics-vidhya',
    publishedDate: '11 Oct 2026',
    tags: ['AnalyticsVidhya', 'LangGraph', 'SQLAgents', 'Tutorial'],
    impactLevel: 'Alto',
    authorNote:
      'Los agentes autónomos que se corrigen a sí mismos antes de responderte son el estándar del que hablaremos los próximos 3 años.',
    forNormalPeople:
      'Un tutorial para programar un asistente que cuando se equivoca al responderte, se da cuenta solo, corrige el cálculo y te da la respuesta correcta sin que tengas que avisarle.',
  },
];

export const PAST_EDITIONS: WeeklyEdition[] = [
  {
    id: 'edition-2026-w42',
    weekNumber: 42,
    year: 2026,
    title: 'Edición #42: Especial Lanzamientos, Repos Virales & Novedades Prácticas',
    dateRange: '13 Oct - 19 Oct 2026',
    status: 'active',
    items: CURRENT_WEEK_NEWS,
    savedPost: {
      id: 'post-creator-minute-model',
      title: 'Esta semana la IA no se tomó ni un respiro (Edición Viral En 1 Minuto)',
      fullContent: `Esta semana 𝗹𝗮 𝗜𝗔 no se tomó ni un respiro. Tú sí. Te pongo al día 𝗲𝗻 𝟭 𝗺𝗶𝗻𝘂𝘁𝗼.

-𝗚𝗿á𝗳𝗶𝗰𝗼𝘀 𝗾𝘂𝗲 𝗱𝗮𝗻 𝗹𝗮 𝗰𝗮𝗿𝗮. Claude ahora hace dashboards donde cada número te dice de dónde salió y cuándo se actualizó. Por fin un dato que no se hace el misterioso.

-𝗔𝗴𝗲𝗻𝘁𝗲𝘀 𝗾𝘂𝗲 𝗱𝗲𝘀𝗮𝗿𝗺𝗮𝗻 𝘀𝗼𝗳𝘁𝘄𝗮𝗿𝗲. REA les pone herramientas a Claude Code, Codex y Cursor para averiguar cómo está hecha una app. Es como darle un destornillador a un robot curioso.

-𝗟𝗮 𝘀𝘂𝗶𝘁𝗲 𝗱𝗲 𝗔𝗱𝗼𝗯𝗲, 𝗲𝗻 𝘃𝗲𝗿𝘀𝗶ó𝗻 𝗹𝗶𝗯𝗿𝗲. ArtCraft trae siete alternativas open source. Ojo: todavía en pañales, no canceles nada aún.

-𝗖𝗹𝗮𝘂𝗱𝗲 𝗲𝗻 𝗗𝗼𝗰𝘀, 𝗦𝗵𝗲𝗲𝘁𝘀 𝘆 𝗦𝗹𝗶𝗱𝗲𝘀. Una barra lateral que corrige, hace fórmulas y arma diapositivas. Tus docs acaba de recibir un copiloto.

Cuatro lanzamientos. Una semana. Cero excusas para decir "no sabía". 😅`,
      hooks: [
        'Esta semana 𝗹𝗮 𝗜𝗔 no se tomó ni un respiro. Tú sí. Te pongo al día 𝗲𝗻 𝟭 𝗺𝗶𝗻𝘂𝘁𝗼.',
        '¿Sientes que parpadeas y salen 10 herramientas de IA nuevas? Aquí lo que de verdad importa:',
        'Los 4 lanzamientos de IA de esta semana que cambiarán tu flujo de trabajo en 1 minuto.',
      ],
      selectedHookIndex: 0,
      template: 'creator-minute',
      tone: 'candid',
      selectedNewsIds: [
        'news-claude-dashboards',
        'news-rea-agents',
        'news-artcraft-suite',
        'news-claude-workspace',
      ],
      createdAt: '19 Oct 2026, 09:00',
      hashtags: ['InteligenciaArtificial', 'OpenSource', 'Productividad', 'Innovacion'],
      callToAction: '¿Cuál de estos cuatro vas a probar primero este lunes? Te leo en comentarios 👇',
    },
  },
];
