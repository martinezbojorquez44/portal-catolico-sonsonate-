import React from 'react';
import { Heart, Crown, Sparkles, BookOpen, Star } from 'lucide-react';

export const MaryView: React.FC = () => {
  const marianVirtues = [
    { name: 'Humildad profunda', desc: '«He aquí la esclava del Señor; hágase en mí según tu palabra» (Lc 1, 38).' },
    { name: 'Fe viva y obediencia', desc: 'Creyó sin vacilar la palabra de Dios y concibió a Cristo primero en su corazón antes que en su seno.' },
    { name: 'Caridad ardiente', desc: 'Partió presurosa a la montaña de Judea para servir a su anciana prima Santa Isabel.' },
    { name: 'Pureza virginal', desc: 'Inmaculada, preservada de toda mancha de pecado, sagrario vivo del Altísimo.' },
    { name: 'Fortaleza al pie de la Cruz', desc: 'Estuvo de pie ("Stabat Mater") uniendo su dolor de madre al sacrificio de su Hijo Redentor.' },
    { name: 'Oración constante', desc: 'Perseveraba en oración con los apóstoles en el Cenáculo a la espera del Espíritu Santo.' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Crown className="w-3.5 h-3.5" />
          <span>Madre de Dios y Madre Nuestra</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          💙 La Santísima Virgen María
        </h1>
        <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          «Proclama mi alma la grandeza del Señor, se alegra mi espíritu en Dios mi Salvador, porque ha mirado la humillación de su esclava; desde ahora me felicitarán todas las generaciones» (Lc 1, 46-48).
        </p>
      </div>

      {/* Dogmas y Misterios de la Virgen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
          <span className="text-[11px] font-bold uppercase text-[#B8860B]">Primer Dogma</span>
          <h3 className="text-lg font-bold font-sacred text-slate-900 mt-1 mb-2">Maternidad Divina</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Concilio de Éfeso (431): María es verdaderamente Theotokos (Madre de Dios), pues concibió según la carne al Verbo eterno de Dios.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
          <span className="text-[11px] font-bold uppercase text-[#B8860B]">Segundo Dogma</span>
          <h3 className="text-lg font-bold font-sacred text-slate-900 mt-1 mb-2">Perpetua Virginidad</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            María fue virgen antes del parto, en el parto y perpetuamente después del parto por obra del Espíritu Santo.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
          <span className="text-[11px] font-bold uppercase text-[#B8860B]">Tercer Dogma</span>
          <h3 className="text-lg font-bold font-sacred text-slate-900 mt-1 mb-2">Inmaculada Concepción</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Beato Pío IX (1854): Preservada inmune de toda mancha de pecado original desde el primer instante de su concepción.
          </p>
        </div>
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-200">
          <span className="text-[11px] font-bold uppercase text-[#B8860B]">Cuarto Dogma</span>
          <h3 className="text-lg font-bold font-sacred text-slate-900 mt-1 mb-2">La Gloriosa Asunción</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Venerable Pío XII (1950): Cumplido el curso de su vida terrena, fue asunta en cuerpo y alma a la gloria celestial.
          </p>
        </div>
      </div>

      {/* Virtudes Marianas */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-bold font-sacred text-slate-900">
            Virtudes Heroicas de la Virgen María
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Modelo perfecto para la vida de todo cristiano en la Diócesis de Sonsonate.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {marianVirtues.map((v) => (
            <div key={v.name} className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200/70">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                <h4 className="font-bold font-sacred text-slate-900 text-sm">{v.name}</h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* El Magníficat */}
      <div className="bg-gradient-to-r from-[#0A1128] to-[#1E293B] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-[#D4AF37]/30">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-widest">
            Cántico de la Santísima Virgen (Lucas 1, 46-55)
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-sacred text-white">
            El Magníficat
          </h3>
          <p className="font-scripture text-base sm:text-lg italic leading-relaxed text-slate-200">
            «Proclama mi alma la grandeza del Señor, se alegra mi espíritu en Dios mi Salvador; porque ha mirado la humillación de su esclava. Desde ahora me felicitarán todas las generaciones, porque el Poderoso ha hecho obras grandes por mí: su nombre es santo y su misericordia llega a sus fieles de generación en generación. Desplegó el gran poder de su brazo: dispersó a los soberbios de corazón, derribó del trono a los poderosos y enalteció a los humildes. A los hambrientos colmó de bienes y a los ricos despidió vacíos. Auxilió a Israel, su siervo, acordándose de su misericordia, como lo había prometido a nuestros padres, en favor de Abrahán y su descendencia por siempre.»
          </p>
        </div>
      </div>
    </div>
  );
};
