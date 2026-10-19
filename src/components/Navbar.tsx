import React from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  History,
  RotateCw,
  Sliders,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Brain,
} from 'lucide-react';

interface NavbarProps {
  currentWeekText: string;
  isScanning: boolean;
  onTriggerScan: () => void;
  onOpenSchedule: () => void;
  onOpenArchive: () => void;
  onOpenSources: () => void;
  onOpenExperts: () => void;
  hasApiKey: boolean;
  selectedCount: number;
  onJumpToStudio: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentWeekText,
  isScanning,
  onTriggerScan,
  onOpenSchedule,
  onOpenArchive,
  onOpenSources,
  onOpenExperts,
  hasApiKey,
  selectedCount,
  onJumpToStudio,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Identity */}
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  RadarIA & Data
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-400 border border-cyan-800/60">
                  LinkedIn Curator
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden md:block">
                Agente autónomo semanal de novedades para LinkedIn
              </p>
            </div>
          </div>

          {/* Center: Current Week Badge */}
          <div className="hidden lg:flex items-center bg-slate-800/80 border border-slate-700/60 rounded-full px-3 py-1.5 text-xs text-slate-300 space-x-2">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-medium text-slate-200">{currentWeekText}</span>
            <span className="w-1 h-1 rounded-full bg-slate-500"></span>
            <span className="text-emerald-400 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Radar Activo</span>
            </span>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Quick jump to post studio if items selected */}
            {selectedCount > 0 && (
              <button
                onClick={onJumpToStudio}
                className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/40 text-xs font-semibold transition"
              >
                <span>{selectedCount} sel.</span>
                <span className="text-[10px] bg-indigo-500 text-white rounded-full px-1.5 py-0.2">
                  Post
                </span>
              </button>
            )}

            {/* Curated Sources Modal */}
            <button
              onClick={onOpenSources}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer"
              title="Ver las 17 fuentes y portales monitorizados"
              aria-label="Ver fuentes monitorizadas"
            >
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Fuentes (20)</span>
            </button>

            {/* Industry Experts Modal */}
            <button
              onClick={onOpenExperts}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-indigo-950/50 hover:bg-indigo-900/50 text-indigo-300 hover:text-white border border-indigo-700/50 text-xs font-medium transition flex items-center space-x-1.5 cursor-pointer"
              title="Ver posturas, citas y análisis de líderes en IA y Data"
              aria-label="Ver líderes expertos"
            >
              <Brain className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Expertos (8)</span>
            </button>

            {/* Past editions archive */}
            <button
              onClick={onOpenArchive}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition flex items-center space-x-1.5"
              title="Ver ediciones pasadas y posts guardados"
              aria-label="Ediciones pasadas"
            >
              <History className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ediciones</span>
            </button>

            {/* Automated Schedule Modal */}
            <button
              onClick={onOpenSchedule}
              className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition flex items-center space-x-1.5"
              title="Programar escaneo automático semanal"
              aria-label="Programación de rutina"
            >
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Rutina</span>
            </button>

            {/* Scan Now Trigger */}
            <button
              onClick={onTriggerScan}
              disabled={isScanning}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 active:scale-95 transition disabled:opacity-50 whitespace-nowrap"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Escaneando...' : 'Escanear'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
