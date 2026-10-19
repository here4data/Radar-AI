export type NewsCategory =
  | 'all'
  | 'launches-tools'
  | 'github-repos'
  | 'ai-models'
  | 'agentic-ai'
  | 'data-engineering'
  | 'analytics-bi'
  | 'industry-roi';

export type ImpactLevel = 'Disruptivo' | 'Alto' | 'Relevante';

export type ItemType = 'lanzamiento' | 'repositorio' | 'herramienta' | 'noticia';

export interface NewsItem {
  id: string;
  title: string;
  category: Exclude<NewsCategory, 'all'>;
  summary: string;
  whyItMatters: string;
  keyMetricOrInsight: string;
  sourceName: string;
  sourceUrl: string;
  sourcePortalId?: string;
  publishedDate: string;
  tags: string[];
  impactLevel: ImpactLevel;
  authorNote?: string;
  itemType?: ItemType;
  githubStars?: string;
  repoUrl?: string;
  forNormalPeople?: string;
}

export type PostTemplate =
  | 'creator-minute'
  | 'weekly-roundup'
  | 'deep-dive'
  | 'contrarian-debate'
  | 'carousel-slides'
  | 'executive-summary';

export type PostTone =
  | 'visionary'
  | 'technical'
  | 'educational'
  | 'candid';

export interface CarouselSlide {
  slideNumber: number;
  title: string;
  subtitle?: string;
  bullets: string[];
  callout?: string;
  badge?: string;
}

export interface GeneratedPost {
  id: string;
  title: string;
  fullContent: string;
  hooks: string[];
  selectedHookIndex: number;
  template: PostTemplate;
  tone: PostTone;
  selectedNewsIds: string[];
  createdAt: string;
  hashtags: string[];
  callToAction: string;
  carouselSlides?: CarouselSlide[];
}

export interface WeeklyEdition {
  id: string;
  weekNumber: number;
  year: number;
  title: string;
  dateRange: string;
  status: 'active' | 'archived';
  items: NewsItem[];
  savedPost?: GeneratedPost;
}

export interface GenerationSettings {
  template: PostTemplate;
  tone: PostTone;
  language: 'es' | 'en';
  includeHashtags: boolean;
  includeMetrics: boolean;
  includeSources: boolean;
  authorPerspective: string;
  callToActionType: 'debate' | 'opinion' | 'resource' | 'network';
}

export interface ScheduledScanConfig {
  enabled: boolean;
  dayOfWeek: string;
  time: string;
  autoDraftPost: boolean;
  preferredTone: PostTone;
  preferredTemplate: PostTemplate;
}
