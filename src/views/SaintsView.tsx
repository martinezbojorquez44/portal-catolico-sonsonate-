import React, { useState } from 'react';
import { Shield, Search, Volume2, Copy, Check, Calendar, Star, MapPin } from 'lucide-react';
import { SAINTS_DATA, getSaintForToday } from '../data/saintsData';
import { Saint } from '../types';
import { speechManager } from '../utils/speech';

export const SaintsView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedSaint, setSelectedSaint] = useState<Saint | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speaking, setSpeaking] = useState(false);

  const todaySaint = getSaintForToday();

  const categories = ['Todos', 'Apóstoles', 'Mártires', 'Doctores', 'Pastores', 'Místicos y Religiosos', 'Ángeles', 'Laicos'];

  const filteredSaints = SAINTS_DATA.filter((s) => {
    const matchesCategory = selectedCategory === 'Todos' || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.patronage.toLowerCase().includes(search.toLowerCase()) ||
      s.countryOfOrigin.toLowerCase().includes(search.toLowerCase()) ||
      s.biography.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <Shield className="w-3.5 h-3.5" />
          <span>Comunión de los Santos</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          😇 Santos de la Iglesia Católica
        </h1>
        <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          Nube de testigos que alcanzaron la gloria eterna siguiendo a Cristo. Intercesores ante el Trono de Dios y modelos de santidad y caridad evangélica.
        </p>
      </div>

      {/* Featured: Santo del Día */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#D4AF37]/60 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden">
        <div className="w-full lg:w-1/3 h-64 sm:h-80 rounded-2xl overflow-hidden shadow-lg border-2 border-[#D4AF37] shrink-0">
          <img
            src={todaySaint.image}
            alt={todaySaint.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-2/3 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-[#0A1128] text-xs font-bold uppercase tracking-wider">
              ⭐ Santo de Hoy: {todaySaint.feastDayDisplay}
            </span>
            <span className="text-xs text-slate-500 font-medium">{todaySaint.category} • {todaySaint.countryOfOrigin}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-sacred text-slate-900">
            {todaySaint.name}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#B8860B]">
            Patrono de: {todaySaint.patronage}
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            {todaySaint.biography}
          </p>
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 font-scripture text-base italic text-amber-950">
            «{todaySaint.prayer}»
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => handleSpeak(todaySaint.prayer)}
              className="px-4 py-2 rounded-xl bg-[#0A1128] text-[#D4AF37] hover:bg-[#16295A] text-xs font-bold transition flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>{speaking ? 'Detener voz' : 'Escuchar oración'}</span>
            </button>
            <button
              onClick={() => handleCopyPrayer(todaySaint.prayer, todaySaint.id)}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
            >
              {copiedId === todaySaint.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copiedId === todaySaint.id ? 'Oración copiada' : 'Copiar oración'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, patronazgo o virtud..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-[#0A1128] text-[#D4AF37]'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Saints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredSaints.map((saint) => (
          <div
            key={saint.id}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:border-[#D4AF37] transition flex flex-col justify-between"
          >
            <div>
              <div className="relative h-44 bg-slate-900 overflow-hidden">
                <img
                  src={saint.image}
                  alt={saint.name}
                  className="w-full h-full object-cover transition duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded">
                    {saint.feastDayDisplay}
                  </span>
                  <h3 className="text-lg font-bold font-sacred text-white mt-0.5">
                    {saint.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{saint.category}</span>
                  <span>•</span>
                  <span>{saint.century}</span>
                </div>
                <p className="text-xs text-[#B8860B] font-medium line-clamp-1">
                  Patrono de: {saint.patronage}
                </p>
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {saint.biography}
                </p>

                {/* Virtues Tags */}
                <div className="flex flex-wrap gap-1 pt-2">
                  {saint.virtues.slice(0, 2).map((v) => (
                    <span
                      key={v}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-4">
              <button
                onClick={() => setSelectedSaint(saint)}
                className="text-xs font-bold text-[#B8860B] hover:text-[#785404] transition"
              >
                Ver biografía completa
              </button>
              <button
                onClick={() => handleCopyPrayer(saint.prayer, saint.id)}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                title="Copiar oración"
              >
                {copiedId === saint.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Saint Modal */}
      {selectedSaint && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 relative">
            <button
              onClick={() => {
                setSelectedSaint(null);
                speechManager.stop();
                setSpeaking(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold"
            >
              ✕
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Fiesta: {selectedSaint.feastDayDisplay}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-sacred text-slate-900 mt-2 mb-1">
              {selectedSaint.name}
            </h2>
            <p className="text-xs text-slate-500 mb-4">{selectedSaint.category} • {selectedSaint.countryOfOrigin} ({selectedSaint.century})</p>

            <div className="space-y-6 text-sm text-slate-700 leading-relaxed">
              <div>
                <h4 className="font-bold text-slate-900 font-sacred text-base mb-1">Vida y Testimonio:</h4>
                <p>{selectedSaint.biography}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 font-sacred text-base mb-2">Virtudes Heroicas:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSaint.virtues.map((v) => (
                    <span key={v} className="px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                      ✓ {v}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-amber-950 font-sacred text-base">Oración de Intercesión:</h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpeak(selectedSaint.prayer)}
                      className="px-2.5 py-1 rounded bg-white border border-amber-300 text-xs font-medium text-amber-900 hover:bg-amber-100 flex items-center gap-1"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{speaking ? 'Detener' : 'Escuchar'}</span>
                    </button>
                    <button
                      onClick={() => handleCopyPrayer(selectedSaint.prayer, selectedSaint.id)}
                      className="px-2.5 py-1 rounded bg-white border border-amber-300 text-xs font-medium text-amber-900 hover:bg-amber-100 flex items-center gap-1"
                    >
                      {copiedId === selectedSaint.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedId === selectedSaint.id ? 'Copiada' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
                <p className="font-scripture text-base sm:text-lg italic text-amber-950 leading-relaxed">
                  «{selectedSaint.prayer}»
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
