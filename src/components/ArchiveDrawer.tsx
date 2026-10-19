import React from 'react';
import { X, Calendar, ArrowRight, Bookmark, CheckCircle2, FileText } from 'lucide-react';
import type { WeeklyEdition, GeneratedPost } from '../types/index.ts';

interface ArchiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  editions: WeeklyEdition[];
  savedPosts: GeneratedPost[];
  onSelectEdition: (edition: WeeklyEdition) => void;
  onLoadSavedPost: (post: GeneratedPost) => void;
}

export const ArchiveDrawer: React.FC<ArchiveDrawerProps> = ({
  isOpen,
  onClose,
  editions,
  savedPosts,
  onSelectEdition,
  onLoadSavedPost,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div>
              <h3 className="font-bold text-lg text-white">Archivo de Ediciones</h3>
              <p className="text-xs text-slate-400">
                Historial semanal y borradores guardados para LinkedIn
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
              aria-label="Cerrar archivo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Saved Posts Section */}
          {savedPosts && savedPosts.length > 0 && (
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
                <Bookmark className="w-3.5 h-3.5 text-indigo-400" />
                <span>Borradores Guardados ({savedPosts.length})</span>
              </h4>
              <div className="space-y-2.5">
                {savedPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      onLoadSavedPost(post);
                      onClose();
                    }}
                    className="p-3 rounded-xl bg-slate-950/70 border border-indigo-900/40 hover:border-indigo-500/50 cursor-pointer transition"
                  >
                    <div className="flex items-center justify-between text-[11px] text-indigo-400 mb-1">
                      <span className="font-semibold">{post.template}</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-slate-200 font-medium line-clamp-2">
                      {post.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Weekly Editions List */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ediciones Semanales del Radar</span>
            </h4>
            <div className="space-y-3">
              {editions.map((edition) => (
                <div
                  key={edition.id}
                  onClick={() => {
                    onSelectEdition(edition);
                    onClose();
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    edition.status === 'active'
                      ? 'bg-slate-950/80 border-cyan-500/40 hover:border-cyan-400'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-bold text-cyan-400">
                      Semana {edition.weekNumber} • {edition.year}
                    </span>
                    {edition.status === 'active' ? (
                      <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded-full font-medium">
                        Actual
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-500">Archivada</span>
                    )}
                  </div>
                  <h5 className="font-semibold text-xs text-slate-200 mb-1">{edition.title}</h5>
                  <p className="text-[11px] text-slate-400 mb-2">{edition.dateRange}</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
                    <span>{edition.items.length} novedades recopiladas</span>
                    <span className="flex items-center space-x-1 text-cyan-400">
                      <span>Explorar</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer tip */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500">
          Tip: El agente puede guardar cada semana automáticamente el radar y redactar un borrador los lunes.
        </div>
      </div>
    </div>
  );
};
