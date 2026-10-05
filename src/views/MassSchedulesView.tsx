import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Phone, Search, Church } from 'lucide-react';
import { INITIAL_MASS_SCHEDULES } from '../data/dioceseData';
import { MassSchedule } from '../types';

export const MassSchedulesView: React.FC = () => {
  const [search, setSearch] = useState('');

  const filtered = INITIAL_MASS_SCHEDULES.filter(
    (m) =>
      m.parish.toLowerCase().includes(search.toLowerCase()) ||
      m.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Calendar className="w-3.5 h-3.5" />
          <span>Banquete Celestial</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          ⛪ Horarios de la Santa Misa
        </h1>
        <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          «La Santa Misa es la obra más santa y más augusta de la religión católica; en ella el mismo Cristo se ofrece a su Padre por nuestra salvación».
        </p>

        {/* Search */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por parroquia o municipio (Sonsonate, Izalco...)"
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white/10 text-white placeholder-slate-400 border border-white/20 focus:outline-none focus:border-[#D4AF37] text-sm backdrop-blur-md"
          />
        </div>
      </div>

      {/* Grid of Schedules */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 hover:border-[#D4AF37] transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-sacred text-slate-900">
                    {item.parish}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B8860B]" />
                    <span>{item.location}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#B8860B] flex items-center justify-center shrink-0 border border-amber-200">
                  <Church className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
                  <span className="font-bold text-amber-950 block">🗓️ Domingos (Día del Señor):</span>
                  <p className="font-semibold text-amber-900 mt-0.5">{item.sundays}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-800 block">Sábados:</span>
                  <p className="text-slate-600 mt-0.5">{item.saturdays}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-800 block">Lunes a Viernes:</span>
                  <p className="text-slate-600 mt-0.5">{item.weekdays}</p>
                </div>

                {item.confessions && (
                  <div className="p-3 rounded-xl bg-sky-50 border border-sky-100">
                    <span className="font-bold text-sky-900 block">Confesiones:</span>
                    <p className="text-sky-800 mt-0.5 text-xs">{item.confessions}</p>
                  </div>
                )}
              </div>
            </div>

            {item.phone && (
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Despacho: {item.phone}</span>
                </div>
                <span className="text-[11px] text-slate-400">Diócesis de Sonsonate</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
