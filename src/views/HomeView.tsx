import React from 'react';
import { ViewType } from '../types';
import {
  Cross,
  Sparkles,
  Heart,
  Layers,
  Shield,
  BookOpen,
  MessageCircle,
  HelpCircle,
  Calendar,
  Church,
  ArrowRight,
  Volume2,
  Clock,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { getSaintForToday } from '../data/saintsData';
import { getTodayLiturgy } from '../data/liturgyData';
import { INITIAL_MASS_SCHEDULES, INITIAL_NEWS } from '../data/dioceseData';

interface HomeViewProps {
  onNavigate: (view: ViewType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const todaySaint = getSaintForToday();
  const todayLiturgy = getTodayLiturgy();

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION: Jesucristo, centro de nuestra fe */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A1128] via-[#0F1D40] to-[#16295A] text-white py-20 px-4 sm:px-6 lg:px-8 shadow-2xl border-b-4 border-[#D4AF37]">
        {/* Subtle decorative crosses and sacred background lighting */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest shadow-inner">
            <Cross className="w-3.5 h-3.5" />
            <span>Diócesis de Sonsonate • El Salvador</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sacred text-white leading-tight">
            «Jesucristo, centro de nuestra fe y nuestra esperanza»
          </h1>

          <p className="max-w-3xl mx-auto text-slate-200 text-base sm:text-lg font-light leading-relaxed">
            Plataforma oficial de evangelización, oración y comunión eclesial. Unidos en la verdad del Evangelio, la devoción a la Santísima Virgen de Candelaria y el amor a Jesús Nazareno.
          </p>

          {/* Quick Primary Actions */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-3">
            <button
              onClick={() => onNavigate('jesus')}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold text-sm shadow-lg hover:shadow-[#D4AF37]/30 hover:scale-105 transition flex items-center gap-2"
            >
              <Cross className="w-4 h-4 text-[#0A1128]" />
              <span>Conocer a Jesús</span>
            </button>
            <button
              onClick={() => onNavigate('gospel')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-sm transition flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#D4AF37]" />
              <span>Evangelio del Día</span>
            </button>
            <button
              onClick={() => onNavigate('rosary')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-sm transition flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-[#D4AF37]" />
              <span>Rezar el Rosario</span>
            </button>
            <button
              onClick={() => onNavigate('ai')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-sm transition flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Preguntar a la IA</span>
            </button>
            <button
              onClick={() => onNavigate('quiz')}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-sm transition flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Quiz Católico</span>
            </button>
          </div>
        </div>
      </section>

      {/* TODAY'S SPIRITUAL HIGHLIGHTS: Evangelio & Santo del Día */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card: Evangelio de Hoy */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 hover:border-[#D4AF37]/50 transition relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-bl-full -z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <BookOpen className="w-3.5 h-3.5" />
                  Liturgia Diaria
                </span>
                <span className="text-xs text-slate-500 font-medium">{todayLiturgy.date}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-sacred text-slate-900 mb-2">
                {todayLiturgy.gospelRef}
              </h3>
              <p className="text-xs font-medium text-[#B8860B] mb-4">«{todayLiturgy.liturgicalDay}»</p>
              <p className="text-sm text-slate-600 line-clamp-4 leading-relaxed font-scripture text-base italic mb-6">
                «{todayLiturgy.gospelText}»
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
              <button
                onClick={() => onNavigate('gospel')}
                className="text-[#B8860B] font-bold text-sm hover:text-[#785404] transition flex items-center gap-1.5"
              >
                <span>Leer completo y reflexión</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400">Actualizado litúrgicamente</span>
            </div>
          </div>

          {/* Card: Santo del Día */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 hover:border-[#D4AF37]/50 transition relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-full -z-0"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
                  Santo de Hoy
                </span>
                <span className="text-xs text-slate-500 font-medium">{todaySaint.feastDayDisplay}</span>
              </div>
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={todaySaint.image}
                  alt={todaySaint.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-md border-2 border-[#D4AF37]"
                />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-sacred text-slate-900">
                    {todaySaint.name}
                  </h3>
                  <p className="text-xs text-[#B8860B] font-medium mt-0.5">
                    {todaySaint.category} • {todaySaint.countryOfOrigin}
                  </p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                    Patrono de: {todaySaint.patronage}
                  </p>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-6">
                {todaySaint.biography}
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between relative z-10">
              <button
                onClick={() => onNavigate('saints')}
                className="text-[#B8860B] font-bold text-sm hover:text-[#785404] transition flex items-center gap-1.5"
              >
                <span>Conocer biografía y oración</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-400">Fiesta del santoral</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORE PILLARS OF FAITH: Jesús, Trinidad, María, Rosario, Advocaciones */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs uppercase font-bold tracking-widest text-[#B8860B] mb-2">
            Misterios de Salvación
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-sacred text-[#0A1128]">
            Pilares de Nuestra Fe Católica
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Formación doctrinal viva y devoción reverente para niños, jóvenes y adultos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Jesucristo */}
          <div
            onClick={() => onNavigate('jesus')}
            className="group cursor-pointer bg-white rounded-3xl p-6 shadow-lg border border-slate-200/80 hover:shadow-2xl hover:border-[#D4AF37] transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A1128] text-[#D4AF37] flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-md">
                <Cross className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-sacred text-slate-900 mb-2 group-hover:text-[#B8860B] transition">
                ✝️ Jesucristo Nuestro Salvador
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Vida pública, enseñanzas eternas, milagros portentosos, Pasión redentora, Santa Muerte y gloriosa Resurrección.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#B8860B]">
              <span>Explorar enseñanzas</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 2: Santísima Trinidad */}
          <div
            onClick={() => onNavigate('trinity')}
            className="group cursor-pointer bg-white rounded-3xl p-6 shadow-lg border border-slate-200/80 hover:shadow-2xl hover:border-[#D4AF37] transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A1128] text-[#D4AF37] flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-sacred text-slate-900 mb-2 group-hover:text-[#B8860B] transition">
                🕊️ La Santísima Trinidad
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Dios Padre creador, Dios Hijo redentor y Dios Espíritu Santo santificador: un solo Dios verdadero en tres Personas divinas.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#B8860B]">
              <span>Comprender el misterio</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 3: Virgen María */}
          <div
            onClick={() => onNavigate('mary')}
            className="group cursor-pointer bg-white rounded-3xl p-6 shadow-lg border border-slate-200/80 hover:shadow-2xl hover:border-[#D4AF37] transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A1128] text-[#D4AF37] flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-md">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-sacred text-slate-900 mb-2 group-hover:text-[#B8860B] transition">
                💙 Santísima Virgen María
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Madre de Dios y Madre nuestra, modelo supremo de fe, pureza y humildad evangélica al pie de la Cruz del Señor.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#B8860B]">
              <span>Contemplar a María</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 4: Santo Rosario Interactivo */}
          <div
            onClick={() => onNavigate('rosary')}
            className="group cursor-pointer bg-white rounded-3xl p-6 shadow-lg border border-slate-200/80 hover:shadow-2xl hover:border-[#D4AF37] transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A1128] text-[#D4AF37] flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-md">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-sacred text-slate-900 mb-2 group-hover:text-[#B8860B] transition">
                📿 El Santo Rosario Interactivo
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Reza paso a paso cuenta por cuenta con audio en voz alta, contemplando los misterios gozosos, dolorosos, gloriosos y luminosos.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#B8860B]">
              <span>Comenzar a rezar</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 5: Advocaciones Marianas */}
          <div
            onClick={() => onNavigate('advocations')}
            className="group cursor-pointer bg-white rounded-3xl p-6 shadow-lg border border-slate-200/80 hover:shadow-2xl hover:border-[#D4AF37] transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A1128] text-[#D4AF37] flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-md">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-sacred text-slate-900 mb-2 group-hover:text-[#B8860B] transition">
                👑 Advocaciones Marianas
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Nuestra Señora de Candelaria, Virgen de la Paz, Guadalupe, Fátima, Lourdes, Carmen y más con su historia veraz y oraciones.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#B8860B]">
              <span>Ver catálogo mariano</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>

          {/* Card 6: Asistente Católico con IA */}
          <div
            onClick={() => onNavigate('ai')}
            className="group cursor-pointer bg-white rounded-3xl p-6 shadow-lg border border-slate-200/80 hover:shadow-2xl hover:border-[#D4AF37] transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#0A1128] text-[#D4AF37] flex items-center justify-center mb-5 group-hover:scale-110 transition shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-sacred text-slate-900 mb-2 group-hover:text-[#B8860B] transition">
                🤖 Asistente Católico con IA
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Respuestas inmediatas guiadas por el Catecismo de la Iglesia Católica, las Sagradas Escrituras y la doctrina de la Iglesia.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#B8860B]">
              <span>Hacer una pregunta</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </div>
      </section>

      {/* DIOCESE OF SONSONATE SPOTLIGHT */}
      <section className="bg-gradient-to-r from-[#0A1128] to-[#16295A] text-white py-16 px-4 sm:px-6 lg:px-8 shadow-xl">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/30">
              Patrimonio Espiritual de Sonsonate
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-sacred leading-tight">
              Catedral de la Santísima Trinidad y Jesús Nazareno de Sonsonate
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              La Diócesis de Sonsonate, pastoreada por S.E. Mons. Constantino Barrera Morales, tiene su sede episcopal en la Catedral de la Santísima Trinidad de Sonsonate y honra a Nuestra Señora de Candelaria como su Excelsa Patrona diocesana. La devoción solemne a Jesús Nazareno y las procesiones de Semana Santa son baluarte inmemorial de nuestra fe.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold font-sacred text-[#D4AF37]">1986</div>
                <div className="text-xs text-slate-300 mt-1">Erección por San Juan Pablo II</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-2xl font-bold font-sacred text-[#D4AF37]">2 de Febrero</div>
                <div className="text-xs text-slate-300 mt-1">Fiesta de Ntra. Sra. de Candelaria</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('diocese')}
                className="px-5 py-2.5 rounded-xl bg-[#D4AF37] text-[#0A1128] font-bold text-xs uppercase tracking-wider hover:bg-[#E6CA65] transition"
              >
                Conocer la Diócesis
              </button>
              <button
                onClick={() => onNavigate('mass')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-wider border border-white/20 transition"
              >
                Ver Horarios de Misa
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/40 bg-black/40">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80"
                alt="Catedral de Sonsonate"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-sacred font-bold text-sm text-white">Catedral de la Santísima Trinidad</h4>
                <p className="text-xs text-slate-300 mt-1">Sede episcopal de Sonsonate</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/40 bg-black/40">
              <img
                src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80"
                alt="Jesús Nazareno de Sonsonate"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-sacred font-bold text-sm text-white">Jesús Nazareno</h4>
                <p className="text-xs text-slate-300 mt-1">Patrimonio Cultural Inmaterial</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MASS SCHEDULES & UPCOMING EVENTS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Col 1 & 2: Próximas Misas */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs uppercase font-bold text-[#B8860B] tracking-wider">
                  Liturgia Parroquial
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-sacred text-slate-900 mt-1">
                  ⏰ Próximas Misas en Parroquias
                </h3>
              </div>
              <button
                onClick={() => onNavigate('mass')}
                className="text-xs font-bold text-[#B8860B] hover:text-[#785404] transition flex items-center gap-1"
              >
                <span>Ver todas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {INITIAL_MASS_SCHEDULES.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-[#D4AF37]/50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{item.parish}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <div className="text-xs font-bold text-[#0A1128] bg-[#D4AF37]/20 px-2.5 py-1 rounded-md inline-block">
                      Dom: {item.sundays.split(',')[0]}...
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Semana: {item.weekdays.split(',')[0]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Próximos Eventos y Noticias */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase font-bold text-[#B8860B] tracking-wider">
                Vida Diocesana
              </span>
              <h3 className="text-xl font-bold font-sacred text-slate-900 mt-1 mb-6">
                📰 Noticias y Eventos
              </h3>
              <div className="space-y-4">
                {INITIAL_NEWS.slice(0, 2).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => onNavigate('news')}
                    className="cursor-pointer group pb-4 border-b border-slate-100 last:border-b-0"
                  >
                    <span className="text-[10px] font-bold text-[#B8860B] uppercase">
                      {n.category} • {n.date}
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 group-hover:text-[#B8860B] transition line-clamp-2 mt-0.5">
                      {n.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{n.summary}</p>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => onNavigate('news')}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-[#D4AF37]/20 text-slate-800 hover:text-[#785404] font-bold text-xs uppercase tracking-wider transition text-center"
            >
              Ver Boletín Diocesano
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
