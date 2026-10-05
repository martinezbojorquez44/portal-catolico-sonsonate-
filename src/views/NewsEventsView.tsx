import React, { useState } from 'react';
import { Calendar, Sparkles, MapPin, Tag, ArrowRight } from 'lucide-react';
import { INITIAL_NEWS } from '../data/dioceseData';
import { DiocesanNews } from '../types';

export const NewsEventsView: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<DiocesanNews | null>(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-[#D4AF37]/30 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/30">
          <Calendar className="w-3.5 h-3.5" />
          <span>Comunidad y Misión</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold font-sacred text-white mb-4">
          📰 Noticias y Eventos Diocesanos
        </h1>
        <p className="max-w-3xl mx-auto text-slate-200 text-sm sm:text-base font-light leading-relaxed">
          Sigue las principales actividades pastorales, solemnidades, procesiones de Semana Santa y encuentros diocesanos en Sonsonate.
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {INITIAL_NEWS.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200 hover:border-[#D4AF37] transition flex flex-col justify-between"
          >
            <div>
              {item.image && (
                <div className="h-48 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              )}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#B8860B] uppercase bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                    {item.category}
                  </span>
                  <span className="text-slate-400">{item.date}</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-sacred text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-slate-100 mt-4">
              <button
                onClick={() => setSelectedNews(item)}
                className="text-xs font-bold text-[#B8860B] hover:text-[#785404] transition flex items-center gap-1.5"
              >
                <span>Leer noticia completa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedNews && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 relative">
            <button
              onClick={() => setSelectedNews(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold"
            >
              ✕
            </button>

            <span className="text-xs font-bold uppercase tracking-wider text-[#B8860B] bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              {selectedNews.category} • {selectedNews.date}
            </span>

            <h2 className="text-2xl sm:text-3xl font-bold font-sacred text-slate-900 mt-3 mb-4">
              {selectedNews.title}
            </h2>

            {selectedNews.image && (
              <img
                src={selectedNews.image}
                alt={selectedNews.title}
                className="w-full h-56 object-cover rounded-2xl mb-6 shadow-md"
              />
            )}

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p className="font-semibold text-slate-900">{selectedNews.summary}</p>
              <p>{selectedNews.content}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
