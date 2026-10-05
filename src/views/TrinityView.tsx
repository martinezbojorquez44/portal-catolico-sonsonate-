import React, { useState } from 'react';
import { Sparkles, Cross, Shield, BookOpen, Volume2 } from 'lucide-react';
import { TRINITY_INFO } from '../data/faithData';
import { speechManager } from '../utils/speech';

export const TrinityView: React.FC = () => {
  const [speaking, setSpeaking] = useState(false);

  const handleToggleSpeak = () => {
    if (speaking) {
      speechManager.stop();
      setSpeaking(false);
    } else {
      const fullText = `${TRINITY_INFO.title}. ${TRINITY_INFO.dogma}. Dios Padre: Creador. Dios Hijo: Salvador y Redentor. Dios Espíritu Santo: Santificador y Paráclito. Tres personas en un solo Dios verdadero.`;
      speechManager.speak(fullText, () => setSpeaking(false));
      setSpeaking(true);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#101F42] to-[#1C2D5A] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Misterio Central de la Fe</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          🕊️ La Santísima Trinidad
        </h1>
        <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          {TRINITY_INFO.dogma}
        </p>
        <button
          onClick={handleToggleSpeak}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition"
        >
          <Volume2 className="w-4 h-4 text-[#D4AF37]" />
          <span>{speaking ? 'Detener lectura en voz alta' : 'Escuchar explicación'}</span>
        </button>
      </div>

      {/* The Three Divine Persons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TRINITY_INFO.persons.map((person, index) => (
          <div
            key={person.name}
            className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200/80 hover:border-[#D4AF37] transition flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A1128] text-[#D4AF37] flex items-center justify-center font-sacred font-bold text-lg mb-6 shadow-md">
                {index === 0 ? '👑' : index === 1 ? '✝️' : '🕊️'}
              </div>
              <span className="text-xs uppercase font-bold text-[#B8860B] tracking-wider">
                {person.role}
              </span>
              <h3 className="text-xl font-bold font-sacred text-slate-900 mt-1 mb-3">
                {person.name}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {person.description}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 font-scripture text-sm text-slate-800 italic">
              «{person.quote}»
            </div>
          </div>
        ))}
      </div>

      {/* Biblical Roots & Theological Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-[#B8860B]" />
            <h3 className="text-xl font-bold font-sacred text-slate-900">
              La Trinidad en la Santa Biblia
            </h3>
          </div>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              <strong>El Bautismo del Señor (Mt 3, 16-17):</strong> El Padre habla desde los cielos diciendo «Este es mi Hijo amado», el Hijo está en las aguas del Jordán, y el Espíritu Santo desciende en forma de paloma.
            </p>
            <p>
              <strong>El Mandato Misionero (Mt 28, 19):</strong> «Id y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo».
            </p>
            <p>
              <strong>La Bendición Apostólica (2 Cor 13, 13):</strong> «La gracia de nuestro Señor Jesucristo, el amor del Padre y la comunión del Espíritu Santo estén siempre con todos vosotros».
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <Cross className="w-6 h-6 text-[#B8860B]" />
            <h3 className="text-xl font-bold font-sacred text-slate-900">
              La Señal de la Cruz en la Vida Diaria
            </h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            Cada vez que nos persignamos y santiguamos, profesamos los dos misterios fundamentales de la fe católica: la Unidad y Trinidad de Dios, y la Encarnación y Muerte redentora de Jesucristo en la Cruz.
          </p>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 leading-relaxed">
            {TRINITY_INFO.signOfCross}
          </div>
          <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-scripture text-base italic text-amber-900">
            «{TRINITY_INFO.prayer}»
          </div>
        </div>
      </div>
    </div>
  );
};
