import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Quote,
  ExternalLink,
  Search,
  Check,
  ChevronRight,
  TrendingUp,
  Brain,
  ShieldAlert,
} from 'lucide-react';
import { INDUSTRY_EXPERTS, IndustryExpert } from '../data/experts.ts';

interface ExpertsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInjectPerspective: (expert: IndustryExpert) => void;
  onFilterByExpertPortal: (portalSource: string) => void;
}

export const ExpertsModal: React.FC<ExpertsModalProps> = ({
  isOpen,
  onClose,
  onInjectPerspective,
  onFilterByExpertPortal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedExpertId, setAppliedExpertId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredExperts = INDUSTRY_EXPERTS.filter((expert) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      expert.name.toLowerCase().includes(q) ||
      expert.role.toLowerCase().includes(q) ||
      expert.organization.toLowerCase().includes(q) ||
      expert.keyTheme.toLowerCase().includes(q) ||
      expert.highlightQuote.toLowerCase().includes(q)
    );
  });

  const handleApply = (expert: IndustryExpert) => {
    onInjectPerspective(expert);
    setAppliedExpertId(expert.id);
    setTimeout(() => {
      setAppliedExpertId(null);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl relative text-slate-100 max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                  <span>Voces Expertas & Líderes de Opinión en IA & Data</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                    {INDUSTRY_EXPERTS.length} Líderes
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Posturas críticas, análisis sin filtro y citas clave para dotar a tus posts de LinkedIn de máxima autoridad
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por experto (Andrew Ng, Karpathy, Cassie, Zach Wilson...), tema o cita..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Experts Grid (Scrollable) */}
        <div className="overflow-y-auto pr-1 my-2 space-y-3 max-h-[55vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {filteredExperts.map((expert) => {
              const isApplied = appliedExpertId === expert.id;
              return (
                <div
                  key={expert.id}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Avatar & Name */}
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                          {expert.avatarInitials}
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="font-bold text-xs sm:text-sm text-white">
                              {expert.name}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                              {expert.badge}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 block">
                            {expert.role} • <span className="text-slate-300">{expert.organization}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Theme tag */}
                    <div className="mb-2.5">
                      <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-950/40 px-2 py-0.5 rounded-md border border-cyan-800/30">
                        {expert.keyTheme}
                      </span>
                    </div>

                    {/* Highlight Quote */}
                    <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 italic mb-2.5 relative">
                      <Quote className="w-3.5 h-3.5 text-indigo-400 absolute -top-1.5 -left-1.5 bg-slate-900 rounded-full" />
                      <p className="line-clamp-3 pl-1 text-[11px] leading-relaxed">
                        "{expert.highlightQuote}"
                      </p>
                    </div>

                    {/* Recent Take Insight */}
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                      {expert.recentInsight}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-850 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-500 truncate max-w-[140px]" title={expert.portalSource}>
                      {expert.portalSource}
                    </span>
                    <button
                      onClick={() => handleApply(expert)}
                      disabled={isApplied}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition cursor-pointer ${
                        isApplied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm active:scale-95'
                      }`}
                      title="Inyecta la perspectiva de este experto en tu post para darle autoridad"
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>¡Aplicado al Post!</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                          <span>Inyectar en Post</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            💡 Al hacer clic en <strong>"Inyectar en Post"</strong>, la postura del experto se añade automáticamente a tu generador para LinkedIn.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
