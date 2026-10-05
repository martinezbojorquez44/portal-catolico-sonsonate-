import React from 'react';
import { ViewType } from '../types';
import { Cross, Church, Heart, Shield, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#060B1A] text-slate-300 border-t border-[#D4AF37]/30 pt-16 pb-24 xl:pb-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Diocesis Overview */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#D4AF37] p-0.5 flex items-center justify-center text-[#0A1128]">
                <Cross className="w-5 h-5 text-[#0A1128]" />
              </div>
              <div>
                <h3 className="text-white font-sacred font-bold text-base tracking-wide">
                  DIÓCESIS DE SONSONATE
                </h3>
                <p className="text-xs text-[#D4AF37]">El Salvador, Centroamérica</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 mb-4">
              Erigida el 31 de mayo de 1986 por Su Santidad San Juan Pablo II. Ponemos en el centro de nuestra fe y esperanza a Nuestro Señor Jesucristo y a la Santísima Virgen de Candelaria.
            </p>
            <div className="text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Barrio El Ángel, frente al Parque Central, Sonsonate</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>+503 2451-0348</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>curia@diocesisdesonsonate.org</span>
              </div>
            </div>
          </div>

          {/* Col 2: Centro de la Fe */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-xs uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              El Centro de Nuestra Fe
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('jesus')} className="hover:text-white transition">
                  ✝️ Jesucristo: Vida, Pasión y Resurrección
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trinity')} className="hover:text-white transition">
                  🕊️ La Santísima Trinidad
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mary')} className="hover:text-white transition">
                  💙 Santísima Virgen María
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('advocations')} className="hover:text-white transition">
                  👑 Advocaciones Marianas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('rosary')} className="hover:text-white transition">
                  📿 El Santo Rosario Interactivo
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('gospel')} className="hover:text-white transition">
                  📖 Evangelio del Día y Reflexión
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Formación y Vida Eclesial */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-xs uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Formación y Liturgia
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('saints')} className="hover:text-white transition">
                  😇 Santos de la Iglesia Católica
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sacraments')} className="hover:text-white transition">
                  ✨ Los Siete Sacramentos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('bible')} className="hover:text-white transition">
                  📜 Santa Biblia Católica
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('prayers')} className="hover:text-white transition">
                  🙏 Biblioteca de Oraciones y Novenas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-white transition">
                  🧠 Quiz Católico del Día
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('ai')} className="hover:text-white transition">
                  🤖 Asistente Católico con IA
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Diócesis y Parroquias */}
          <div>
            <h4 className="text-[#D4AF37] font-semibold text-xs uppercase tracking-wider mb-4 border-b border-white/10 pb-2">
              Diócesis de Sonsonate
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('diocese')} className="hover:text-white transition">
                  ⛪ Historia, Obispo y Santo Patrono
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('mass')} className="hover:text-white transition">
                  ⏰ Horarios de la Santa Misa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('news')} className="hover:text-white transition">
                  📰 Noticias, Eventos y Semana Santa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pope')} className="hover:text-white transition">
                  🇻🇦 El Santo Padre en el Vaticano
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('intentions')} className="hover:text-white transition">
                  💌 Enviar Intención de Oración
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('donations')} className="hover:text-white transition">
                  🤝 Colaborar con Obras Pastorales
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Diócesis de Sonsonate, El Salvador. Plataforma Oficial de Evangelización Católica.
          </div>
          <div className="italic text-slate-400">
            «La mies es mucha y los obreros pocos; rogad, pues, al Dueño de la mies» (Lc 10, 2)
          </div>
        </div>
      </div>
    </footer>
  );
};
