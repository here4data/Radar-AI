import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Send,
  Copy,
  Check,
  Download,
  Bookmark,
  RefreshCw,
  HelpCircle,
  FileText,
  Layers,
  Eye,
  Edit2,
  Wand2,
  AlertTriangle,
  Lightbulb,
  Brain,
  Zap,
} from 'lucide-react';
import type {
  GeneratedPost,
  GenerationSettings,
  NewsItem,
  PostTemplate,
  PostTone,
} from '../types/index.ts';
import { LinkedInFeedMockup } from './LinkedInFeedMockup.tsx';
import {
  calculateReadTime,
  estimateLinkedInCharacterMetrics,
  replaceHook,
  formatCreatorMinutePost,
  convertMarkdownBoldToLinkedIn,
  toLinkedInBoldSans,
  fromLinkedInBoldSans,
} from '../utils/postFormatter.ts';
import { INDUSTRY_EXPERTS, IndustryExpert } from '../data/experts.ts';

interface LinkedInPostStudioProps {
  selectedItems: NewsItem[];
  generatedPost: GeneratedPost | null;
  onGeneratePost: (settings: GenerationSettings) => void;
  isGenerating: boolean;
  onRefinePost: (instruction: string) => void;
  isRefining: boolean;
  onSaveToHistory: (post: GeneratedPost) => void;
  onUpdatePostContent: (newContent: string) => void;
  onLoadModelPost: () => void;
  onOpenExperts: () => void;
}

export const LinkedInPostStudio: React.FC<LinkedInPostStudioProps> = ({
  selectedItems,
  generatedPost,
  onGeneratePost,
  isGenerating,
  onRefinePost,
  isRefining,
  onSaveToHistory,
  onUpdatePostContent,
  onLoadModelPost,
  onOpenExperts,
}) => {
  const [template, setTemplate] = useState<PostTemplate>('creator-minute');
  const [tone, setTone] = useState<PostTone>('visionary');
  const [language, setLanguage] = useState<'es' | 'en'>('es');
  const [authorPerspective, setAuthorPerspective] = useState('');
  const [callToActionType, setCallToActionType] = useState<'debate' | 'opinion' | 'resource' | 'network'>('opinion');
  const [activeTab, setActiveTab] = useState<'preview' | 'editor' | 'slides'>('preview');
  const [isCopied, setIsCopied] = useState(false);
  const [selectedHookIndex, setSelectedHookIndex] = useState(0);

  const handleGenerate = () => {
    onGeneratePost({
      template,
      tone,
      language,
      includeHashtags: true,
      includeMetrics: true,
      includeSources: true,
      authorPerspective,
      callToActionType,
    });
  };

  const handleCopy = () => {
    if (!generatedPost?.fullContent) return;
    navigator.clipboard.writeText(generatedPost.fullContent);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const handleDownloadMarkdown = () => {
    if (!generatedPost?.fullContent) return;
    const blob = new Blob([generatedPost.fullContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linkedin-post-semana-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSwitchHook = (hookText: string, index: number) => {
    if (!generatedPost) return;
    setSelectedHookIndex(index);
    const newContent = replaceHook(generatedPost.fullContent, hookText);
    onUpdatePostContent(newContent);
  };

  const handleInjectExpertQuote = (expert: IndustryExpert) => {
    setAuthorPerspective(expert.suggestedPerspective);
  };

  const metrics = estimateLinkedInCharacterMetrics(generatedPost?.fullContent || '');
  const readTime = calculateReadTime(generatedPost?.fullContent || '');

  return (
    <div id="post-studio" className="mt-8 border-t border-slate-800 pt-8">
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Taller de Consolidación para LinkedIn
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Convierte tus novedades seleccionadas en publicaciones virales con ganchos probados, analogías del mundo real y formato optimizado para el feed.
          </p>
        </div>

        {/* Quick Action: Load Model Post & Selected count badge */}
        <div className="flex items-center space-x-2.5 flex-wrap gap-y-1.5">
          <button
            onClick={onLoadModelPost}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center space-x-1.5 shadow-sm cursor-pointer"
            title="Cargar la publicación modelo exacta: 'Esta semana la IA no se tomó ni un respiro...'"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Cargar Post Modelo (1 Minuto)</span>
          </button>

          <div className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
            <span>Noticias en este post: </span>
            <span className="font-bold text-cyan-400">{selectedItems.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Configuration Controls (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-5 shadow-sm">
          {/* Format / Template Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300">
                Formato de Publicación
              </label>
              <span className="text-[10px] text-cyan-400 font-medium">
                {template === 'creator-minute' ? '🔥 Formato Creador Activo' : ''}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                {
                  id: 'creator-minute',
                  label: '⚡ En 1 Minuto (Estilo Creador)',
                  desc: 'Negrita unicode + analogías ingeniosas ("La IA no se tomó ni un respiro...")',
                  featured: true,
                },
                {
                  id: 'weekly-roundup',
                  label: 'Weekly Roundup',
                  desc: 'Top 3-5 con hooks y viñetas clásicas',
                },
                {
                  id: 'deep-dive',
                  label: 'Deep Dive Analítico',
                  desc: 'Foco en la tendencia clave',
                },
                {
                  id: 'contrarian-debate',
                  label: 'Hype vs Realidad',
                  desc: 'Debate honesto & sin filtros',
                },
                {
                  id: 'carousel-slides',
                  label: 'Carrusel de Slides',
                  desc: 'Guion estructurado en láminas',
                },
                {
                  id: 'executive-summary',
                  label: 'TL;DR Ejecutivo',
                  desc: 'Impacto en negocio para C-Level',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTemplate(item.id as PostTemplate)}
                  className={`text-left p-2.5 rounded-xl border text-xs transition relative cursor-pointer ${
                    item.featured ? 'pr-20' : ''
                  } ${
                    template === item.id
                      ? 'bg-gradient-to-r from-cyan-950/60 to-indigo-950/80 border-cyan-400 text-white shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/40'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {item.featured && (
                    <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                      Favorito
                    </span>
                  )}
                  <span className="font-semibold block text-slate-200">{item.label}</span>
                  <span className="text-[10px] text-slate-400 leading-tight block mt-0.5">
                    {item.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Tono de Voz
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'visionary', label: 'Estratégico & Visionario' },
                { id: 'technical', label: 'Técnico & Arquitectura' },
                { id: 'educational', label: 'Educativo & Divulgativo' },
                { id: 'candid', label: 'Directo & Sin Rodeos' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setTone(item.id as PostTone)}
                  className={`p-2 rounded-xl border text-xs font-medium text-center transition cursor-pointer ${
                    tone === item.id
                      ? 'bg-cyan-500/20 border-cyan-500/60 text-cyan-300 font-semibold'
                      : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Language Switch */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-slate-300">Idioma del Post</span>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  language === 'es'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Español
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Personal Perspective / Expert Thesis */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center space-x-1">
                <span>Tu postura / conclusión personal</span>
              </label>
              <button
                onClick={onOpenExperts}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center space-x-1 cursor-pointer font-medium"
              >
                <Brain className="w-3 h-3" />
                <span>Ver citas expertas</span>
              </button>
            </div>

            {/* Quick insert chips for top experts */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-2 scrollbar-none">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider flex-shrink-0">Citas:</span>
              {INDUSTRY_EXPERTS.slice(0, 4).map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => handleInjectExpertQuote(exp)}
                  className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 flex-shrink-0 transition cursor-pointer"
                  title={`Inyectar postura de ${exp.name}`}
                >
                  {exp.name}
                </button>
              ))}
            </div>

            <textarea
              value={authorPerspective}
              onChange={(e) => setAuthorPerspective(e.target.value)}
              placeholder="Ej: Como señala Andrew Ng, los modelos compactos y la gobernanza de datos ganan en producción sobre el hype de LLMs gigantes..."
              className="w-full bg-slate-950/80 border border-slate-700/80 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none h-20"
            />
          </div>

          {/* Call To Action Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Pregunta de Cierre (Call To Action)
            </label>
            <select
              value={callToActionType}
              onChange={(e) => setCallToActionType(e.target.value as any)}
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="opinion">Preguntar cuál de las novedades van a probar primero</option>
              <option value="debate">Debate abierto sobre qué tendencia impactará más</option>
              <option value="resource">Invitar a guardar el post o seguir el radar semanal</option>
              <option value="network">Conectar con otros profesionales del área</option>
            </select>
          </div>

          {/* Main Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || selectedItems.length === 0}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-blue-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/25 active:scale-[0.98] transition flex items-center justify-center space-x-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            <span>
              {isGenerating
                ? 'El Agente está redactando tu post...'
                : `Consolidar ${selectedItems.length} temas en Post (${template === 'creator-minute' ? '1 Minuto' : 'LinkedIn'})`}
            </span>
          </button>

          {selectedItems.length === 0 && (
            <p className="text-[11px] text-amber-400/90 text-center flex items-center justify-center space-x-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Selecciona al menos 1 novedad arriba o pulsa "4 Novedades Modelo".</span>
            </p>
          )}
        </div>

        {/* Right Column: Output, Hooks, Live Preview & Refiner (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {generatedPost ? (
            <>
              {/* Output HUD & Tabs */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3 mb-3">
                  {/* View Tabs */}
                  <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
                    <button
                      onClick={() => setActiveTab('preview')}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                        activeTab === 'preview'
                          ? 'bg-blue-600 text-white shadow-sm font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Vista Feed LinkedIn</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('editor')}
                      className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                        activeTab === 'editor'
                          ? 'bg-blue-600 text-white shadow-sm font-semibold'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Editor de Texto</span>
                    </button>
                    {generatedPost.carouselSlides && (
                      <button
                        onClick={() => setActiveTab('slides')}
                        className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium transition cursor-pointer ${
                          activeTab === 'slides'
                            ? 'bg-blue-600 text-white shadow-sm font-semibold'
                            : 'text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Slides ({generatedPost.carouselSlides.length})</span>
                      </button>
                    )}
                  </div>

                  {/* Actions: Copy & Save */}
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onSaveToHistory(generatedPost)}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
                      title="Guardar este post en tu historial"
                    >
                      <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Guardar</span>
                    </button>
                    <button
                      onClick={handleDownloadMarkdown}
                      className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs font-medium border border-slate-700 transition cursor-pointer"
                      title="Descargar archivo .md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>.md</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 active:scale-95 transition cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? '¡Copiado!' : 'Copiar Post'}</span>
                    </button>
                  </div>
                </div>

                {/* Character & Readability Metrics HUD */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Caracteres</span>
                    <span
                      className={`font-bold ${
                        metrics.isOverLimit
                          ? 'text-rose-400'
                          : metrics.status === 'optimal'
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {metrics.chars} / 3.000
                    </span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Tiempo de lectura</span>
                    <span className="font-bold text-cyan-300">{readTime.readingTimeDisplay}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Palabras</span>
                    <span className="font-bold text-slate-200">{readTime.words}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Hashtags</span>
                    <span className="font-bold text-indigo-300">
                      {generatedPost.hashtags.length}
                    </span>
                  </div>
                </div>

                {/* Viral Hook Switcher */}
                {generatedPost.hooks && generatedPost.hooks.length > 1 && (
                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <div className="flex items-center space-x-1.5 mb-2">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-xs font-semibold text-slate-300">
                        Variaciones de Gancho Inicial (Hook A/B Testing):
                      </span>
                    </div>
                    <div className="space-y-1.5">
                      {generatedPost.hooks.map((hook, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSwitchHook(hook, idx)}
                          className={`w-full text-left p-2 rounded-xl text-xs transition border flex items-start space-x-2 cursor-pointer ${
                            selectedHookIndex === idx
                              ? 'bg-amber-500/10 border-amber-500/50 text-amber-200 font-medium'
                              : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                          }`}
                        >
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 flex-shrink-0">
                            Hook {idx + 1}
                          </span>
                          <span className="line-clamp-2 leading-relaxed">
                            {fromLinkedInBoldSans(hook)}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Main Content Area based on Tab */}
              {activeTab === 'preview' && (
                <LinkedInFeedMockup
                  postContent={generatedPost.fullContent}
                  carouselSlides={generatedPost.carouselSlides}
                  onCopyPost={handleCopy}
                  isCopied={isCopied}
                />
              )}

              {activeTab === 'editor' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
                    <span className="text-xs font-semibold text-slate-300">
                      Editor Directo de Texto
                    </span>
                    <div className="flex items-center space-x-1.5 flex-wrap gap-y-1">
                      <button
                        onClick={() => onUpdatePostContent(formatCreatorMinutePost(selectedItems))}
                        className="px-2.5 py-1 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-[11px] font-semibold flex items-center space-x-1 shadow-sm transition cursor-pointer"
                        title="Reestructurar al instante con el estilo 'En 1 Minuto' con analogías y titulares unicode bold"
                      >
                        <Sparkles className="w-3 h-3 text-cyan-200" />
                        <span>⚡ Reestructurar "En 1 Minuto"</span>
                      </button>
                      <button
                        onClick={() =>
                          onUpdatePostContent(
                            convertMarkdownBoldToLinkedIn(generatedPost.fullContent)
                          )
                        }
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700 transition cursor-pointer"
                        title="Convierte **negritas de markdown** en negritas matemáticas que sí funcionan en el feed de LinkedIn"
                      >
                        <span>𝗕 Negrita Unicode</span>
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={generatedPost.fullContent}
                    onChange={(e) => onUpdatePostContent(e.target.value)}
                    rows={16}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-100 font-mono leading-relaxed focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  />
                </div>
              )}

              {activeTab === 'slides' && generatedPost.carouselSlides && (
                <div className="space-y-3">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
                    <h4 className="font-semibold text-xs text-slate-200 mb-1">
                      Guion de diapositivas para Carrusel de LinkedIn (PDF)
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Puedes copiar estas diapositivas a Canva, Figma o tu plantilla de carruseles.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {generatedPost.carouselSlides.map((slide) => (
                      <div
                        key={slide.slideNumber}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-800/40">
                              Lámina {slide.slideNumber}
                            </span>
                            <span className="text-[10px] text-slate-500">{slide.badge}</span>
                          </div>
                          <h5 className="font-bold text-sm text-white mb-2">{slide.title}</h5>
                          {slide.subtitle && (
                            <p className="text-xs text-indigo-300 mb-2">{slide.subtitle}</p>
                          )}
                          <ul className="space-y-1 text-xs text-slate-300">
                            {slide.bullets.map((b, i) => (
                              <li key={i} className="flex items-start space-x-1.5">
                                <span className="text-cyan-400">•</span>
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {slide.callout && (
                          <div className="mt-3 text-[10px] bg-slate-900 text-amber-300 p-2 rounded border border-amber-500/20">
                            {slide.callout}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Quick Refiners */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                <div className="flex items-center space-x-1.5 mb-2.5">
                  <Wand2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-semibold text-slate-300">
                    Refinamiento Rápido con Agente IA:
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "⚡ Formato 'En 1 Minuto' (analogías ingeniosas + titulares unicode bold)",
                    '🔥 Añadir más gancho y urgencia a la primera línea',
                    '✂️ Hacer el post 20% más conciso y directo',
                    '💼 Enfocarlo con lenguaje de impacto para C-Level / Directores',
                    '📊 Destacar más métricas y números tangibles',
                    '✨ Añadir viñetas y emojis profesionales',
                    '🌐 Traducir y adaptar a inglés profesional',
                  ].map((instruction) => (
                    <button
                      key={instruction}
                      onClick={() => onRefinePost(instruction)}
                      disabled={isRefining}
                      className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 text-xs transition disabled:opacity-50 flex items-center space-x-1 cursor-pointer"
                    >
                      <span>{instruction}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            /* Empty State */
            <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[380px]">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-200 mb-1">
                Listo para generar tu publicación semanal
              </h3>
              <p className="text-xs text-slate-400 max-w-md mb-5">
                Selecciona las novedades que más te llamen la atención en el radar superior o pulsa "Cargar Post Modelo" para ver el formato viral en acción.
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={onLoadModelPost}
                  className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-semibold transition cursor-pointer"
                >
                  ⚡ Ver Post Modelo
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || selectedItems.length === 0}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 active:scale-95 transition disabled:opacity-40 cursor-pointer"
                >
                  {selectedItems.length > 0
                    ? `Generar con las ${selectedItems.length} noticias seleccionadas`
                    : 'Selecciona noticias arriba para comenzar'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
