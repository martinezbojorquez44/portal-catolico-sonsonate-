import React, { useState, useEffect } from 'react';
import { Layers, Play, RotateCcw, Volume2, VolumeX, ChevronRight, ChevronLeft, Sparkles, CheckCircle2, Music } from 'lucide-react';
import { ROSARY_MYSTERIES, CATHOLIC_PRAYERS } from '../data/faithData';
import { speechManager } from '../utils/speech';

export const RosaryView: React.FC = () => {
  // Determine today's mystery type based on day of week
  const getTodayMysteryKey = (): 'gozosos' | 'luminosos' | 'dolorosos' | 'gloriosos' => {
    const day = new Date().getDay(); // 0 Sun, 1 Mon, 2 Tue, 3 Wed, 4 Thu, 5 Fri, 6 Sat
    if (day === 1 || day === 6) return 'gozosos';
    if (day === 2 || day === 5) return 'dolorosos';
    if (day === 4) return 'luminosos';
    return 'gloriosos';
  };

  const [activeMysteryKey, setActiveMysteryKey] = useState<'gozosos' | 'luminosos' | 'dolorosos' | 'gloriosos'>(getTodayMysteryKey());
  const [isPraying, setIsPraying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [chimeEnabled, setChimeEnabled] = useState(true);

  const mysteryData = ROSARY_MYSTERIES[activeMysteryKey];

  // Build the complete bead sequence for the selected mystery
  const steps = [
    { title: 'Señal de la Cruz', text: 'Por la señal de la Santa Cruz, de nuestros enemigos líbranos Señor, Dios nuestro. En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén.', type: 'intro' },
    { title: 'Acto de Contrición', text: 'Señor mío Jesucristo, Dios y Hombre verdadero, Creador, Padre y Redentor mío; por ser Vos quien sois, Bondad infinita, y porque os amo sobre todas las cosas, me pesa de todo corazón haberos ofendido... propongo firmemente nunca más pecar. Amén.', type: 'intro' },
    { title: 'Credo de los Apóstoles', text: 'Creo en Dios, Padre Todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, Nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de Santa María Virgen... Amén.', type: 'creed' },
    { title: 'Padre Nuestro (Por las intenciones del Santo Padre)', text: 'Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo. Danos hoy nuestro pan de cada día; perdona nuestras ofensas... Amén.', type: 'ourfather' },
    { title: '1ª Ave María (Aumento de la Fe)', text: 'Dios te salve, María, llena eres de gracia; el Señor es contigo; bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.', type: 'hailmary' },
    { title: '2ª Ave María (Aumento de la Esperanza)', text: 'Dios te salve, María, llena eres de gracia; el Señor es contigo; bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores... Amén.', type: 'hailmary' },
    { title: '3ª Ave María (Aumento de la Caridad)', text: 'Dios te salve, María, llena eres de gracia; el Señor es contigo; bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores... Amén.', type: 'hailmary' },
    { title: 'Gloria al Padre', text: 'Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.', type: 'glory' },
    
    // 5 Decades
    ...mysteryData.mysteries.flatMap((m, mIdx) => [
      {
        title: `Misterio ${m.num}: ${m.title}`,
        text: `Contemplemos en este misterio: ${m.title}. Fruto del misterio: ${m.fruit}. Cita bíblica: ${m.scripture}. Meditemos en el amor infinito de Cristo y de su Santísima Madre por la salvación de nuestras almas.`,
        type: 'mystery_intro'
      },
      { title: `Padre Nuestro (${mIdx + 1}º Misterio)`, text: 'Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad... Amén.', type: 'ourfather' },
      ...Array.from({ length: 10 }, (_, bIdx) => ({
        title: `Ave María (${bIdx + 1}/10)`,
        text: 'Dios te salve, María, llena eres de gracia; el Señor es contigo; bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús. Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.',
        type: 'hailmary_decade'
      })),
      { title: 'Gloria al Padre', text: 'Gloria al Padre, y al Hijo, y al Espíritu Santo. Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.', type: 'glory' },
      { title: 'Oración de Fátima', text: 'Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno, lleva al cielo a todas las almas, especialmente a las más necesitadas de tu misericordia.', type: 'fatima' }
    ]),

    // Closing
    { title: 'La Salve (Dios te salve, Reina y Madre)', text: 'Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti llamamos los desterrados hijos de Eva... ¡Oh clementísima, oh piadosa, oh dulce Virgen María! Ruega por nosotros, Santa Madre de Dios, para que seamos dignos de alcanzar las promesas de Nuestro Señor Jesucristo. Amén.', type: 'salve' },
    { title: 'Oración Final', text: 'Te rogamos nos concedas, Señor Dios nuestro, gozar de continua salud de alma y cuerpo, y por la gloriosa intercesión de la bienaventurada siempre Virgen María, vernos libres de las tristezas presentes y disfrutar de las alegrías eternas. Por Cristo nuestro Señor. Amén.', type: 'end' }
  ];

  const currentStep = steps[currentStepIndex];

  // Meditative subtle chime sound using Web Audio API
  const playSacredBell = () => {
    if (!chimeEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, audioCtx.currentTime); // 528 Hz sacred peaceful tone
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.8);
    } catch (e) {
      // AudioContext unavailable in silent policy
    }
  };

  useEffect(() => {
    if (isPraying && audioEnabled) {
      speechManager.speak(`${currentStep.title}. ${currentStep.text}`);
    }
  }, [currentStepIndex, isPraying, audioEnabled]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      playSacredBell();
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      speechManager.stop();
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleStart = () => {
    setIsPraying(true);
    setCurrentStepIndex(0);
    playSacredBell();
  };

  const handleReset = () => {
    speechManager.stop();
    setIsPraying(false);
    setCurrentStepIndex(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Layers className="w-3.5 h-3.5" />
          <span>Cadena que nos une al Cielo</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          📿 El Santo Rosario Interactivo
        </h1>
        <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          «El Rosario es mi oración predilecta. Una oración maravillosa en su sencillez y en su profundidad» — San Juan Pablo II.
          Reza paso a paso con meditación de los misterios, contador y voz en alta.
        </p>

        {/* Mystery Selection Tabs */}
        <div className="mt-8 flex flex-wrap justify-center items-center gap-2">
          {(['gozosos', 'luminosos', 'dolorosos', 'gloriosos'] as const).map((key) => {
            const m = ROSARY_MYSTERIES[key];
            const active = activeMysteryKey === key;
            return (
              <button
                key={key}
                onClick={() => {
                  setActiveMysteryKey(key);
                  handleReset();
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#D4AF37] text-[#0A1128] shadow-md font-extrabold'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <span>{m.name}</span>
                <span className="text-[10px] opacity-80">({m.days.split(' ')[0]})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Rosary Area */}
      {!isPraying ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 text-center space-y-8">
          <div className="w-20 h-20 rounded-full bg-[#0A1128] text-[#D4AF37] flex items-center justify-center mx-auto shadow-xl border-2 border-[#D4AF37]">
            <Layers className="w-10 h-10" />
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-sacred text-slate-900">
              {mysteryData.name}
            </h2>
            <p className="text-xs font-semibold text-[#B8860B] uppercase tracking-wider">
              Días recomendados: {mysteryData.days}
            </p>
            <p className="text-sm text-slate-600 leading-relaxed pt-2">
              Te acompañaremos cuenta por cuenta en la oración de las cinco decenas, con lectura en voz alta opcional y las meditaciones bíblicas.
            </p>
          </div>

          {/* List of 5 Mysteries for preview */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 max-w-4xl mx-auto text-left">
            {mysteryData.mysteries.map((m) => (
              <div key={m.num} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <span className="font-bold text-[#B8860B] block">{m.num}º Misterio</span>
                <span className="font-semibold text-slate-900 block mt-0.5">{m.title}</span>
                <span className="text-[10px] text-slate-500 mt-1 block italic">{m.scripture}</span>
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold text-base shadow-xl hover:scale-105 transition flex items-center justify-center gap-3"
            >
              <Play className="w-5 h-5 fill-[#0A1128]" />
              <span>Comenzar a Rezar</span>
            </button>
          </div>
        </div>
      ) : (
        /* ACTIVE STEP-BY-STEP ROSARY PRAYER COMPONENT */
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/50 space-y-6">
          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-2">
              <span className="text-[#B8860B] font-bold">
                Paso {currentStepIndex + 1} de {steps.length}
              </span>
              <span>{Math.round(((currentStepIndex + 1) / steps.length) * 100)}% Completado</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8860B] h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const nextAudio = !audioEnabled;
                  setAudioEnabled(nextAudio);
                  if (!nextAudio) speechManager.stop();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                  audioEnabled ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {audioEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{audioEnabled ? 'Voz activada' : 'Voz silenciada'}</span>
              </button>

              <button
                onClick={() => setChimeEnabled(!chimeEnabled)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
                  chimeEnabled ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' : 'bg-slate-100 text-slate-500'
                }`}
                title="Campana meditativa"
              >
                <Music className="w-4 h-4" />
                <span className="hidden sm:inline">Campana sagrada</span>
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-slate-500 hover:text-rose-600 transition flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>

          {/* Active Prayer Card */}
          <div className="py-6 px-4 sm:px-8 bg-amber-50/40 rounded-3xl border border-amber-200/60 text-center space-y-4 min-h-[220px] flex flex-col justify-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0A1128] text-[#D4AF37] text-xs font-sacred font-bold">
              {currentStep.title}
            </span>
            <p className="font-scripture text-lg sm:text-2xl text-slate-800 italic leading-relaxed max-w-2xl mx-auto">
              «{currentStep.text}»
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className={`px-5 py-3 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                  : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {currentStepIndex < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold text-xs sm:text-sm shadow-lg hover:scale-105 transition flex items-center gap-2"
              >
                <span>Siguiente Cuenta</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-lg transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Rosario Concluido (Amén)</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Litany and Guide Reference */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
        <h3 className="text-xl font-bold font-sacred text-slate-900 mb-4">
          Guía de Rezo de los Misterios
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-[#B8860B] block">Gozosos (Lunes y Sábado)</span>
            <p className="text-slate-600 mt-1">Encarnación y vida oculta de Jesús en Nazaret.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-[#B8860B] block">Luminosos (Jueves)</span>
            <p className="text-slate-600 mt-1">Vida pública, milagros y Eucaristía.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-[#B8860B] block">Dolorosos (Martes y Viernes)</span>
            <p className="text-slate-600 mt-1">Pasión y muerte salvadora en la Cruz.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-[#B8860B] block">Gloriosos (Miércoles y Domingo)</span>
            <p className="text-slate-600 mt-1">Resurrección, Ascensión y gloria celestial.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
