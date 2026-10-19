import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateReadTime,
  estimateLinkedInCharacterMetrics,
  extractHashtags,
  replaceHook,
  filterNewsItems,
  parseCarouselSlides,
  toLinkedInBoldSans,
  convertMarkdownBoldToLinkedIn,
  formatCreatorMinutePost,
} from './postFormatter.ts';
import type { NewsItem } from '../types/index.ts';

test('toLinkedInBoldSans converts alphanumeric text to Unicode Sans-Serif Bold correctly', () => {
  const result = toLinkedInBoldSans('IA 1 minuto');
  // I -> 𝗜, A -> 𝗔, 1 -> 𝟭
  assert.equal(result.includes('𝗜𝗔'), true);
  assert.equal(result.includes('𝟭'), true);
});

test('convertMarkdownBoldToLinkedIn replaces **bold** with unicode bold', () => {
  const markdown = 'Esta semana **la IA** no para.';
  const converted = convertMarkdownBoldToLinkedIn(markdown);
  assert.equal(converted.includes('**'), false);
  assert.equal(converted.includes('𝗹𝗮 𝗜𝗔'), true);
});

test('formatCreatorMinutePost builds the viral 1-minute creator layout', () => {
  const items: NewsItem[] = [
    {
      id: 'item-1',
      title: 'Gráficos que dan la cara',
      category: 'analytics-bi',
      summary: 'Claude ahora hace dashboards donde cada número te dice de dónde salió.',
      whyItMatters: 'Por fin un dato que no se hace el misterioso.',
      keyMetricOrInsight: '100% auditable',
      sourceName: 'Anthropic',
      sourceUrl: 'https://claude.ai',
      publishedDate: '18 Oct',
      tags: ['Claude', 'BI'],
      impactLevel: 'Alto',
    },
  ];
  const post = formatCreatorMinutePost(items);
  assert.equal(post.includes('no se tomó ni un respiro'), true);
  assert.equal(post.includes('Cero excusas para decir "no sabía"'), true);
});

test('calculateReadTime returns valid read metrics for empty and typical text', () => {
  const empty = calculateReadTime('');
  assert.equal(empty.words, 0);
  assert.equal(empty.readingTimeSeconds, 0);

  const sampleText = Array(200).fill('palabra').join(' ');
  const result = calculateReadTime(sampleText);
  assert.equal(result.words, 200);
  assert.equal(result.readingTimeSeconds, 60);
});

test('estimateLinkedInCharacterMetrics identifies character limits correctly', () => {
  const shortText = 'Hola mundo';
  const shortMetrics = estimateLinkedInCharacterMetrics(shortText);
  assert.equal(shortMetrics.status, 'too-short');
  assert.equal(shortMetrics.isOverLimit, false);

  const optimalText = Array(120).fill('Palabra').join(' ');
  const optimalMetrics = estimateLinkedInCharacterMetrics(optimalText);
  assert.equal(optimalMetrics.status, 'optimal');
  assert.equal(optimalMetrics.isOverLimit, false);

  const massiveText = Array(700).fill('Largo').join(' ');
  const massiveMetrics = estimateLinkedInCharacterMetrics(massiveText);
  assert.equal(massiveMetrics.status, 'exceeded');
  assert.equal(massiveMetrics.isOverLimit, true);
});

test('extractHashtags pulls hashtags correctly and deduplicates', () => {
  const post = 'Gran semana para #InteligenciaArtificial y #DataEngineering. #DataEngineering es clave #IA';
  const tags = extractHashtags(post);
  assert.deepEqual(tags, ['#InteligenciaArtificial', '#DataEngineering', '#IA']);
});

test('replaceHook replaces opening hook while keeping rest of post', () => {
  const original = 'Este es el hook antiguo.\n\nCuerpo del post con noticias:\n1. Novedad uno\n2. Novedad dos';
  const updated = replaceHook(original, 'Nuevo hook viral y provocador!');
  assert.ok(updated.startsWith('Nuevo hook viral y provocador!'));
  assert.ok(updated.includes('1. Novedad uno'));
});

test('filterNewsItems filters by category and search keyword', () => {
  const mockItems: NewsItem[] = [
    {
      id: '1',
      title: 'DeepSeek lanza modelo de razonamiento',
      category: 'ai-models',
      summary: 'Nuevo modelo open weights enfocado en razonamiento matemático.',
      whyItMatters: 'Reduce costes de inferencia drásticamente.',
      keyMetricOrInsight: '70% menos coste de compute',
      sourceName: 'AI News',
      sourceUrl: 'https://example.com/1',
      publishedDate: '2026-10-15',
      tags: ['OpenWeights', 'Razonamiento', 'LLM'],
      impactLevel: 'Disruptivo',
    },
    {
      id: '2',
      title: 'Apache Iceberg estandariza catálogos cloud',
      category: 'data-engineering',
      summary: 'Snowflake y Databricks anuncian soporte nativo mutuo.',
      whyItMatters: 'Fin al vendor lock-in en data lakes.',
      keyMetricOrInsight: 'Interoperabilidad 100% abierta',
      sourceName: 'Data Weekly',
      sourceUrl: 'https://example.com/2',
      publishedDate: '2026-10-16',
      tags: ['Iceberg', 'Lakehouse', 'Databricks'],
      impactLevel: 'Alto',
    },
  ];

  const filteredByCategory = filterNewsItems(mockItems, 'data-engineering', '');
  assert.equal(filteredByCategory.length, 1);
  assert.equal(filteredByCategory[0].id, '2');

  const filteredBySearch = filterNewsItems(mockItems, 'all', 'razonamiento');
  assert.equal(filteredBySearch.length, 1);
  assert.equal(filteredBySearch[0].id, '1');
});

test('parseCarouselSlides falls back gracefully or parses structured slides', () => {
  const fallback = parseCarouselSlides('Un post normal sin marcas de slide\nCon viñetas');
  assert.ok(fallback.length >= 2);
  assert.equal(fallback[0].badge, 'Portada');

  const structured = `[SLIDE 1]
El auge de los Agentes de IA
• Por qué 2026 es el año de la ejecución
• De chatbots a flujos de trabajo

[SLIDE 2]
Apache Iceberg unifica los datos
• Snowflake y Databricks interoperables
• Reducción de costos de almacenamiento`;

  const parsed = parseCarouselSlides(structured);
  assert.equal(parsed.length, 2);
  assert.equal(parsed[0].title, 'El auge de los Agentes de IA');
  assert.equal(parsed[1].title, 'Apache Iceberg unifica los datos');
});
