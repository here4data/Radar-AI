import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Search,
  CheckCircle2,
  Sparkles,
  Database,
  BarChart3,
  Globe2,
  BookOpen,
} from 'lucide-react';
import { CURATED_PORTALS, CuratedSource } from '../data/sources.ts';

interface SourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanWithSource: (source: CuratedSource) => void;
  onFilterBySource: (sourceName: string) => void;
  activeSourceFilter?: string;
}

export const SourcesModal: React.FC<SourcesModalProps> = ({
  isOpen,
  onClose,
  onScanWithSource,
  onFilterBySource,
  activeSourceFilter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: `Todas (${CURATED_PORTALS.length})` },
    { id: 'launches-repos', label: '🚀 Lanzamientos & Repos (3)' },
    { id: 'espanol', label: '🇪🇸 En Español (6)' },
    { id: 'ai-global', label: '🤖 IA Global (4)' },
    { id: 'analytics-bi', label: '📊 Analytics & BI (4)' },
    { id: 'big-data', label: '💾 Big Data (3)' },
  ];

  const filtered = CURATED_PORTALS.filter((s) => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    if (!matchesCat) return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.domain.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative text-slate-100 max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Portales & Fuentes de Inteligencia Monitorizadas
                </h3>
                <p className="text-xs text-slate-400">
                  Las 17 fuentes de máxima autoridad en IA, Data y Analytics donde el agente rastrea novedades
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Controls: Category tabs & search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                    selectedCategory === c.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="relative sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por portal..."
                className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Portals Grid (Scrollable) */}
        <div className="overflow-y-auto pr-1 my-2 space-y-2.5 max-h-[52vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((portal) => {
              const isFiltered = activeSourceFilter === portal.name;
              return (
                <div
                  key={portal.id}
                  className={`p-3.5 rounded-2xl border transition ${
                    isFiltered
                      ? 'bg-cyan-950/30 border-cyan-400 ring-1 ring-cyan-500/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-xs text-white hover:text-cyan-400">
                          {portal.name}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      </div>
                      <span className="text-[11px] text-cyan-400 font-mono">
                        {portal.domain}
                      </span>
                    </div>

                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                      title={`Visitar ${portal.name}`}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-snug mb-2">
                    {portal.description}
                  </p>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-medium">
                      {portal.categoryLabel}
                    </span>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => {
                          onFilterBySource(portal.name);
                          onClose();
                        }}
                        className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-[10px] font-medium border border-slate-700 transition"
                      >
                        {isFiltered ? 'Quitar filtro' : 'Ver en radar'}
                      </button>
                      <button
                        onClick={() => {
                          onScanWithSource(portal);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-[10px] font-semibold transition shadow-sm"
                        title={`Escanear esta semana priorizando ${portal.name}`}
                      >
                        Escanear portal
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5 text-emerald-400 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>El agente rastrea automáticamente estas 17 fuentes con Google Search Grounding.</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
