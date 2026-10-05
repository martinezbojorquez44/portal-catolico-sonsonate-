import React, { useState, useEffect } from 'react';
import { Crown, BookOpen, Quote, Shield, Heart, Sparkles, ExternalLink, Calendar, FileText } from 'lucide-react';
import { POPE_SECTION_DATA } from '../data/dioceseData';

export const PopeView: React.FC = () => {
  const [popeNotes, setPopeNotes] = useState<string>('');

  useEffect(() => {
    fetch('/api/diocese-status')
      .then((res) => res.json())
      .then((data) => {
        if (data?.popeNotes) {
          setPopeNotes(data.popeNotes);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Crown className="w-3.5 h-3.5" />
          <span>Sede Apostólica de Pedro</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-2">
          🇻🇦 {POPE_SECTION_DATA.title}
        </h1>
        <p className="text-[#D4AF37] font-semibold text-sm sm:text-base">
          {POPE_SECTION_DATA.subtitle}
        </p>
        <p className="max-w-2xl mx-auto text-slate-200 text-xs sm:text-sm font-light leading-relaxed mt-4">
          La Santa Sede en comunión fraterna con la Diócesis de Sonsonate y con todas las iglesias particulares del mundo entero.
        </p>
      </div>

      {/* Main Pontifical Overview */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <Shield className="w-6 h-6 text-[#B8860B]" />
          <div>
            <h2 className="text-xl font-bold font-sacred text-slate-900">
              Ministerio Petrino y Sucesión Apostólica
            </h2>
            <p className="text-xs text-slate-500">Conforme al Magisterio oficial de la Iglesia Católica</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-700 leading-relaxed">
          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 font-sacred text-sm mb-1">Misión del Sumo Pontífice:</h4>
              <p className="text-xs sm:text-sm">{POPE_SECTION_DATA.biography}</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 font-sacred text-sm mb-1">Elección e Inicio de Ministerio:</h4>
              <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 italic">
                {POPE_SECTION_DATA.election}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-slate-900 font-sacred text-sm mb-1">Ejes del Magisterio:</h4>
              <p className="text-xs sm:text-sm">{POPE_SECTION_DATA.teachings}</p>
            </div>
            {popeNotes && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 text-xs">
                <strong>Actualizaciones de la Santa Sede:</strong> {popeNotes}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Official Teachings & Documents */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-sacred text-slate-900">
          Enseñanzas y Documentos Pontificios
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {POPE_SECTION_DATA.officialDocuments.map((doc, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#B8860B] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  {doc.category}
                </span>
                <h4 className="font-bold font-sacred text-slate-900 text-base mt-2 mb-2 leading-snug">
                  {doc.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {doc.summary}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-[11px] text-slate-400">
                Magisterio Universal de la Iglesia
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Oración por el Santo Padre */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 shadow-xl border border-amber-200 text-center space-y-4">
        <Crown className="w-10 h-10 text-[#D4AF37] mx-auto" />
        <h3 className="text-2xl font-bold font-sacred text-amber-950">
          Oración por el Papa
        </h3>
        <p className="max-w-2xl mx-auto font-scripture text-base sm:text-lg italic text-amber-900 leading-relaxed">
          «{POPE_SECTION_DATA.prayerForPope}»
        </p>
        <span className="text-xs font-bold text-[#B8860B] block">
          Oremos en comunión con la Diócesis de Sonsonate y la Iglesia universal.
        </span>
      </div>
    </div>
  );
};
