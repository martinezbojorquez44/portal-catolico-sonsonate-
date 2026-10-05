import React, { useState, useMemo } from 'react';
import { ViewType } from '../types';
import { Search, X, Cross, Heart, Sparkles, BookOpen, Crown, Shield, Layers, HelpCircle, Calendar, Church } from 'lucide-react';
import { SAINTS_DATA } from '../data/saintsData';
import { ADVOCATIONS_DATA } from '../data/advocationsData';
import { SACRAMENTS_DATA, CATHOLIC_PRAYERS } from '../data/faithData';
import { INITIAL_MASS_SCHEDULES, INITIAL_NEWS } from '../data/dioceseData';

interface SearchItem {
  id: string;
  title: string;
  category: string;
  description: string;
  view: ViewType;
  icon: any;
}

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: ViewType) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  const searchableIndex: SearchItem[] = useMemo(() => {
    const list: SearchItem[] = [
      { id: 'jesus-main', title: 'Jesucristo: Centro de Nuestra Fe', category: 'Jesús', description: 'Vida, enseñanzas, milagros, pasión, muerte y resurrección del Salvador', view: 'jesus', icon: Cross },
      { id: 'trinity-main', title: 'La Santísima Trinidad', category: 'Trinidad', description: 'Padre, Hijo y Espíritu Santo: un solo Dios en tres Personas divinas', view: 'trinity', icon: Sparkles },
      { id: 'mary-main', title: 'La Santísima Virgen María', category: 'María', description: 'Madre de Dios, Madre de la Iglesia, virtudes y devociones marianas', view: 'mary', icon: Heart },
      { id: 'rosary-main', title: 'El Santo Rosario Interactivo', category: 'Rosario', description: 'Rezo guiado paso a paso, misterios gozosos, dolorosos, gloriosos y luminosos', view: 'rosary', icon: Layers },
      { id: 'gospel-main', title: 'Evangelio del Día y Liturgia', category: 'Evangelio', description: 'Lecturas de hoy, salmo responsorial, reflexión y oración', view: 'gospel', icon: BookOpen },
      { id: 'ai-main', title: 'Asistente Católico con Inteligencia Artificial', category: 'IA Católica', description: 'Consultas sobre doctrina, catecismo, oraciones y la fe católica', view: 'ai', icon: Sparkles },
      { id: 'quiz-main', title: 'Quiz Católico del Día', category: 'Quiz', description: 'Pon a prueba tus conocimientos sobre la fe, Biblia y doctrina', view: 'quiz', icon: HelpCircle },
      { id: 'bible-main', title: 'Santa Biblia Católica', category: 'Biblia', description: 'Los 73 libros canónicos del Antiguo y Nuevo Testamento', view: 'bible', icon: BookOpen },
      { id: 'diocese-main', title: 'Diócesis de Sonsonate', category: 'Diócesis', description: 'Historia, Monseñor Constantino Barrera y Catedral de Candelaria', view: 'diocese', icon: Church },
      { id: 'mass-main', title: 'Horarios de Santa Misa', category: 'Misas', description: 'Horarios de Misas y confesiones en parroquias de Sonsonate', view: 'mass', icon: Calendar },
      { id: 'pope-main', title: 'El Santo Padre — Papa León XIV', category: 'Papa', description: 'Vicario de Cristo, Magisterio y enseñanzas pontificias', view: 'pope', icon: Crown }
    ];

    // Add Saints
    SAINTS_DATA.forEach((s) => {
      list.push({
        id: `saint-${s.id}`,
        title: s.name,
        category: `Santos (${s.category})`,
        description: `${s.feastDayDisplay} • ${s.patronage}`,
        view: 'saints',
        icon: Shield
      });
    });

    // Add Marian Advocations
    ADVOCATIONS_DATA.forEach((a) => {
      list.push({
        id: `adv-${a.id}`,
        title: a.name,
        category: 'Advocaciones Marianas',
        description: `${a.country} • Fiesta: ${a.feastDay}`,
        view: 'advocations',
        icon: Crown
      });
    });

    // Add Sacraments
    SACRAMENTS_DATA.forEach((sac) => {
      list.push({
        id: `sac-${sac.id}`,
        title: sac.name,
        category: 'Sacramentos',
        description: sac.definition.slice(0, 90) + '...',
        view: 'sacraments',
        icon: Sparkles
      });
    });

    // Add Prayers
    CATHOLIC_PRAYERS.forEach((p) => {
      list.push({
        id: `prayer-${p.id}`,
        title: p.title,
        category: `Oraciones (${p.category})`,
        description: p.text.slice(0, 90) + '...',
        view: 'prayers',
        icon: Heart
      });
    });

    // Add Parishes
    INITIAL_MASS_SCHEDULES.forEach((m, idx) => {
      list.push({
        id: `mass-${idx}`,
        title: m.parish,
        category: 'Santa Misa',
        description: `${m.location} • Domingos: ${m.sundays}`,
        view: 'mass',
        icon: Calendar
      });
    });

    // Add News
    INITIAL_NEWS.forEach((n) => {
      list.push({
        id: `news-${n.id}`,
        title: n.title,
        category: 'Noticias Diocesanas',
        description: n.summary,
        view: 'news',
        icon: Calendar
      });
    });

    return list;
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return searchableIndex.slice(0, 8);
    const q = query.toLowerCase().trim();
    return searchableIndex.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    ).slice(0, 15);
  }, [query, searchableIndex]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-[#D4AF37]/30 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-[#D4AF37]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar Jesús, María, Santos, Evangelio, Misas, Oraciones..."
            className="w-full bg-transparent border-none text-slate-800 focus:outline-none text-base placeholder-slate-400"
            autoFocus
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs rounded bg-slate-200 text-slate-700 hover:bg-slate-300 font-medium"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 overflow-y-auto space-y-1.5 flex-1">
          {results.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No se encontraron resultados para «{query}». Prueba buscando "Jesús", "Rosario" o "Misa".
            </div>
          ) : (
            results.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.view);
                    onClose();
                  }}
                  className="w-full text-left p-3 rounded-xl hover:bg-amber-50/80 transition flex items-start gap-3.5 border border-transparent hover:border-[#D4AF37]/30 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[#0A1128] text-[#D4AF37] flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-slate-900 text-sm group-hover:text-[#B8860B] transition truncate">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{item.description}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Búsqueda global en toda la Diócesis de Sonsonate</span>
          <span className="text-[11px] text-slate-400">Selecciona para ir a la sección</span>
        </div>
      </div>
    </div>
  );
};
