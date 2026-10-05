import React, { useState } from 'react';
import { Crown, Search, Volume2, Heart, Copy, Check, Sparkles, MapPin, Calendar } from 'lucide-react';
import { ADVOCATIONS_DATA } from '../data/advocationsData';
import { MarianAdvocation } from '../types';
import { speechManager } from '../utils/speech';

export const AdvocationsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedAdvocation, setSelectedAdvocation] = useState<MarianAdvocation | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const filteredAdvocations = ADVOCATIONS_DATA.filter(
    (a) =>
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.country.toLowerCase().includes(search.toLowerCase()) ||
      a.significance.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyPrayer = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSpeak = (text: string) => {
    if (speaking) {
      speechManager.stop();
      setSpeaking(false);
    } else {
      speechManager.speak(text, () => setSpeaking(false));
      setSpeaking(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Crown className="w-3.5 h-3.5" />
          <span>Madre de Todos los Pueblos</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          👑 Advocaciones Marianas
        </h1>
        <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          La Santísima Virgen María se manifiesta con amor de Madre en los diversos tiempos y naciones.
          Conoce la historia, significado, fiesta y oraciones autorizadas de cada advocación.
        </p>

        {/* Search */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por advocación, país o fiesta..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 text-white placeholder-slate-400 border border-white/20 focus:outline-none focus:border-[#D4AF37] text-sm backdrop-blur-md"
          />
        </div>
      </div>

      {/* Grid of Advocations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredAdvocations.map((adv) => (
          <div
            key={adv.id}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:border-[#D4AF37] transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={adv.image}
                  alt={adv.name}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    {adv.feastDay}
                  </span>
                  <h3 className="text-lg font-bold font-sacred text-white mt-1 drop-shadow-md">
                    {adv.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>{adv.country}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {adv.history}
                </p>
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 font-medium">
                  <strong>Significado:</strong> {adv.significance}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
              <button
                onClick={() => setSelectedAdvocation(adv)}
                className="text-xs font-bold text-[#B8860B] hover:text-[#785404] transition flex items-center gap-1"
              >
                <span>Ver Historia y Oración</span>
              </button>
              <button
                onClick={() => handleCopyPrayer(adv.prayer, adv.id)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                title="Copiar oración"
              >
                {copiedId === adv.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedAdvocation && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 relative">
            <button
              onClick={() => {
                setSelectedAdvocation(null);
                speechManager.stop();
                setSpeaking(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {selectedAdvocation.feastDay}
              </span>
              <span className="text-xs text-slate-500">{selectedAdvocation.country}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-sacred text-slate-900 mb-4">
              {selectedAdvocation.name}
            </h2>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 font-sacred text-base mb-1">Historia Veraz:</h4>
                <p>{selectedAdvocation.history}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 font-sacred text-base mb-1">Significado y Devoción:</h4>
                <p>{selectedAdvocation.significance}</p>
                <p className="mt-2 text-xs text-slate-500 italic">{selectedAdvocation.devotion}</p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-amber-950 font-sacred text-base">Oración Propia:</h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeak(selectedAdvocation.prayer)}
                      className="px-2.5 py-1 rounded bg-white border border-amber-300 text-xs font-medium text-amber-900 hover:bg-amber-100 flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{speaking ? 'Detener' : 'Escuchar'}</span>
                    </button>
                    <button
                      onClick={() => handleCopyPrayer(selectedAdvocation.prayer, selectedAdvocation.id)}
                      className="px-2.5 py-1 rounded bg-white border border-amber-300 text-xs font-medium text-amber-900 hover:bg-amber-100 flex items-center gap-1"
                    >
                      {copiedId === selectedAdvocation.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === selectedAdvocation.id ? 'Copiada' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
                <p className="font-scripture text-base sm:text-lg italic text-amber-950 leading-relaxed">
                  «{selectedAdvocation.prayer}»
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
