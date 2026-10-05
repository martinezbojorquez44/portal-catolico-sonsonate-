import React, { useState, useEffect } from 'react';
import { Church, Cross, Heart, Users, MapPin, Phone, Mail, Clock, Calendar, Sparkles, Shield } from 'lucide-react';
import { INITIAL_DIOCESE_INFO, DioceseInfo } from '../data/dioceseData';

export const DioceseView: React.FC = () => {
  const [dioceseInfo, setDioceseInfo] = useState<DioceseInfo>(INITIAL_DIOCESE_INFO);

  useEffect(() => {
    // Attempt to load updated message from server if modified by admin
    fetch('/api/diocese-status')
      .then((res) => res.json())
      .then((data) => {
        if (data?.bishopMessage) {
          setDioceseInfo((prev) => ({
            ...prev,
            bishop: { ...prev.bishop, message: data.bishopMessage }
          }));
        }
      })
      .catch(() => {});
  }, []);

  const pastorals = [
    { name: 'Pastoral Juvenil Diocesana', desc: 'Acompañamiento, retiros y formación espiritual para los jóvenes de las 28 parroquias de Sonsonate.' },
    { name: 'Pastoral Familiar', desc: 'Promoción del santo sacramento del matrimonio, defensa de la vida y acompañamiento a los hogares.' },
    { name: 'Catequesis Diocesana', desc: 'Iniciación cristiana para niños, jóvenes y adultos en comunión y confirmación.' },
    { name: 'Monaguillos y Acólitos', desc: 'Servicio reverente en el altar de la Catedral y en todas las comunidades parroquiales.' },
    { name: 'Coros y Música Sacra', desc: 'Alabanza litúrgica que eleva el alma hacia Dios en las celebraciones eucarísticas.' },
    { name: 'Cáritas y Obras Sociales', desc: 'Misericordia activa en favor de los ancianos, enfermos, comedores parroquiales y familias necesitadas.' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Church className="w-3.5 h-3.5" />
          <span>Iglesia Particular de Sonsonate</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          ⛪ Diócesis de Sonsonate
        </h1>
        <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          Erigida por Su Santidad San Juan Pablo II el 31 de mayo de 1986. Sede episcopal de fe centenaria, cuna de venerables hermandades y pueblo fiel bajo el amparo de Nuestra Señora de Candelaria.
        </p>
      </div>

      {/* Obispo Diocesano */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-2 border-[#D4AF37]/50 flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-56 rounded-2xl overflow-hidden shadow-xl border-2 border-[#D4AF37] shrink-0 bg-slate-900">
          <img
            src={dioceseInfo.bishop.image}
            alt={dioceseInfo.bishop.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-4">
          <span className="px-3 py-1 rounded-full bg-amber-50 text-[#B8860B] border border-amber-200 text-xs font-bold uppercase tracking-wider">
            Pastor Propio de la Diócesis
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-sacred text-slate-900">
            {dioceseInfo.bishop.name}
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-[#B8860B]">
            Lema Episcopal: {dioceseInfo.bishop.pastoralMotto} • {dioceseInfo.bishop.appointmentDate}
          </p>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {dioceseInfo.bishop.biography}
          </p>
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 font-scripture text-base italic text-amber-950">
            {dioceseInfo.bishop.message}
          </div>
        </div>
      </div>

      {/* Excelsa Patrona y Jesús Nazareno de Sonsonate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Patrona */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="h-52 bg-slate-900 overflow-hidden relative">
              <img
                src={dioceseInfo.patronSaint.image}
                alt={dioceseInfo.patronSaint.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase bg-black/60 px-2 py-0.5 rounded">
                  Fiesta Patronal: {dioceseInfo.patronSaint.feastDay}
                </span>
                <h3 className="text-xl font-bold font-sacred text-white mt-1">
                  {dioceseInfo.patronSaint.name}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] block mb-2">
                {dioceseInfo.patronSaint.title}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {dioceseInfo.patronSaint.history}
              </p>
            </div>
          </div>
          <div className="p-6 pt-0 border-t border-slate-100 text-xs text-[#B8860B] font-semibold">
            Catedral de la Santísima Trinidad de Sonsonate
          </div>
        </div>

        {/* Jesús Nazareno de Sonsonate */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="h-52 bg-slate-900 overflow-hidden relative">
              <img
                src={dioceseInfo.jesusNazareno.image}
                alt={dioceseInfo.jesusNazareno.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-[10px] font-bold text-[#D4AF37] uppercase bg-black/60 px-2 py-0.5 rounded">
                  Devoción Inmemorial
                </span>
                <h3 className="text-xl font-bold font-sacred text-white mt-1">
                  {dioceseInfo.jesusNazareno.title}
                </h3>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] block mb-2">
                {dioceseInfo.jesusNazareno.heritage}
              </span>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {dioceseInfo.jesusNazareno.description}
              </p>
            </div>
          </div>
          <div className="p-6 pt-0 border-t border-slate-100 text-xs text-[#B8860B] font-semibold">
            Hermandad de Jesús Nazareno de Sonsonate
          </div>
        </div>
      </div>

      {/* Pastorales y Movimientos */}
      <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200 space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase font-bold text-[#B8860B] tracking-wider">Comunión y Misión</span>
          <h3 className="text-2xl font-bold font-sacred text-slate-900 mt-1">
            Pastorales, Movimientos y Grupos Eclesiales
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
          {pastorals.map((p) => (
            <div key={p.name} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="font-bold font-sacred text-slate-900 text-sm mb-1">{p.name}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Curia Diocesana y Contacto */}
      <div className="bg-gradient-to-r from-[#0A1128] to-[#16295A] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#D4AF37]/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs uppercase font-bold text-[#D4AF37] tracking-wider">Sede Institucional</span>
            <h3 className="text-2xl font-bold font-sacred text-white mt-1 mb-4">
              Curia Diocesana y Obispado
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Atención pastoral a los fieles, trámites eclesiásticos, licencias matrimoniales y coordinación diocesana.
            </p>
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{dioceseInfo.contact.address}, {dioceseInfo.contact.city}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{dioceseInfo.contact.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{dioceseInfo.contact.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>{dioceseInfo.contact.curiaHours}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
