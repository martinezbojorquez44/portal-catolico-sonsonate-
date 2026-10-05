import React, { useState } from 'react';
import { BookOpen, Volume2, Share2, MessageCircle, Copy, Check, Calendar, Sparkles, Quote } from 'lucide-react';
import { getTodayLiturgy } from '../data/liturgyData';
import { ViewType } from '../types';
import { speechManager } from '../utils/speech';

interface GospelViewProps {
  onNavigate: (view: ViewType) => void;
}

export const GospelView: React.FC<GospelViewProps> = ({ onNavigate }) => {
  const liturgy = getTodayLiturgy();
  const [speaking, setSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleToggleSpeak = () => {
    if (speaking) {
      speechManager.stop();
      setSpeaking(false);
    } else {
      const fullText = `Liturgia del día. ${liturgy.date}. Primera Lectura: ${liturgy.firstReadingRef}. ${liturgy.firstReadingText}. Salmo Responsorial: ${liturgy.psalmResponse}. ${liturgy.gospelRef}. ${liturgy.gospelText}. Reflexión: ${liturgy.reflection}. Oración: ${liturgy.prayer}.`;
      speechManager.speak(fullText, () => setSpeaking(false));
      setSpeaking(true);
    }
  };

  const handleShare = async () => {
    const text = `📖 Evangelio del Día - Diócesis de Sonsonate (${liturgy.date})\n\n${liturgy.gospelRef}\n«${liturgy.gospelText}»\n\nReflexión: ${liturgy.reflection}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Evangelio del Día - Diócesis de Sonsonate',
          text
        });
      } catch (e) {
        // Fallback to copy
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-10 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-3 border border-[#D4AF37]/30">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Liturgia de la Palabra</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-2">
          📖 Evangelio del Día
        </h1>
        <p className="text-[#D4AF37] font-semibold text-sm sm:text-base capitalize">
          {liturgy.date}
        </p>
        <p className="text-xs text-slate-300 mt-1">
          {liturgy.liturgicalDay} • {liturgy.cycle}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap justify-center items-center gap-3">
          <button
            onClick={handleToggleSpeak}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              speaking
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-[#D4AF37] text-[#0A1128] hover:bg-[#E6CA65] shadow-lg'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span>{speaking ? 'Detener lectura en voz alta' : 'Escuchar el Evangelio'}</span>
          </button>
          <button
            onClick={handleShare}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center gap-2"
          >
            <Share2 className="w-4 h-4 text-[#D4AF37]" />
            <span>{copied ? '¡Copiado al portapapeles!' : 'Compartir'}</span>
          </button>
          <button
            onClick={() => onNavigate('ai')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Preguntar a la IA sobre esta lectura</span>
          </button>
        </div>
      </div>

      {/* Primera Lectura */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
            Primera Lectura
          </span>
          <span className="text-xs font-semibold text-slate-500">{liturgy.firstReadingRef}</span>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-scripture italic">
          {liturgy.firstReadingText}
        </p>
        <span className="block text-right text-xs font-bold text-slate-500 mt-4">Palabra de Dios.</span>
      </div>

      {/* Salmo Responsorial */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
          <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
            Salmo Responsorial
          </span>
          <span className="text-xs font-semibold text-slate-500">{liturgy.psalmRef}</span>
        </div>
        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-4">
          <span className="text-xs font-bold text-amber-900 block mb-1">R/. Respuesta:</span>
          <p className="text-sm sm:text-base font-bold font-sacred text-amber-950">
            «{liturgy.psalmResponse}»
          </p>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-scripture italic">
          {liturgy.psalmText}
        </p>
      </div>

      {/* SANTO EVANGELIO */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#D4AF37] relative">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <span className="px-3 py-1 rounded-full bg-[#0A1128] text-[#D4AF37] text-xs font-bold font-sacred">
            ✝️ Santo Evangelio
          </span>
          <span className="text-xs font-bold text-slate-700">{liturgy.gospelRef}</span>
        </div>
        <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-scripture italic py-2">
          «{liturgy.gospelText}»
        </p>
        <span className="block text-right text-xs font-bold text-[#B8860B] mt-4">
          Palabra del Señor. Gloria a ti, Señor Jesús.
        </span>
      </div>

      {/* Reflexión Espiritual */}
      <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-[#B8860B]" />
          <h3 className="text-lg font-bold font-sacred text-slate-900">
            Meditación y Reflexión Pastoral
          </h3>
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {liturgy.reflection}
        </p>
      </div>

      {/* Oración del Día */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-amber-200 space-y-3">
        <h3 className="text-lg font-bold font-sacred text-amber-950">
          Oración del Día
        </h3>
        <p className="font-scripture text-base sm:text-lg text-amber-900 italic leading-relaxed">
          «{liturgy.prayer}»
        </p>
      </div>
    </div>
  );
};
