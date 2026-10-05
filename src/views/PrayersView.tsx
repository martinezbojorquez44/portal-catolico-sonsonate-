import React, { useState } from 'react';
import { HeartHandshake, Volume2, Copy, Check, Search, Sparkles } from 'lucide-react';
import { CATHOLIC_PRAYERS } from '../data/faithData';
import { speechManager } from '../utils/speech';

export const PrayersView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  const categories = ['Todas', 'Fundamentales', 'Marianas', 'A Jesús', 'Penitenciales'];

  const filteredPrayers = CATHOLIC_PRAYERS.filter((p) => {
    const matchesCategory = selectedCategory === 'Todas' || p.category === selectedCategory;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.text.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (text: string, id: string) => {
    if (speakingId === id) {
      speechManager.stop();
      setSpeakingId(null);
    } else {
      speechManager.speak(text, () => setSpeakingId(null));
      setSpeakingId(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Elevación del Alma a Dios</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          🙏 Oraciones Católicas Tradicionales
        </h1>
        <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          «La oración es un impulso del corazón, una simple mirada lanzada hacia el cielo, un grito de gratitud y de amor» — Santa Teresa de Lisieux.
        </p>

        {/* Search */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por oración o necesidad..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 text-white placeholder-slate-400 border border-white/20 focus:outline-none focus:border-[#D4AF37] text-sm backdrop-blur-md"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar justify-center">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedCategory === c
                ? 'bg-[#0A1128] text-[#D4AF37] shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Prayers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPrayers.map((prayer) => (
          <div
            key={prayer.id}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 hover:border-[#D4AF37] transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  {prayer.category}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpeak(prayer.text, prayer.id)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="Escuchar oración"
                  >
                    <Volume2 className={`w-4 h-4 ${speakingId === prayer.id ? 'text-rose-600 animate-pulse' : ''}`} />
                  </button>
                  <button
                    onClick={() => handleCopy(prayer.text, prayer.id)}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                    title="Copiar texto"
                  >
                    {copiedId === prayer.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold font-sacred text-slate-900 mb-4">
                {prayer.title}
              </h3>

              <p className="font-scripture text-base sm:text-lg text-slate-800 italic leading-relaxed whitespace-pre-line">
                «{prayer.text}»
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-right">
              <span className="text-[11px] text-slate-400">Diócesis de Sonsonate</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
