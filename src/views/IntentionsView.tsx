import React, { useState, useEffect } from 'react';
import { HeartHandshake, Send, CheckCircle2, Shield, Heart } from 'lucide-react';
import { PrayerIntention } from '../types';
import { useAuth } from '../context/AuthContext';

export const IntentionsView: React.FC = () => {
  const { user, profile, saveIntention } = useAuth();
  const [intentions, setIntentions] = useState<PrayerIntention[]>([]);
  const [name, setName] = useState(profile?.displayName || '');
  const [category, setCategory] = useState<'Salud' | 'Familia' | 'Difuntos' | 'Vocaciones' | 'Acción de gracias' | 'Conversión'>('Familia');
  const [intentionText, setIntentionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (profile?.displayName && !name) {
      setName(profile.displayName);
    }
  }, [profile]);

  useEffect(() => {
    fetch('/api/intentions')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setIntentions(data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!intentionText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/intentions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Fiel devoto',
          category,
          intention: intentionText.trim()
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.intention) {
          setIntentions((prev) => [data.intention, ...prev]);
        }
        // Also persist to user's private Firebase subcollection if logged in
        if (user) {
          try {
            await saveIntention(name.trim() || profile?.displayName || 'Fiel devoto', category, intentionText.trim());
          } catch (e) {
            console.error('Error saving user intention:', e);
          }
        }
        setSubmittedSuccess(true);
        setIntentionText('');
        if (!user) setName('');
        setTimeout(() => setSubmittedSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <HeartHandshake className="w-3.5 h-3.5" />
          <span>Comunión de Oración</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          🙏 Enviar Intención de Oración
        </h1>
        <p className="max-w-2xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          «Pedid y se os dará; buscad y hallaréis; llamad y se os abrirá» (Mt 7, 7).
          Tus intenciones son encomendadas en la Santa Misa y en las oraciones de la Diócesis de Sonsonate.
        </p>
      </div>

      {/* Submission Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-6">
        <h3 className="text-xl font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100">
          Formulario de Petición
        </h3>

        {submittedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>¡Tu intención ha sido recibida con devoción y será encomendada en la oración comunitaria!</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Nombre (Opcional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Familia Pérez o Anónimo"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Categoría de Intención
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white"
              >
                <option value="Salud">Salud de los enfermos</option>
                <option value="Familia">Por la Familia y el Hogar</option>
                <option value="Difuntos">Por el eterno descanso (Difuntos)</option>
                <option value="Vocaciones">Por las Vocaciones Sacerdotales</option>
                <option value="Acción de gracias">Acción de gracias a Dios</option>
                <option value="Conversión">Por la conversión de los pecadores</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
              Tu Petición de Oración
            </label>
            <textarea
              rows={4}
              required
              value={intentionText}
              onChange={(e) => setIntentionText(e.target.value)}
              placeholder="Escribe aquí tu petición o acción de gracias al Señor..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37]"
            ></textarea>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Privacidad protegida: no se comparten datos personales sensibles ni teléfonos.</span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !intentionText.trim()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold text-sm shadow-lg hover:scale-105 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Enviando...' : 'Enviar Intención de Oración'}</span>
          </button>
        </form>
      </div>

      {/* Community Prayer Intentions List */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold font-sacred text-slate-900">
          Intenciones de la Comunidad Diocesana
        </h3>
        <div className="space-y-3">
          {intentions.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white shadow-md border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900">{item.name}</span>
                  <span className="text-[10px] font-semibold text-[#B8860B] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{item.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic">
                  «{item.intention}»
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 text-xs text-[#B8860B] font-semibold">
                <Heart className="w-4 h-4 fill-amber-100 text-[#B8860B]" />
                <span>En oración</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
