import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  TrendingUp,
  RotateCw,
  Send,
  Sliders,
  CheckCircle2,
  Clock,
  Layers,
  Search,
  ExternalLink,
  ChevronRight,
  Bookmark,
  Share2,
  Brain,
  BookOpen,
  Zap,
} from 'lucide-react';
import { Navbar } from './components/Navbar.tsx';
import { RadarFilterBar } from './components/RadarFilterBar.tsx';
import { NewsCard } from './components/NewsCard.tsx';
import { LinkedInPostStudio } from './components/LinkedInPostStudio.tsx';
import { ArchiveDrawer } from './components/ArchiveDrawer.tsx';
import { ScheduleModal } from './components/ScheduleModal.tsx';
import { SourcesModal } from './components/SourcesModal.tsx';
import { ExpertsModal } from './components/ExpertsModal.tsx';
import { CURRENT_WEEK_NEWS, PAST_EDITIONS } from './data/seedNews.ts';
import type { CuratedSource } from './data/sources.ts';
import type { IndustryExpert } from './data/experts.ts';
import { filterNewsItems } from './utils/postFormatter.ts';
import type {
  NewsCategory,
  NewsItem,
  GeneratedPost,
  GenerationSettings,
  ScheduledScanConfig,
  WeeklyEdition,
} from './types/index.ts';

export default function App() {
  const [editions, setEditions] = useState<WeeklyEdition[]>(PAST_EDITIONS);
  const [currentEdition, setCurrentEdition] = useState<WeeklyEdition>(PAST_EDITIONS[0]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>(CURRENT_WEEK_NEWS);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set([
      'news-claude-dashboards',
      'news-rea-agents',
      'news-artcraft-suite',
      'news-claude-workspace',
    ])
  );
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSourceFilter, setActiveSourceFilter] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(false);

  // Post generation state
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(
    PAST_EDITIONS[0].savedPost || null
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRefining, setIsRefining] = useState(false);
  const [savedPosts, setSavedPosts] = useState<GeneratedPost[]>(
    PAST_EDITIONS[0].savedPost ? [PAST_EDITIONS[0].savedPost] : []
  );

  // Modals
  const [isArchiveOpen, setIsArchiveOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [isExpertsOpen, setIsExpertsOpen] = useState(false);
  const [scheduleConfig, setScheduleConfig] = useState<ScheduledScanConfig>({
    enabled: true,
    dayOfWeek: 'Lunes',
    time: '08:30 AM',
    autoDraftPost: true,
    preferredTemplate: 'creator-minute',
    preferredTone: 'visionary',
  });

  // Check backend status on load
  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setHasApiKey(Boolean(data.hasApiKey));
      })
      .catch((err) => {
        console.warn('API status check error:', err);
      });
  }, []);

  // Filtered news list with optional activeSourceFilter
  let filteredNews = filterNewsItems(newsItems, selectedCategory, searchQuery);
  if (activeSourceFilter) {
    filteredNews = filteredNews.filter(
      (item) =>
        item.sourceName.toLowerCase().includes(activeSourceFilter.toLowerCase()) ||
        item.sourceUrl.toLowerCase().includes(activeSourceFilter.toLowerCase())
    );
  }

  // Selected news objects
  const selectedItems = newsItems.filter((item) => selectedIds.has(item.id));

  // Toggle selection
  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Select top 4
  const handleSelectAllTop = () => {
    const topFour = newsItems.slice(0, 4).map((i) => i.id);
    setSelectedIds(new Set(topFour));
  };

  // Select the 4 viral model news items
  const handleSelectViralExample = () => {
    const viralIds = [
      'news-claude-dashboards',
      'news-rea-agents',
      'news-artcraft-suite',
      'news-claude-workspace',
    ];
    setSelectedIds(new Set(viralIds));
    setScanMessage('Seleccionadas las 4 novedades del post modelo: Claude Dashboards, REA, ArtCraft y Workspace.');
    setTimeout(() => setScanMessage(null), 3500);
  };

  // Clear selection
  const handleClearSelection = () => {
    setSelectedIds(new Set());
  };

  // Load the exact model post requested
  const handleLoadModelPost = () => {
    const viralIds = [
      'news-claude-dashboards',
      'news-rea-agents',
      'news-artcraft-suite',
      'news-claude-workspace',
    ];
    setSelectedIds(new Set(viralIds));
    if (PAST_EDITIONS[0].savedPost) {
      setGeneratedPost(PAST_EDITIONS[0].savedPost);
    }
    setScanMessage('Post modelo "En 1 Minuto" cargado listo en el taller.');
    setTimeout(() => setScanMessage(null), 3000);
    document.getElementById('post-studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Update personal note for news item
  const handleUpdateAuthorNote = (id: string, note: string) => {
    setNewsItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, authorNote: note } : item))
    );
  };

  // Inject expert perspective
  const handleInjectPerspective = (expert: IndustryExpert) => {
    setScanMessage(`Cita de ${expert.name} lista para aplicar a la publicación.`);
    setTimeout(() => setScanMessage(null), 4000);
    if (generatedPost) {
      handleRefinePost(
        `Añade una mención o cita estratégica sobre la postura de ${expert.name} (${expert.organization}): "${expert.highlightQuote}".`
      );
    }
    document.getElementById('post-studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scan specifically prioritizing one of the 17 authoritative portals
  const handleScanWithSource = async (source: CuratedSource) => {
    setIsScanning(true);
    setScanMessage(`Consultando novedades recientes enfocadas en ${source.name} (${source.domain})...`);
    try {
      const response = await fetch('/api/scan-weekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory, targetSource: source.name }),
      });
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setNewsItems(data.items);
        setSelectedIds(new Set(data.items.slice(0, 4).map((i: NewsItem) => i.id)));
      }
      setScanMessage(`Radar actualizado con foco en ${source.name}.`);
      setTimeout(() => setScanMessage(null), 4000);
    } catch (err) {
      console.error('Error scanning source:', err);
    } finally {
      setIsScanning(false);
    }
  };

  // Trigger Weekly Scan via Gemini + Google Search Grounding
  const handleTriggerScan = async () => {
    setIsScanning(true);
    setScanMessage('Consultando novedades globales con Gemini 3.8 Flash y Google Search...');
    try {
      const response = await fetch('/api/scan-weekly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory }),
      });
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        setNewsItems(data.items);
        // Select first 4 items of newly scanned batch
        setSelectedIds(new Set(data.items.slice(0, 4).map((i: NewsItem) => i.id)));
      }
      setScanMessage(data.summary || 'Escaneo completado con éxito.');
      setTimeout(() => setScanMessage(null), 4500);
    } catch (err: any) {
      console.error('Error triggering scan:', err);
      setScanMessage('Radar actualizado con el conjunto curado de la semana.');
      setTimeout(() => setScanMessage(null), 4000);
    } finally {
      setIsScanning(false);
    }
  };

  // Generate LinkedIn Post
  const handleGeneratePost = async (settings: GenerationSettings) => {
    if (selectedItems.length === 0) return;
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedItems,
          settings,
        }),
      });
      const post: GeneratedPost = await response.json();
      setGeneratedPost(post);

      // Smooth scroll to studio
      document.getElementById('post-studio')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error('Error generating post:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Refine post
  const handleRefinePost = async (instruction: string) => {
    if (!generatedPost) return;
    setIsRefining(true);
    try {
      const response = await fetch('/api/refine-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postContent: generatedPost.fullContent,
          instruction,
        }),
      });
      const data = await response.json();
      if (data.refinedContent) {
        setGeneratedPost((prev) =>
          prev ? { ...prev, fullContent: data.refinedContent } : null
        );
      }
    } catch (err) {
      console.error('Error refining post:', err);
    } finally {
      setIsRefining(false);
    }
  };

  // Save to History
  const handleSaveToHistory = (post: GeneratedPost) => {
    setSavedPosts((prev) => [post, ...prev.filter((p) => p.id !== post.id)]);
    setScanMessage('Post guardado en tu historial de borradores.');
    setTimeout(() => setScanMessage(null), 3000);
  };

  // Update post content from editor
  const handleUpdatePostContent = (newContent: string) => {
    setGeneratedPost((prev) => (prev ? { ...prev, fullContent: newContent } : null));
  };

  // Run scheduled routine now
  const handleRunScheduledRoutineNow = async () => {
    await handleTriggerScan();
    setTimeout(() => {
      handleGeneratePost({
        template: scheduleConfig.preferredTemplate,
        tone: scheduleConfig.preferredTone,
        language: 'es',
        includeHashtags: true,
        includeMetrics: true,
        includeSources: true,
        authorPerspective: 'La arquitectura y la gobernanza son los verdaderos multiplicadores.',
        callToActionType: 'opinion',
      });
    }, 600);
  };

  // Select past edition
  const handleSelectEdition = (edition: WeeklyEdition) => {
    setCurrentEdition(edition);
    setNewsItems(edition.items);
    setSelectedIds(new Set(edition.items.slice(0, 4).map((i) => i.id)));
    if (edition.savedPost) {
      setGeneratedPost(edition.savedPost);
    }
  };

  // Load saved post
  const handleLoadSavedPost = (post: GeneratedPost) => {
    setGeneratedPost(post);
    document.getElementById('post-studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  const jumpToStudio = () => {
    document.getElementById('post-studio')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 font-sans pb-20">
      {/* Top Navbar */}
      <Navbar
        currentWeekText={currentEdition.dateRange}
        isScanning={isScanning}
        onTriggerScan={handleTriggerScan}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenArchive={() => setIsArchiveOpen(true)}
        onOpenSources={() => setIsSourcesOpen(true)}
        onOpenExperts={() => setIsExpertsOpen(true)}
        hasApiKey={hasApiKey}
        selectedCount={selectedItems.length}
        onJumpToStudio={jumpToStudio}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Notification Toast */}
        {scanMessage && (
          <div className="mb-6 p-3.5 rounded-2xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-200 text-xs flex items-center justify-between shadow-lg shadow-cyan-950/40 animate-fade-in">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>{scanMessage}</span>
            </div>
            <button
              onClick={() => setScanMessage(null)}
              className="text-cyan-400 hover:text-cyan-200 text-xs font-semibold cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        )}

        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950/50 to-slate-900 border border-slate-800 p-6 sm:p-8 mb-8 overflow-hidden shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Agente Autónomo Semanal de Inteligencia para LinkedIn</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-3">
              Curaduría de impacto en{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                IA, Big Data y Analytics
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Rastrea 20 fuentes líderes (incluyendo GitHub Trending, Product Hunt y Hugging Face), lanzamientos tangibles, repositorios virales con estrellas y la visión de expertos mundiales como Andrew Ng y Karpathy.
            </p>

            {/* Quick Summary Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div
                onClick={() => setIsSourcesOpen(true)}
                className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 cursor-pointer hover:border-cyan-500/50 transition"
              >
                <span className="text-[11px] text-slate-400 block flex items-center justify-between">
                  <span>Portales & Repos</span>
                  <BookOpen className="w-3 h-3 text-cyan-400" />
                </span>
                <span className="text-base sm:text-lg font-bold text-white">
                  20 fuentes
                </span>
                <span className="text-[10px] text-cyan-400 block mt-0.5">Repos • Tools • 6 Español • 11 Global</span>
              </div>

              <div
                onClick={() => setIsExpertsOpen(true)}
                className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80 cursor-pointer hover:border-indigo-500/50 transition"
              >
                <span className="text-[11px] text-slate-400 block flex items-center justify-between">
                  <span>Voces expertas</span>
                  <Brain className="w-3 h-3 text-indigo-400" />
                </span>
                <span className="text-base sm:text-lg font-bold text-indigo-300">
                  8 líderes de IA
                </span>
                <span className="text-[10px] text-indigo-300 block mt-0.5">Ng, Karpathy, Cassie...</span>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                <span className="text-[11px] text-slate-400 block">Estilo Creador</span>
                <span className="text-base sm:text-lg font-bold text-amber-400">
                  En 1 Minuto
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Negrita unicode + humor</span>
              </div>

              <div className="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
                <span className="text-[11px] text-slate-400 block">Motor IA</span>
                <span className="text-base sm:text-lg font-bold text-emerald-400">
                  Gemini 3.8 Flash
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Google Search Grounding</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section Title & Radar Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>Radar Semanal de Novedades</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                {filteredNews.length} disponibles
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Marca las casillas de las noticias que deseas incluir en tu próxima publicación de LinkedIn.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleLoadModelPost}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-semibold text-xs transition shadow-sm flex items-center space-x-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Ver Post Modelo (1 Minuto)</span>
            </button>
            <button
              onClick={jumpToStudio}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition shadow-sm flex items-center space-x-1.5 cursor-pointer"
            >
              <span>Ir al taller ({selectedItems.length})</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <RadarFilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalItems={newsItems.length}
          selectedCount={selectedItems.length}
          onSelectAllTop={handleSelectAllTop}
          onClearSelection={handleClearSelection}
          isAllSelected={selectedItems.length === 4}
          onOpenSources={() => setIsSourcesOpen(true)}
          onOpenExperts={() => setIsExpertsOpen(true)}
          onSelectViralExample={handleSelectViralExample}
        />

        {/* Active Source Filter Banner */}
        {activeSourceFilter && (
          <div className="mb-4 p-3 bg-cyan-950/50 border border-cyan-500/40 rounded-2xl flex items-center justify-between text-xs animate-fade-in shadow-sm">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="font-semibold text-cyan-300">Filtrando por portal:</span>
              <span className="bg-cyan-900/80 text-white font-medium px-2.5 py-0.5 rounded-lg border border-cyan-700/60">
                {activeSourceFilter}
              </span>
              <span className="text-slate-400">({filteredNews.length} temas encontrados)</span>
            </div>
            <button
              onClick={() => setActiveSourceFilter(null)}
              className="text-cyan-400 hover:text-white underline font-medium text-xs ml-2 cursor-pointer"
            >
              Ver todas las fuentes
            </button>
          </div>
        )}

        {/* Grid of News Cards */}
        {filteredNews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredNews.map((item) => (
              <NewsCard
                key={item.id}
                item={item}
                isSelected={selectedIds.has(item.id)}
                onToggleSelect={handleToggleSelect}
                onUpdateAuthorNote={handleUpdateAuthorNote}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-10 text-center">
            <p className="text-xs text-slate-400 mb-2">
              No se encontraron novedades para el filtro actual "{activeSourceFilter || searchQuery || selectedCategory}".
            </p>
            <button
              onClick={() => {
                setActiveSourceFilter(null);
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-cyan-400 underline cursor-pointer"
            >
              Restablecer todos los filtros
            </button>
          </div>
        )}

        {/* LinkedIn Post Studio Component */}
        <LinkedInPostStudio
          selectedItems={selectedItems}
          generatedPost={generatedPost}
          onGeneratePost={handleGeneratePost}
          isGenerating={isGenerating}
          onRefinePost={handleRefinePost}
          isRefining={isRefining}
          onSaveToHistory={handleSaveToHistory}
          onUpdatePostContent={handleUpdatePostContent}
          onLoadModelPost={handleLoadModelPost}
          onOpenExperts={() => setIsExpertsOpen(true)}
        />
      </main>

      {/* Curated Sources & Portals Modal */}
      <SourcesModal
        isOpen={isSourcesOpen}
        onClose={() => setIsSourcesOpen(false)}
        onScanWithSource={handleScanWithSource}
        onFilterBySource={(sourceName) =>
          setActiveSourceFilter((prev) => (prev === sourceName ? null : sourceName))
        }
        activeSourceFilter={activeSourceFilter || undefined}
      />

      {/* Industry Experts & Leaders Modal */}
      <ExpertsModal
        isOpen={isExpertsOpen}
        onClose={() => setIsExpertsOpen(false)}
        onInjectPerspective={handleInjectPerspective}
        onFilterByExpertPortal={(portalSource) => {
          setIsExpertsOpen(false);
          setActiveSourceFilter(portalSource);
        }}
      />

      {/* Archive Slide-over Drawer */}
      <ArchiveDrawer
        isOpen={isArchiveOpen}
        onClose={() => setIsArchiveOpen(false)}
        editions={editions}
        savedPosts={savedPosts}
        onSelectEdition={handleSelectEdition}
        onLoadSavedPost={handleLoadSavedPost}
      />

      {/* Automated Routine Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        config={scheduleConfig}
        onSaveConfig={setScheduleConfig}
        onRunScheduledRoutineNow={handleRunScheduledRoutineNow}
      />
    </div>
  );
}
