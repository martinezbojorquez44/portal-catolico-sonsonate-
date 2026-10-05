import React, { useState } from 'react';
import { Sparkles, Droplets, Flame, Wine, HeartHandshake, ShieldPlus, Heart, BookOpen, Check } from 'lucide-react';
import { SACRAMENTS_DATA } from '../data/faithData';

export const SacramentsView: React.FC = () => {
  const [selectedSacramentId, setSelectedSacramentId] = useState<string>(SACRAMENTS_DATA[0].id);

  const activeSacrament = SACRAMENTS_DATA.find((s) => s.id === selectedSacramentId) || SACRAMENTS_DATA[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'bautismo': return <Droplets className="w-5 h-5 text-sky-500" />;
      case 'confirmacion': return <Flame className="w-5 h-5 text-amber-500" />;
      case 'eucaristia': return <Wine className="w-5 h-5 text-red-500" />;
      case 'reconciliacion': return <HeartHandshake className="w-5 h-5 text-emerald-500" />;
      case 'uncion-enfermos': return <ShieldPlus className="w-5 h-5 text-purple-500" />;
      case 'orden-sacerdotal': return <Sparkles className="w-5 h-5 text-[#D4AF37]" />;
      case 'matrimonio': return <Heart className="w-5 h-5 text-rose-500" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Canales de la Gracia Divina</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          ✨ Los Siete Sacramentos de la Iglesia
        </h1>
        <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          Signos eficaces de la gracia divina instituidos por Jesucristo y confiados a la Santa Iglesia Católica, por los cuales nos es dispensada la vida divina.
        </p>
      </div>

      {/* Sacrament Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center">
        {SACRAMENTS_DATA.map((sac) => {
          const active = sac.id === selectedSacramentId;
          return (
            <button
              key={sac.id}
              onClick={() => setSelectedSacramentId(sac.id)}
              className={`px-4 py-3 rounded-2xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 border ${
                active
                  ? 'bg-[#0A1128] text-[#D4AF37] border-[#D4AF37] shadow-lg'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {getIcon(sac.id)}
              <span>{sac.name.replace('El ', '').replace('La ', '')}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Sacrament Detailed Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/40 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
              {getIcon(activeSacrament.id)}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">
                {activeSacrament.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-sacred text-slate-900">
                {activeSacrament.name}
              </h2>
            </div>
          </div>
        </div>

        {/* Definition */}
        <div className="space-y-2">
          <h3 className="text-base font-bold font-sacred text-slate-900">¿Qué es e importancia?:</h3>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {activeSacrament.definition}
          </p>
        </div>

        {/* Grid of Matter/Form and Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h4 className="font-bold font-sacred text-slate-900 text-sm">Materia y Forma Sagrada:</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {activeSacrament.matterForm}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
            <h4 className="font-bold font-sacred text-amber-950 text-sm">Efectos y Frutos Espirituales:</h4>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              {activeSacrament.effects}
            </p>
          </div>
        </div>

        {/* Requirements */}
        <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#D4AF37]" />
            <h4 className="font-bold font-sacred text-sm text-[#D4AF37]">
              Preparación y Requisitos en la Diócesis de Sonsonate:
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeSacrament.requirements}
          </p>
          <p className="text-[11px] text-slate-400 italic">
            * Consulta en el despacho de tu parroquia local (Catedral de Sonsonate, San Antonio del Monte, Izalco, Nahuizalco, etc.) para fechas de catequesis e inscripciones.
          </p>
        </div>
      </div>
    </div>
  );
};
