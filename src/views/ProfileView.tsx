import React, { useState } from 'react';
import { User, Church, Heart, Award, Trash2, LogOut, CheckCircle2, Calendar, BookOpen, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ViewType } from '../types';

interface ProfileViewProps {
  onNavigate: (view: ViewType) => void;
  onOpenAuth: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onNavigate, onOpenAuth }) => {
  const { user, profile, logout, intentions, quizStats, deleteIntention, updateUserParish } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'intentions' | 'quizzes'>('profile');
  const [selectedParish, setSelectedParish] = useState(profile?.parish || 'Catedral de Nuestra Señora de Candelaria');
  const [parishUpdated, setParishUpdated] = useState(false);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-[#B8860B] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-md">
          <User className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold font-sacred text-slate-900">
          Mi Perfil de Feligrés
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Inicia sesión o regístrate para acceder a tus intenciones de oración guardadas, tu historial de quizzes católicos y tu comunidad parroquial en la Diócesis de Sonsonate.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold text-sm shadow-xl hover:scale-105 transition"
        >
          Iniciar Sesión / Registrarme
        </button>
      </div>
    );
  }

  const handleUpdateParish = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserParish(selectedParish);
    setParishUpdated(true);
    setTimeout(() => setParishUpdated(false), 3000);
  };

  const accuracyRate = quizStats && quizStats.totalQuestionsAnswered > 0
    ? Math.round((quizStats.totalCorrectAnswers / quizStats.totalQuestionsAnswered) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Profile Card */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-[#D4AF37]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold text-xl flex items-center justify-center shadow-lg shrink-0">
            {profile?.displayName?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-sacred text-white">
              {profile?.displayName || 'Feligrés Católico'}
            </h1>
            <p className="text-xs text-[#D4AF37] mt-0.5">{profile?.email}</p>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-1">
              <Church className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{profile?.parish || 'Catedral de Sonsonate'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-200 border border-white/20 text-xs font-semibold transition flex items-center gap-1.5"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Cerrar Sesión</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-[#0A1128] text-[#D4AF37]'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Datos del Perfil</span>
        </button>

        <button
          onClick={() => setActiveTab('intentions')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'intentions'
              ? 'bg-[#0A1128] text-[#D4AF37]'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Mis Intenciones ({intentions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('quizzes')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'quizzes'
              ? 'bg-[#0A1128] text-[#D4AF37]'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Mi Progreso en Quizzes</span>
        </button>
      </div>

      {/* Tab 1: Profile & Parish Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100">
            Parroquia de Pertenencia en Sonsonate
          </h3>

          {parishUpdated && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>¡Parroquia actualizada con éxito!</span>
            </div>
          )}

          <form onSubmit={handleUpdateParish} className="space-y-4 max-w-md">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Selecciona tu Parroquia
              </label>
              <select
                value={selectedParish}
                onChange={(e) => setSelectedParish(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white"
              >
                <option value="Catedral de Nuestra Señora de Candelaria">Catedral de Nuestra Señora de Candelaria</option>
                <option value="Santuario de San Antonio del Monte">Santuario de San Antonio del Monte</option>
                <option value="Parroquia San Juan Bautista (Nahuizalco)">Parroquia San Juan Bautista (Nahuizalco)</option>
                <option value="Parroquia Nuestra Señora de los Dolores (Izalco)">Parroquia Nuestra Señora de los Dolores (Izalco)</option>
                <option value="Parroquia Santa Lucía (Juayúa)">Parroquia Santa Lucía (Juayúa)</option>
                <option value="Parroquia San Francisco de Asís (Armenia)">Parroquia San Francisco de Asís (Armenia)</option>
                <option value="Otra Parroquia de la Diócesis">Otra Parroquia de la Diócesis</option>
              </select>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0A1128] text-[#D4AF37] font-bold text-xs hover:bg-[#16295A] transition"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      )}

      {/* Tab 2: Saved Prayer Intentions */}
      {activeTab === 'intentions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold font-sacred text-slate-900">
                Mis Intenciones de Oración Guardadas
              </h3>
              <p className="text-xs text-slate-500">Persistidas de forma segura en tu cuenta</p>
            </div>
            <button
              onClick={() => onNavigate('intentions')}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0A1128] font-bold text-xs hover:bg-[#E6CA65] transition"
            >
              + Nueva Intención
            </button>
          </div>

          {intentions.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              Aún no has registrado intenciones de oración personales.
            </div>
          ) : (
            <div className="space-y-3">
              {intentions.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#B8860B] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 italic">
                      «{item.intention}»
                    </p>
                  </div>

                  <button
                    onClick={() => deleteIntention(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition"
                    title="Eliminar intención"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Quiz Progress */}
      {activeTab === 'quizzes' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold font-sacred text-slate-900">
                Mi Progreso y Estadísticas en Quizzes
              </h3>
              <p className="text-xs text-slate-500">Historial de conocimiento y catequesis</p>
            </div>
            <button
              onClick={() => onNavigate('quiz')}
              className="px-4 py-2 rounded-xl bg-[#D4AF37] text-[#0A1128] font-bold text-xs hover:bg-[#E6CA65] transition"
            >
              Hacer Quiz del Día
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <span className="text-2xl font-bold font-sacred text-amber-950">
                {quizStats?.quizzesTaken || 0}
              </span>
              <p className="text-xs text-amber-800 mt-1">Quizzes Completados</p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <span className="text-2xl font-bold font-sacred text-emerald-950">
                {quizStats?.highestScore || 0}
              </span>
              <p className="text-xs text-emerald-800 mt-1">Mejor Puntuación</p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-center">
              <span className="text-2xl font-bold font-sacred text-sky-950">
                {quizStats?.lastScore || 0}
              </span>
              <p className="text-xs text-sky-800 mt-1">Última Puntuación</p>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center">
              <span className="text-2xl font-bold font-sacred text-purple-950">
                {accuracyRate}%
              </span>
              <p className="text-xs text-purple-800 mt-1">Acierto Global</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
