import React, { useState } from 'react';
import { Cross, Volume2, Sparkles, Heart, Users, BookOpen, Quote } from 'lucide-react';
import { JESUS_SECTIONS } from '../data/faithData';
import { speechManager } from '../utils/speech';

export const JesusView: React.FC = () => {
  const [activeAudience, setActiveAudience] = useState<'all' | 'children' | 'youth' | 'adults'>('all');
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const handleSpeak = (text: string, index: number) => {
    if (speakingIndex === index) {
      speechManager.stop();
      setSpeakingIndex(null);
    } else {
      speechManager.speak(text, () => setSpeakingIndex(null));
      setSpeakingIndex(index);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#101F42] to-[#1C2D5A] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Cross className="w-3.5 h-3.5" />
          <span>El Verbo Encarnado</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred tracking-wide text-white mb-4">
          ✝️ Jesucristo: Camino, Verdad y Vida
        </h1>
        <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          «Yo soy la resurrección y la vida; el que cree en mí, aunque haya muerto, vivirá» (Jn 11, 25).
          Jesucristo es el centro indivisible de nuestra fe, Señor de la historia y único Redentor de la humanidad.
        </p>

        {/* Audience Selector */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
          <span className="text-xs text-slate-300 font-semibold mr-2 flex items-center gap-1">
            <Users className="w-4 h-4 text-[#D4AF37]" /> Adaptado para:
          </span>
          <button
            onClick={() => setActiveAudience('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeAudience === 'all'
                ? 'bg-[#D4AF37] text-[#0A1128] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            Vista General
          </button>
          <button
            onClick={() => setActiveAudience('children')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeAudience === 'children'
                ? 'bg-amber-400 text-[#0A1128] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            🧸 Para Niños
          </button>
          <button
            onClick={() => setActiveAudience('youth')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeAudience === 'youth'
                ? 'bg-sky-400 text-[#0A1128] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            ⚡ Para Jóvenes
          </button>
          <button
            onClick={() => setActiveAudience('adults')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeAudience === 'adults'
                ? 'bg-indigo-300 text-[#0A1128] shadow-md'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            📖 Para Adultos
          </button>
        </div>
      </div>

      {/* Core Life of Jesus Sections */}
      <div className="space-y-8">
        {JESUS_SECTIONS.map((item, index) => (
          <div
            key={item.section}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 hover:border-[#D4AF37]/50 transition"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0A1128] text-[#D4AF37] flex items-center justify-center font-sacred font-bold text-sm">
                  {index + 1}
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-sacred text-slate-900">
                  {item.title}
                </h2>
              </div>
              <button
                onClick={() => handleSpeak(`${item.title}. ${item.description}`, index)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                  speakingIndex === index
                    ? 'bg-rose-100 text-rose-700 animate-pulse'
                    : 'bg-slate-100 hover:bg-[#D4AF37]/20 text-slate-700'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>{speakingIndex === index ? 'Detener voz' : 'Escuchar'}</span>
              </button>
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
              {item.description}
            </p>

            {/* Biblical Quote Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-6 flex items-start gap-3">
              <Quote className="w-5 h-5 text-[#B8860B] shrink-0 mt-0.5" />
              <div>
                <p className="font-scripture text-base sm:text-lg text-slate-800 italic leading-snug">
                  «{item.biblicalQuote}»
                </p>
                <span className="text-xs font-bold text-[#B8860B] mt-1 inline-block">
                  — {item.reference}
                </span>
              </div>
            </div>

            {/* Audience Specific Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(activeAudience === 'all' || activeAudience === 'children') && (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100">
                  <div className="text-xs font-bold text-sky-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>🧸 Niños</span>
                  </div>
                  <p className="text-xs text-sky-950 leading-relaxed">
                    {item.targetAudience.children}
                  </p>
                </div>
              )}
              {(activeAudience === 'all' || activeAudience === 'youth') && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
                  <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>⚡ Jóvenes</span>
                  </div>
                  <p className="text-xs text-amber-950 leading-relaxed">
                    {item.targetAudience.youth}
                  </p>
                </div>
              )}
              {(activeAudience === 'all' || activeAudience === 'adults') && (
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-100">
                  <div className="text-xs font-bold text-purple-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <span>📖 Adultos</span>
                  </div>
                  <p className="text-xs text-purple-950 leading-relaxed">
                    {item.targetAudience.adults}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Oración al Sagrado Corazón de Jesús */}
      <div className="bg-gradient-to-r from-red-950 to-[#0A1128] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-red-800/40 text-center">
        <Heart className="w-12 h-12 text-rose-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold font-sacred text-rose-200 mb-3">
          Consagración al Sagrado Corazón de Jesús
        </h3>
        <p className="max-w-2xl mx-auto font-scripture text-base sm:text-lg italic leading-relaxed text-slate-200">
          «Rendido a tus pies, ¡oh Jesús mío!, considerando las inefables muestras de amor que me has dado y las continuas amarguras que te he causado con mis pecados, vengo a consagrarme entero a tu Divino Corazón. Haz que yo no viva sino para amarte, servirte y alabarte en el tiempo y en la eternidad. Sagrado Corazón de Jesús, en Vos confío.»
        </p>
      </div>
    </div>
  );
};
