import React, { useState } from 'react';
import { X, Clock, Sparkles, Check, Bell, Calendar, ShieldCheck } from 'lucide-react';
import type { ScheduledScanConfig, PostTemplate, PostTone } from '../types/index.ts';

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ScheduledScanConfig;
  onSaveConfig: (config: ScheduledScanConfig) => void;
  onRunScheduledRoutineNow: () => void;
}

export const ScheduleModal: React.FC<ScheduleModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onRunScheduledRoutineNow,
}) => {
  const [localConfig, setLocalConfig] = useState<ScheduledScanConfig>(config);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveConfig(localConfig);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Rutina Semanal del Agente Curador
            </h3>
            <p className="text-xs text-slate-400">
              Automatiza la recopilación de noticias y la preparación de tus posts de LinkedIn
            </p>
          </div>
        </div>

        {/* Form Options */}
        <div className="space-y-4 text-xs">
          {/* Enable Switch */}
          <div className="flex items-center justify-between p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800">
            <div>
              <span className="font-semibold text-slate-200 block">
                Escaneo y Curaduría Automática Semanal
              </span>
              <span className="text-[11px] text-slate-400">
                El agente investigará la web con Google Search grounding cada semana.
              </span>
            </div>
            <button
              onClick={() =>
                setLocalConfig((prev) => ({ ...prev, enabled: !prev.enabled }))
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                localConfig.enabled ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  localConfig.enabled ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>

          {/* Schedule Settings: Day & Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Día de la semana
              </label>
              <select
                value={localConfig.dayOfWeek}
                onChange={(e) =>
                  setLocalConfig((prev) => ({ ...prev, dayOfWeek: e.target.value }))
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="Lunes">Lunes (Recomendado para LinkedIn)</option>
                <option value="Martes">Martes</option>
                <option value="Miércoles">Miércoles</option>
                <option value="Jueves">Jueves</option>
                <option value="Viernes">Viernes (Cierre semanal)</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1.5">
                Hora de escaneo
              </label>
              <select
                value={localConfig.time}
                onChange={(e) =>
                  setLocalConfig((prev) => ({ ...prev, time: e.target.value }))
                }
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              >
                <option value="07:30 AM">07:30 AM (Antes de iniciar jornada)</option>
                <option value="08:30 AM">08:30 AM (Horario pico de lectura)</option>
                <option value="09:30 AM">09:30 AM</option>
                <option value="12:00 PM">12:00 PM (Mediodía)</option>
              </select>
            </div>
          </div>

          {/* Auto draft post toggle */}
          <div className="p-3.5 bg-slate-950/60 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-200 block">
                  Redactar borrador de post automáticamente
                </span>
                <span className="text-[11px] text-slate-400">
                  Deja un post listo con los 4 temas más impactantes para que solo tengas que revisarlo.
                </span>
              </div>
              <input
                type="checkbox"
                checked={localConfig.autoDraftPost}
                onChange={(e) =>
                  setLocalConfig((prev) => ({ ...prev, autoDraftPost: e.target.checked }))
                }
                className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
              />
            </div>

            {localConfig.autoDraftPost && (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Formato preferido:</span>
                  <select
                    value={localConfig.preferredTemplate}
                    onChange={(e) =>
                      setLocalConfig((prev) => ({
                        ...prev,
                        preferredTemplate: e.target.value as PostTemplate,
                      }))
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-300 text-xs"
                  >
                    <option value="weekly-roundup">Weekly Roundup</option>
                    <option value="deep-dive">Deep Dive Analítico</option>
                    <option value="contrarian-debate">Hype vs Realidad</option>
                    <option value="carousel-slides">Carrusel Slides</option>
                    <option value="executive-summary">TL;DR Ejecutivo</option>
                  </select>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Tono preferido:</span>
                  <select
                    value={localConfig.preferredTone}
                    onChange={(e) =>
                      setLocalConfig((prev) => ({
                        ...prev,
                        preferredTone: e.target.value as PostTone,
                      }))
                    }
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-slate-300 text-xs"
                  >
                    <option value="visionary">Visionario</option>
                    <option value="technical">Técnico</option>
                    <option value="educational">Educativo</option>
                    <option value="candid">Directo</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => {
              onRunScheduledRoutineNow();
              onClose();
            }}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs font-semibold border border-slate-700 transition"
          >
            Probar rutina completa ahora
          </button>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-transparent text-slate-400 hover:text-white text-xs font-medium"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="w-full sm:w-auto px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md shadow-cyan-500/20 active:scale-95 transition flex items-center justify-center space-x-1.5"
            >
              {savedSuccess ? <Check className="w-4 h-4 stroke-[3]" /> : null}
              <span>{savedSuccess ? 'Guardado' : 'Guardar Rutina'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
