import React, { useState } from 'react';
import {
  ExternalLink,
  MessageSquare,
  TrendingUp,
  Tag,
  Check,
  ChevronDown,
  ChevronUp,
  Edit3,
  Rocket,
  Star,
  Sparkles,
  Code2,
} from 'lucide-react';
import type { NewsItem } from '../types/index.ts';

interface NewsCardProps {
  item: NewsItem;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onUpdateAuthorNote: (id: string, note: string) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  item,
  isSelected,
  onToggleSelect,
  onUpdateAuthorNote,
}) => {
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [noteText, setNoteText] = useState(item.authorNote || '');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSaveNote = () => {
    onUpdateAuthorNote(item.id, noteText);
    setIsEditingNote(false);
  };

  const getImpactBadge = (level: NewsItem['impactLevel']) => {
    switch (level) {
      case 'Disruptivo':
        return (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
            <span>Disruptivo</span>
          </span>
        );
      case 'Alto':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            Impacto Alto
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
            Relevante
          </span>
        );
    }
  };

  const getCategoryLabel = (cat: NewsItem['category']) => {
    switch (cat) {
      case 'launches-tools':
        return '🚀 Lanzamientos & Tools';
      case 'github-repos':
        return '⭐ Repositorios Virales';
      case 'agentic-ai':
        return 'Agentes & Workflow';
      case 'ai-models':
        return 'Modelos & LLMs';
      case 'data-engineering':
        return 'Data Lakehouse';
      case 'analytics-bi':
        return 'Analytics & BI';
      case 'industry-roi':
        return 'ROI & Estrategia';
      default:
        return cat;
    }
  };

  return (
    <div
      className={`relative rounded-2xl p-5 transition-all duration-200 border ${
        isSelected
          ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
          : 'bg-slate-900/50 hover:bg-slate-900/75 border-slate-800/80 hover:border-slate-700/80 shadow-sm'
      }`}
    >
      {/* Top Bar: Selector, Impact, Category & Badges */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center space-x-2 flex-wrap gap-y-1">
          {getImpactBadge(item.impactLevel)}

          {/* Special Type Badges: Lanzamiento / Repositorio */}
          {item.itemType === 'lanzamiento' && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-xs">
              <Rocket className="w-2.5 h-2.5 text-emerald-400" />
              <span>Lanzamiento</span>
            </span>
          )}

          {item.itemType === 'repositorio' && (
            <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-500/15 text-violet-300 border border-violet-500/30 shadow-xs">
              <Code2 className="w-2.5 h-2.5 text-violet-400" />
              <span>Repo Open Source</span>
            </span>
          )}

          {item.githubStars && (
            <a
              href={item.repoUrl || item.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/40 hover:bg-purple-500/25 transition cursor-pointer"
              title="Ver repositorio en GitHub"
            >
              <Star className="w-2.5 h-2.5 fill-purple-400 text-purple-400" />
              <span>GitHub {item.githubStars}</span>
            </a>
          )}

          <span className="text-[11px] font-semibold text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-700/50">
            {getCategoryLabel(item.category)}
          </span>
          <span className="text-[11px] text-slate-500">• {item.publishedDate}</span>
        </div>

        {/* Checkbox Selector */}
        <button
          onClick={() => onToggleSelect(item.id)}
          className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
            isSelected
              ? 'bg-cyan-500 text-slate-950 shadow-sm'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700'
          }`}
          aria-label={isSelected ? `Deseleccionar ${item.title}` : `Seleccionar ${item.title}`}
        >
          <div
            className={`w-3.5 h-3.5 rounded flex items-center justify-center border transition ${
              isSelected ? 'bg-slate-950 border-slate-950 text-cyan-400' : 'border-slate-500 bg-transparent'
            }`}
          >
            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
          </div>
          <span>{isSelected ? 'Incluida' : 'Incluir en post'}</span>
        </button>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-base text-slate-100 leading-snug mb-2 group">
        {item.title}
      </h3>

      {/* Summary */}
      <p className="text-xs text-slate-300 leading-relaxed mb-3">{item.summary}</p>

      {/* Callout: Para la gente normal / curiosos */}
      {item.forNormalPeople && (
        <div className="bg-amber-950/20 border border-amber-800/40 rounded-xl p-2.5 text-xs text-amber-200/90 flex items-start space-x-2 my-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-amber-300 block text-[11px]">
              ¿Por qué le llama la atención a la gente de a pie?
            </span>
            <p className="text-[11px] text-amber-100/80 leading-relaxed mt-0.5">
              {item.forNormalPeople}
            </p>
          </div>
        </div>
      )}

      {/* Expandable Why It Matters & Metric */}
      {isExpanded && (
        <div className="space-y-2.5 my-3 pt-2 border-t border-slate-800/70 text-xs">
          {/* Why It Matters */}
          <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/60">
            <span className="font-semibold text-cyan-300 block mb-1 flex items-center space-x-1">
              <span>👉 Por qué le importa a tu audiencia de LinkedIn:</span>
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">{item.whyItMatters}</p>
          </div>

          {/* Key Metric or Insight Tag */}
          {item.keyMetricOrInsight && (
            <div className="flex items-center space-x-2 text-[11px] text-emerald-400 bg-emerald-950/30 px-3 py-1.5 rounded-lg border border-emerald-900/40 font-medium">
              <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{item.keyMetricOrInsight}</span>
            </div>
          )}

          {/* Author's perspective / note */}
          <div className="bg-indigo-950/20 border border-indigo-900/30 rounded-xl p-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-indigo-300 flex items-center space-x-1">
                <MessageSquare className="w-3 h-3 text-indigo-400" />
                <span>Mi postura u opinión personal:</span>
              </span>
              {!isEditingNote && (
                <button
                  onClick={() => setIsEditingNote(true)}
                  className="text-[10px] text-indigo-400 hover:text-indigo-200 flex items-center space-x-1"
                >
                  <Edit3 className="w-2.5 h-2.5" />
                  <span>{item.authorNote ? 'Editar' : 'Añadir opinión'}</span>
                </button>
              )}
            </div>

            {isEditingNote ? (
              <div className="space-y-2 mt-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Ej: Lo he visto en clientes: la clave está en estandarizar el cálculo del churn antes de conectar cualquier LLM..."
                  className="w-full bg-slate-950 border border-indigo-500/40 rounded-lg p-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-400 resize-none h-18"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsEditingNote(false)}
                    className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-[11px] hover:text-slate-200"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSaveNote}
                    className="px-2.5 py-1 rounded bg-indigo-600 text-white text-[11px] font-medium hover:bg-indigo-500"
                  >
                    Guardar nota
                  </button>
                </div>
              </div>
            ) : item.authorNote ? (
              <p className="text-[11px] text-slate-300 italic">"{item.authorNote}"</p>
            ) : (
              <p className="text-[11px] text-slate-500">
                Opcional: Añade tu opinión para que el post de LinkedIn suene 100% auténtico con tu voz.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Footer: Tags & Source Link */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/60 mt-3 text-xs">
        <div className="flex items-center space-x-1.5 flex-wrap gap-1">
          <Tag className="w-3 h-3 text-slate-500 flex-shrink-0" />
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/40"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-[11px] text-slate-400 hover:text-slate-200 flex items-center space-x-0.5"
          >
            <span>{isExpanded ? 'Menos' : 'Detalles'}</span>
            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-medium text-cyan-400 hover:text-cyan-300 flex items-center space-x-1.5 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-800/40 transition hover:border-cyan-500/50"
            title="Abrir fuente original"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
            <span>{item.sourceName}</span>
            <ExternalLink className="w-2.5 h-2.5 text-cyan-400" />
          </a>
        </div>
      </div>
    </div>
  );
};
