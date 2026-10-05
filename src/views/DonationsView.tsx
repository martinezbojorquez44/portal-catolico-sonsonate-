import React from 'react';
import { Heart, Building, Users, BookOpen, Shield, CreditCard, Sparkles } from 'lucide-react';

export const DonationsView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Heart className="w-3.5 h-3.5" />
          <span>Generosidad Cristiana</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          🤝 Apoyo y Donaciones a la Diócesis
        </h1>
        <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          «Cada uno dé como propuso en su corazón: no con tristeza, ni por necesidad, porque Dios ama al dador alegre» (2 Corintios 9, 7).
        </p>
      </div>

      {/* Pillars of Support */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#B8860B] flex items-center justify-center font-bold">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-sacred text-slate-900">
            Mantenimiento y Templos
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Preservación del patrimonio sacro, Catedral de Candelaria y templos parroquiales históricos en los municipios de Sonsonate.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#B8860B] flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-sacred text-slate-900">
            Obras Sociales y Cáritas
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Alimentación para ancianos desamparados, medicinas para enfermos y ayuda a familias vulnerables en comunidades rurales.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#B8860B] flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold font-sacred text-slate-900">
            Seminario y Vocaciones
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Formación humana, intelectual y espiritual de los futuros sacerdotes que pastorearán las parroquias sonsonatecas.
          </p>
        </div>
      </div>

      {/* Bank Account Info Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-[#D4AF37]/50 space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <CreditCard className="w-6 h-6 text-[#B8860B]" />
          <div>
            <h3 className="text-xl font-bold font-sacred text-slate-900">
              Canales Oficiales de Colaboración
            </h3>
            <p className="text-xs text-slate-500">Diócesis de Sonsonate — Personería Canónica y Jurídica</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 block">Transferencia Bancaria Nacional (El Salvador):</span>
            <p className="text-slate-600">A nombre de: <strong>Diócesis de Sonsonate</strong></p>
            <p className="text-slate-600">Banco: Banco Agrícola / Banco de América Central</p>
            <p className="text-slate-600">Cuenta de Ahorros: <strong>[Consultar en Curia Diocesana]</strong></p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-1 text-amber-950">
            <span className="font-bold block">Ofrenda Presencial:</span>
            <p>Puedes entregar tu diezmo u ofrenda directamente en el despacho del Obispado de Sonsonate o en la colecta parroquial de tu comunidad.</p>
            <p className="text-xs font-semibold mt-1">Teléfono Curia: +503 2451-0348</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-100 text-slate-600 text-xs text-center">
          * La plataforma cuenta con la infraestructura lista para la activación futura de pasarelas de pago electrónico con tarjeta de débito/crédito.
        </div>
      </div>
    </div>
  );
};
