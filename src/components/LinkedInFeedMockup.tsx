import React, { useState } from 'react';
import {
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Send,
  MoreHorizontal,
  Globe,
  Sparkles,
  Check,
  Copy,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import type { CarouselSlide } from '../types/index.ts';

interface LinkedInFeedMockupProps {
  postContent: string;
  authorName?: string;
  authorHeadline?: string;
  carouselSlides?: CarouselSlide[];
  onCopyPost: () => void;
  isCopied: boolean;
}

// Renders bold mathematical characters using clean DOM strong tags so they never render as squares
function renderLinkedInTextWithBold(text: string) {
  if (!text) return null;
  const chunks: { text: string; isBold: boolean }[] = [];
  let currentChunk = '';
  let currentIsBold = false;

  for (const char of text) {
    const code = char.codePointAt(0);
    const isBold = Boolean(
      code &&
        ((code >= 0x1d5d4 && code <= 0x1d5ed) ||
          (code >= 0x1d5ee && code <= 0x1d607) ||
          (code >= 0x1d7ec && code <= 0x1d7f5))
    );

    let charToAppend = char;
    if (isBold && code) {
      if (code >= 0x1d5d4 && code <= 0x1d5ed) {
        charToAppend = String.fromCharCode(65 + (code - 0x1d5d4));
      } else if (code >= 0x1d5ee && code <= 0x1d607) {
        charToAppend = String.fromCharCode(97 + (code - 0x1d5ee));
      } else if (code >= 0x1d7ec && code <= 0x1d7f5) {
        charToAppend = String.fromCharCode(48 + (code - 0x1d7ec));
      }
    }

    if (isBold === currentIsBold) {
      currentChunk += charToAppend;
    } else {
      if (currentChunk.length > 0) {
        chunks.push({ text: currentChunk, isBold: currentIsBold });
      }
      currentChunk = charToAppend;
      currentIsBold = isBold;
    }
  }
  if (currentChunk.length > 0) {
    chunks.push({ text: currentChunk, isBold: currentIsBold });
  }

  return chunks.map((chunk, idx) =>
    chunk.isBold ? (
      <strong key={idx} className="font-extrabold text-white tracking-wide">
        {chunk.text}
      </strong>
    ) : (
      <span key={idx}>{chunk.text}</span>
    )
  );
}

export const LinkedInFeedMockup: React.FC<LinkedInFeedMockupProps> = ({
  postContent,
  authorName = 'Julián Grijalba',
  authorHeadline = 'AI & Data Strategy | Engineering Leader | Transforming analytics into business impact',
  carouselSlides,
  onCopyPost,
  isCopied,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  // Split post into preview portion and hidden portion for the "...ver más" LinkedIn experience
  const lines = postContent.split('\n');
  const previewLinesCount = 3;
  const hasMore = lines.length > previewLinesCount;

  const previewText = lines.slice(0, previewLinesCount).join('\n');
  const remainingText = lines.slice(previewLinesCount).join('\n');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentAuthorName, setCurrentAuthorName] = useState(authorName);
  const [currentAuthorHeadline, setCurrentAuthorHeadline] = useState(authorHeadline);

  return (
    <div className="bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl text-slate-100 max-w-2xl mx-auto">
      {/* Top Banner: Mockup Header */}
      <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700/70 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
          <span className="font-semibold text-slate-200">Vista Previa Real de LinkedIn</span>
          <span className="text-[10px] bg-slate-700/60 text-slate-300 px-1.5 py-0.2 rounded">
            Feed Móvil / Escritorio
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsEditingProfile(!isEditingProfile)}
            className="text-[11px] text-slate-400 hover:text-slate-200 underline"
          >
            {isEditingProfile ? 'Listo' : 'Editar perfil'}
          </button>
          <button
            onClick={onCopyPost}
            className="flex items-center space-x-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition active:scale-95 shadow-sm"
          >
            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{isCopied ? '¡Copiado!' : 'Copiar Post'}</span>
          </button>
        </div>
      </div>

      {/* LinkedIn Post Container */}
      <div className="p-4 sm:p-5 bg-slate-900">
        {/* Author Header */}
        <div className="flex items-start justify-between mb-3.5">
          <div className="flex items-start space-x-3 flex-1">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 border-2 border-slate-700 flex items-center justify-center font-bold text-white text-base shadow-sm flex-shrink-0">
              {currentAuthorName
                .split(' ')
                .map((n) => n[0])
                .slice(0, 2)
                .join('')}
            </div>
            <div className="flex-1">
              {isEditingProfile ? (
                <div className="space-y-1 mb-1">
                  <input
                    type="text"
                    value={currentAuthorName}
                    onChange={(e) => setCurrentAuthorName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-xs text-white"
                    placeholder="Tu nombre completo"
                  />
                  <input
                    type="text"
                    value={currentAuthorHeadline}
                    onChange={(e) => setCurrentAuthorHeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-[11px] text-slate-300"
                    placeholder="Tu titular profesional en LinkedIn"
                  />
                </div>
              ) : (
                <>
                  <div className="flex items-center space-x-1.5">
                    <h4 className="font-bold text-sm text-white hover:text-blue-400 cursor-pointer">
                      {currentAuthorName}
                    </h4>
                    <span className="text-slate-500 text-xs">• 1º</span>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-1 max-w-md">
                    {currentAuthorHeadline}
                  </p>
                </>
              )}
              <div className="flex items-center space-x-1 text-[11px] text-slate-500 mt-0.5">
                <span>1 h</span>
                <span>•</span>
                <Globe className="w-3 h-3 text-slate-400 inline" />
              </div>
            </div>
          </div>

          <button className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-800">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Post Text Body with LinkedIn "...ver más" / "...see more" behavior */}
        <div className="text-xs sm:text-[13px] leading-relaxed text-slate-200 whitespace-pre-wrap font-sans">
          {!isExpanded && hasMore ? (
            <>
              {renderLinkedInTextWithBold(previewText)}
              <button
                onClick={() => setIsExpanded(true)}
                className="text-slate-400 hover:text-blue-400 font-semibold ml-1 cursor-pointer"
              >
                ...ver más
              </button>
            </>
          ) : (
            <>
              {renderLinkedInTextWithBold(postContent)}
              {hasMore && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="block text-slate-400 hover:text-blue-400 text-xs font-semibold mt-2 cursor-pointer"
                >
                  (mostrar menos)
                </button>
              )}
            </>
          )}
        </div>

        {/* Visual Carousel Preview if slides exist */}
        {carouselSlides && carouselSlides.length > 0 && (
          <div className="mt-4 border border-slate-700/80 rounded-xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/80">
            <div className="p-4 min-h-[220px] flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/80 pb-2 mb-3">
                <span className="font-semibold text-cyan-400 flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>
                    Slide {activeSlideIndex + 1} de {carouselSlides.length}
                  </span>
                </span>
                <span className="text-[10px] bg-indigo-900/50 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-700/40">
                  {carouselSlides[activeSlideIndex]?.badge || 'Documento PDF'}
                </span>
              </div>

              {/* Current Slide Content */}
              <div className="my-auto py-2">
                <h5 className="font-bold text-base sm:text-lg text-white mb-2 leading-snug">
                  {carouselSlides[activeSlideIndex]?.title}
                </h5>
                {carouselSlides[activeSlideIndex]?.subtitle && (
                  <p className="text-xs text-cyan-300 font-medium mb-3">
                    {carouselSlides[activeSlideIndex]?.subtitle}
                  </p>
                )}
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {carouselSlides[activeSlideIndex]?.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start space-x-1.5">
                      <span className="text-cyan-400 font-bold">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {carouselSlides[activeSlideIndex]?.callout && (
                  <div className="mt-3 text-[11px] bg-slate-900/80 text-amber-300 p-2 rounded-lg border border-amber-500/20 font-medium">
                    💡 {carouselSlides[activeSlideIndex]?.callout}
                  </div>
                )}
              </div>

              {/* Slide Navigation */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs">
                <button
                  disabled={activeSlideIndex === 0}
                  onClick={() => setActiveSlideIndex((prev) => Math.max(0, prev - 1))}
                  className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>
                <div className="flex space-x-1">
                  {carouselSlides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === activeSlideIndex ? 'w-5 bg-cyan-400' : 'w-1.5 bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
                <button
                  disabled={activeSlideIndex === carouselSlides.length - 1}
                  onClick={() =>
                    setActiveSlideIndex((prev) => Math.min(carouselSlides.length - 1, prev + 1))
                  }
                  className="flex items-center space-x-1 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:pointer-events-none transition"
                >
                  <span>Siguiente</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reaction Counters */}
        <div className="flex items-center justify-between py-2.5 mt-3 border-b border-slate-800 text-[11px] text-slate-400">
          <div className="flex items-center space-x-1">
            <span className="inline-flex -space-x-1">
              <span className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white">
                👍
              </span>
              <span className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-[9px] text-white">
                💡
              </span>
              <span className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center text-[9px] text-white">
                👏
              </span>
            </span>
            <span className="ml-1 text-slate-400">148 reacciones</span>
          </div>
          <div className="space-x-2">
            <span>26 comentarios</span>
            <span>•</span>
            <span>9 compartidos</span>
          </div>
        </div>

        {/* LinkedIn Bottom Action Bar */}
        <div className="grid grid-cols-4 pt-1.5 text-xs font-semibold text-slate-400">
          <button className="flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-800/80 rounded-lg text-slate-300 hover:text-blue-400 transition">
            <ThumbsUp className="w-4 h-4" />
            <span className="hidden sm:inline">Reaccionar</span>
          </button>
          <button className="flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-800/80 rounded-lg text-slate-300 hover:text-blue-400 transition">
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">Comentar</span>
          </button>
          <button className="flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-800/80 rounded-lg text-slate-300 hover:text-blue-400 transition">
            <Repeat2 className="w-4 h-4" />
            <span className="hidden sm:inline">Compartir</span>
          </button>
          <button className="flex items-center justify-center space-x-1.5 py-2 hover:bg-slate-800/80 rounded-lg text-slate-300 hover:text-blue-400 transition">
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
