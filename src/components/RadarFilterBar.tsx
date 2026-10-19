import React from 'react';
import {
  Search,
  Sparkles,
  Database,
  BarChart3,
  Building2,
  Layers,
  CheckSquare,
  Square,
  BookOpen,
  Brain,
  Zap,
  Rocket,
  Code2,
} from 'lucide-react';
import type { NewsCategory } from '../types/index.ts';

interface RadarFilterBarProps {
  selectedCategory: NewsCategory;
  onSelectCategory: (cat: NewsCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalItems: number;
  selectedCount: number;
  onSelectAllTop: () => void;
  onClearSelection: () => void;
  isAllSelected: boolean;
  onOpenSources: () => void;
  onOpenExperts: () => void;
  onSelectViralExample: () => void;
}

const CATEGORIES: { id: NewsCategory; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'Todo el Radar (20)', icon: Layers },
  { id: 'launches-tools', label: '🚀 Lanzamientos & Tools', icon: Rocket },
  { id: 'github-repos', label: '⭐ Repositorios Virales', icon: Code2 },
  { id: 'agentic-ai', label: 'Agentes & IA', icon: Sparkles },
  { id: 'ai-models', label: 'Modelos & LLMs', icon: Brain },
  { id: 'data-engineering', label: 'Data & Lakehouse', icon: Database },
  { id: 'analytics-bi', label: 'Analytics & BI', icon: BarChart3 },
  { id: 'industry-roi', label: 'Casos & ROI', icon: Building2 },
];

export const RadarFilterBar: React.FC<RadarFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalItems,
  selectedCount,
  onSelectAllTop,
  onClearSelection,
  isAllSelected,
  onOpenSources,
  onOpenExperts,
  onSelectViralExample,
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 mb-6 shadow-sm space-y-3">
      {/* Top row: Categories & Intelligence Hub Triggers */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-slate-700/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Intelligence Hub Buttons: Sources & Experts */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={onOpenSources}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 border border-cyan-700/50 text-xs font-medium transition cursor-pointer"
            title="Ver los 17 portales y blogs monitorizados"
          >
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Portales (20)</span>
          </button>
          <button
            onClick={onOpenExperts}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-950/40 hover:bg-indigo-900/40 text-indigo-300 border border-indigo-700/50 text-xs font-medium transition cursor-pointer"
            title="Ver citas, opiniones y posturas de líderes mundiales en IA y Data"
          >
            <Brain className="w-3.5 h-3.5 text-indigo-400" />
            <span>Voces Expertas (8)</span>
          </button>
        </div>
      </div>

      {/* Bottom row: Search & Quick Selection actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por término, tool (Claude, Iceberg, DuckDB...) o portal..."
            className="w-full bg-slate-950/70 border border-slate-700/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs flex-wrap gap-y-1.5">
          <button
            onClick={onSelectViralExample}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 text-amber-300 border border-amber-500/40 font-semibold transition cursor-pointer"
            title="Cargar las 4 novedades del post modelo: Claude Dashboards, REA, ArtCraft y Claude Workspace"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>4 Novedades Modelo</span>
          </button>

          <button
            onClick={onSelectAllTop}
            className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 border border-slate-700 transition cursor-pointer"
            title="Selecciona las 4 primeras noticias del filtro actual"
          >
            <CheckSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAllSelected ? 'Re-seleccionar Top' : 'Elegir Top 4'}</span>
          </button>

          {selectedCount > 0 && (
            <button
              onClick={onClearSelection}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-750 text-slate-400 hover:text-slate-200 border border-slate-700/50 transition cursor-pointer"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Limpiar ({selectedCount})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
