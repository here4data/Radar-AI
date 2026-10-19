import type { CarouselSlide, NewsCategory, NewsItem } from '../types/index.ts';

/**
 * Converts standard alphanumeric characters to Unicode Mathematical Sans-Serif Bold.
 * Used by top LinkedIn creators because LinkedIn feeds do not support Markdown bold.
 */
export function toLinkedInBoldSans(text: string): string {
  if (!text) return '';
  let result = '';
  for (const char of text) {
    const code = char.codePointAt(0);
    if (!code) continue;

    // A-Z: 0x1D5D4 - 0x1D5ED
    if (code >= 65 && code <= 90) {
      result += String.fromCodePoint(0x1D5D4 + (code - 65));
    }
    // a-z: 0x1D5EE - 0x1D607
    else if (code >= 97 && code <= 122) {
      result += String.fromCodePoint(0x1D5EE + (code - 97));
    }
    // 0-9: 0x1D7EC - 0x1D7F5
    else if (code >= 48 && code <= 57) {
      result += String.fromCodePoint(0x1D7EC + (code - 48));
    } else {
      result += char;
    }
  }
  return result;
}

/**
 * Converts Unicode Mathematical Sans-Serif Bold back to standard alphanumeric characters
 * to ensure perfect rendering across all devices and OS without missing font glyphs.
 */
export function fromLinkedInBoldSans(text: string): string {
  if (!text) return '';
  let result = '';
  for (const char of text) {
    const code = char.codePointAt(0);
    if (!code) continue;

    // A-Z: 0x1D5D4 - 0x1D5ED
    if (code >= 0x1D5D4 && code <= 0x1D5ED) {
      result += String.fromCharCode(65 + (code - 0x1D5D4));
    }
    // a-z: 0x1D5EE - 0x1D607
    else if (code >= 0x1D5EE && code <= 0x1D607) {
      result += String.fromCharCode(97 + (code - 0x1D5EE));
    }
    // 0-9: 0x1D7EC - 0x1D7F5
    else if (code >= 0x1D7EC && code <= 0x1D7F5) {
      result += String.fromCharCode(48 + (code - 0x1D7EC));
    } else {
      result += char;
    }
  }
  return result;
}

/**
 * Checks if a character is a Unicode mathematical sans bold character
 */
export function isLinkedInBoldChar(char: string): boolean {
  const code = char.codePointAt(0);
  if (!code) return false;
  return (
    (code >= 0x1D5D4 && code <= 0x1D5ED) ||
    (code >= 0x1D5EE && code <= 0x1D607) ||
    (code >= 0x1D7EC && code <= 0x1D7F5)
  );
}

/**
 * Replaces **bold** markdown tags with true LinkedIn unicode bold
 */
export function convertMarkdownBoldToLinkedIn(text: string): string {
  if (!text) return '';
  return text.replace(/\*\*(.*?)\*\*/g, (_, p1) => toLinkedInBoldSans(p1));
}

/**
 * Formats selected news items into the high-engagement "En 1 Minuto" creator style
 * with unicode bold headers and punchy analogies.
 */
export function formatCreatorMinutePost(items: NewsItem[]): string {
  if (!items || items.length === 0) return '';
  const countWords: Record<number, string> = {
    1: 'Un lanzamiento',
    2: 'Dos lanzamientos',
    3: 'Tres lanzamientos',
    4: 'Cuatro lanzamientos',
    5: 'Cinco lanzamientos',
    6: 'Seis lanzamientos',
  };
  const countText = countWords[items.length] || `${items.length} lanzamientos`;

  const header = `Esta semana ${toLinkedInBoldSans('la IA')} no se tomó ni un respiro. Tú sí. Te pongo al día ${toLinkedInBoldSans('en 1 minuto')}.`;

  const bullets = items.map((item) => {
    // Clean title for bold tag - take the punchy headline before colon if present
    let cleanTitle = item.title.replace(/^[-•\d\.\s]+/, '').trim();
    if (cleanTitle.includes(':')) {
      const parts = cleanTitle.split(':');
      if (parts[0].trim().length >= 8 && parts[0].trim().length <= 45) {
        cleanTitle = parts[0].trim();
      }
    }
    if (cleanTitle.length > 40) {
      cleanTitle = `${cleanTitle.slice(0, 38).trim()}...`;
    }
    const boldHeader = `-${toLinkedInBoldSans(cleanTitle)}.`;

    // Specific crafted text for known featured news
    if (item.id === 'news-claude-dashboards') {
      return `${boldHeader} Claude ahora hace dashboards donde cada número te dice de dónde salió y cuándo se actualizó. Por fin un dato que no se hace el misterioso.`;
    }
    if (item.id === 'news-rea-agents') {
      return `${boldHeader} REA les pone herramientas a Claude Code, Codex y Cursor para averiguar cómo está hecha una app. Es como darle un destornillador a un robot curioso.`;
    }
    if (item.id === 'news-artcraft-suite') {
      return `${boldHeader} ArtCraft trae siete alternativas open source. Ojo: todavía en pañales, no canceles nada aún.`;
    }
    if (item.id === 'news-claude-workspace') {
      return `${boldHeader} Una barra lateral que corrige, hace fórmulas y arma diapositivas. Tus docs acaba de recibir un copiloto.`;
    }
    if (item.id === 'news-browser-use') {
      return `${boldHeader} Browser-Use (+38k stars) abre Chrome y hace compras o reservas por ti. Es como contratar a un asistente invisible que no se cansa de hacer clics.`;
    }
    if (item.id === 'news-notebooklm-audio') {
      return `${boldHeader} Subes un PDF aburrido de 50 páginas y dos locutores te arman un podcast de radio discutiendo los puntos clave. El fin de leer tochos en el metro.`;
    }
    if (item.id === 'news-ollama-openwebui') {
      return `${boldHeader} Tu propio clon de ChatGPT corriendo gratis en tu laptop, sin pagar $20/mes y sin que nadie espíe tus contratos o finanzas.`;
    }
    if (item.id === 'news-whisper-turbo-web') {
      return `${boldHeader} Arrastras una nota de voz de WhatsApp de 5 minutos al navegador y te la transcribe en 10 segundos con WebGPU sin enviar nada a servidores.`;
    }

    // Dynamic builder for any scanned item
    let body = item.summary;
    if (item.authorNote) {
      body += ` ${item.authorNote}`;
    } else if (item.forNormalPeople) {
      body += ` ${item.forNormalPeople}`;
    } else if (item.whyItMatters) {
      body += ` ${item.whyItMatters}`;
    }

    return `${boldHeader} ${body}`;
  }).join('\n\n');

  const closing = `${countText}. Una semana. Cero excusas para decir "no sabía". 😅\n\n¿Cuál de estos vas a probar primero? Te leo en comentarios 👇\n\n#InteligenciaArtificial #Data #TechTrends #Productividad #AgentesAI`;

  return `${header}\n\n${bullets}\n\n${closing}`;
}

/**
 * Calculates estimated read time for LinkedIn post.
 * LinkedIn users typically read at 200 words per minute.
 */
export function calculateReadTime(text: string): {
  words: number;
  readingTimeSeconds: number;
  readingTimeDisplay: string;
} {
  if (!text || text.trim().length === 0) {
    return { words: 0, readingTimeSeconds: 0, readingTimeDisplay: '0 min' };
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = words / 200;
  const readingTimeSeconds = Math.round(readingTimeMinutes * 60);

  let readingTimeDisplay = '1 min de lectura';
  if (readingTimeMinutes > 1.5) {
    readingTimeDisplay = `${Math.ceil(readingTimeMinutes)} min de lectura`;
  } else if (readingTimeSeconds < 45) {
    readingTimeDisplay = `${Math.max(15, readingTimeSeconds)} seg de lectura`;
  }

  return {
    words,
    readingTimeSeconds,
    readingTimeDisplay,
  };
}

/**
 * LinkedIn character limits:
 * Absolute hard limit: 3,000 characters.
 * Sweet spot for engagement: 900 - 1,800 characters.
 * "See more..." truncation happens around 140 - 210 characters (first 3-4 lines).
 */
export function estimateLinkedInCharacterMetrics(text: string): {
  chars: number;
  maxChars: number;
  isOverLimit: boolean;
  status: 'too-short' | 'optimal' | 'long' | 'exceeded';
  seeMorePreviewCutoff: number;
} {
  const chars = text ? text.length : 0;
  const maxChars = 3000;
  const isOverLimit = chars > maxChars;

  let status: 'too-short' | 'optimal' | 'long' | 'exceeded' = 'optimal';
  if (chars < 300) {
    status = 'too-short';
  } else if (chars <= 1800) {
    status = 'optimal';
  } else if (chars <= 3000) {
    status = 'long';
  } else {
    status = 'exceeded';
  }

  // Find approximate position of "Ver más" cutoff (first 3 lines or ~180 chars)
  const lines = text.split('\n');
  let cutoff = 180;
  if (lines.length >= 3) {
    const firstThreeLinesLength = lines.slice(0, 3).join('\n').length;
    cutoff = Math.min(210, Math.max(90, firstThreeLinesLength));
  }

  return {
    chars,
    maxChars,
    isOverLimit,
    status,
    seeMorePreviewCutoff: cutoff,
  };
}

/**
 * Extracts hashtags from post text
 */
export function extractHashtags(text: string): string[] {
  if (!text) return [];
  const matches = text.match(/#[\p{L}\p{N}_]+/gu);
  if (!matches) return [];
  // Return unique lowercase tags
  return Array.from(new Set(matches));
}

/**
 * Swaps the current hook (top opening line(s)) with a selected new hook option.
 */
export function replaceHook(fullContent: string, newHook: string): string {
  if (!fullContent) return newHook || '';
  if (!newHook) return fullContent;

  const lines = fullContent.split('\n');
  // Hook is usually the first non-empty lines before the first double-newline or bullet
  let firstBreakIndex = lines.findIndex((line, i) => i > 0 && line.trim() === '');
  if (firstBreakIndex === -1) {
    firstBreakIndex = Math.min(3, lines.length);
  }

  const remainingBody = lines.slice(firstBreakIndex).join('\n');
  return `${newHook.trim()}\n${remainingBody}`;
}

/**
 * Filters news items by category and search keyword.
 */
export function filterNewsItems(
  items: NewsItem[],
  category: NewsCategory,
  searchQuery: string
): NewsItem[] {
  if (!items) return [];

  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory = category === 'all' || item.category === category;
    if (!matchesCategory) return false;

    if (!query) return true;

    return (
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      item.whyItMatters.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query)) ||
      item.sourceName.toLowerCase().includes(query)
    );
  });
}

/**
 * Parses slide content from a post formatted with slide markers (e.g., [SLIDE 1], --- Slide 2 ---, etc.)
 */
export function parseCarouselSlides(content: string): CarouselSlide[] {
  if (!content) return [];

  const slideRegex = /(?:\[SLIDE\s+(\d+)\]|---+\s*(?:SLIDE|DIAPOSITIVA)\s+(\d+)\s*---+|###\s*(?:SLIDE|Diapositiva)\s*(\d+):?)/gi;
  const parts = content.split(slideRegex);

  // If no explicit markers found, construct default 4 slides from bullet points or sections
  if (parts.length <= 1) {
    const lines = content.split('\n').filter((l) => l.trim().length > 0);
    const title = lines[0] || 'Resumen Semanal de IA & Data';
    return [
      {
        slideNumber: 1,
        title: title.replace(/^[#*\s]+/, ''),
        subtitle: 'Lo más impactante de la semana',
        bullets: ['Novedades clave seleccionadas', 'Impacto para líderes y equipos de datos', 'Acciones estratégicas'],
        badge: 'Portada',
      },
      {
        slideNumber: 2,
        title: 'Tendencias & Avances Clave',
        bullets: lines.slice(1, 5).map((l) => l.replace(/^[•\-\*\d\.\s]+/, '').trim()).filter(Boolean),
        callout: 'La velocidad de adopción se acelera.',
        badge: 'Análisis',
      },
      {
        slideNumber: 3,
        title: 'Qué significa para tu negocio',
        bullets: [
          'Priorizar casos de uso con ROI verificable',
          'Gobernanza de datos unificada',
          'Agentes autónomos en producción',
        ],
        callout: 'El valor no está en el modelo, sino en el contexto.',
        badge: 'Estrategia',
      },
      {
        slideNumber: 4,
        title: 'Conclusiones & Debate',
        bullets: ['¿Cuál de estas tendencias tendrá mayor impacto en tu equipo?', 'Guarda este post y comparte tu punto de vista.'],
        callout: 'Sígueme para el radar semanal de IA & Data.',
        badge: 'Cierre',
      },
    ];
  }

  const slides: CarouselSlide[] = [];
  let currentNum = 1;

  for (let i = 1; i < parts.length; i += 4) {
    const slideNumber = parseInt(parts[i] || parts[i + 1] || parts[i + 2] || String(currentNum), 10);
    const textChunk = parts[i + 3] || '';

    const lines = textChunk.trim().split('\n').filter(Boolean);
    const slideTitle = (lines[0] || `Slide ${slideNumber}`).replace(/^[*#\s]+/, '').trim();
    const bullets = lines
      .slice(1)
      .map((l) => l.replace(/^[•\-\*\d\.\s]+/, '').trim())
      .filter((l) => l.length > 0 && !l.toLowerCase().startsWith('nota:') && !l.toLowerCase().startsWith('callout:'));

    slides.push({
      slideNumber,
      title: slideTitle,
      bullets: bullets.length > 0 ? bullets : ['Puntos destacados de la semana'],
      badge: slideNumber === 1 ? 'Portada' : `Slide ${slideNumber}`,
    });
    currentNum++;
  }

  return slides;
}
