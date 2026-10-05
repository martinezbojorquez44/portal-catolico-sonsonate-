import React, { useState } from 'react';
import { ViewType } from '../types';
import {
  Menu,
  X,
  Search,
  Cross,
  Sparkles,
  BookOpen,
  Calendar,
  MessageCircle,
  HelpCircle,
  Church,
  HeartHandshake,
  Shield,
  Layers,
  Crown,
  Lock,
  Heart,
  User as UserIcon,
  LogIn
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenSearch: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, onOpenSearch, onOpenAuth }) => {
  const { user, profile } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { view: ViewType; label: string; icon: any }[] = [
    { view: 'home', label: 'Inicio', icon: Church },
    { view: 'jesus', label: 'Jesús', icon: Cross },
    { view: 'trinity', label: 'Trinidad', icon: Sparkles },
    { view: 'mary', label: 'María', icon: Heart },
    { view: 'advocations', label: 'Advocaciones', icon: Crown },
    { view: 'rosary', label: 'Rosario', icon: Layers },
    { view: 'saints', label: 'Santos', icon: Shield },
    { view: 'gospel', label: 'Evangelio', icon: BookOpen },
    { view: 'ai', label: 'IA Católica', icon: MessageCircle },
    { view: 'quiz', label: 'Quiz', icon: HelpCircle },
    { view: 'sacraments', label: 'Sacramentos', icon: Sparkles },
    { view: 'bible', label: 'Biblia', icon: BookOpen },
    { view: 'prayers', label: 'Oraciones', icon: HeartHandshake },
    { view: 'diocese', label: 'Diócesis', icon: Church },
    { view: 'mass', label: 'Santa Misa', icon: Calendar },
    { view: 'news', label: 'Noticias', icon: Calendar },
    { view: 'pope', label: 'Papa', icon: Crown }
  ];

  const handleNavClick = (view: ViewType) => {
    onNavigate(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0A1128] text-white shadow-xl border-b border-[#D4AF37]/30">
      {/* Top Diocesan Header Bar */}
      <div className="bg-[#060B1A] border-b border-white/5 py-1.5 px-4 text-xs font-medium text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="tracking-wide uppercase font-semibold text-[#D4AF37]">
              Diócesis de Sonsonate
            </span>
            <span className="hidden sm:inline text-slate-400">| El Salvador, C.A.</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            {user ? (
              <button
                onClick={() => handleNavClick('profile')}
                className="hover:text-[#D4AF37] transition flex items-center gap-1.5 font-semibold text-[#D4AF37]"
              >
                <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-[#0A1128] font-bold text-[10px] flex items-center justify-center">
                  {profile?.displayName?.charAt(0) || user.email?.charAt(0)?.toUpperCase()}
                </div>
                <span className="hidden sm:inline">{profile?.displayName || 'Mi Perfil'}</span>
              </button>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hover:text-[#D4AF37] transition flex items-center gap-1 font-semibold"
              >
                <LogIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Ingresar</span>
              </button>
            )}

            <button
              onClick={() => handleNavClick('intentions')}
              className="hover:text-[#D4AF37] transition flex items-center gap-1"
            >
              <HeartHandshake className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden md:inline">Intenciones de Oración</span>
            </button>
            <button
              onClick={() => handleNavClick('donations')}
              className="hover:text-[#D4AF37] transition flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden md:inline">Donaciones</span>
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-slate-400 hover:text-white transition flex items-center gap-1"
              title="Panel Administrativo"
            >
              <Lock className="w-3 h-3" />
              <span className="hidden sm:inline">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Diocesan Title */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#B8860B] to-[#785404] p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#0A1128] flex items-center justify-center group-hover:bg-[#101F42] transition">
                <Cross className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold font-sacred tracking-wider text-white group-hover:text-[#D4AF37] transition">
                DIÓCESIS DE SONSONATE
              </div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-light tracking-wide">
                «Jesucristo, centro de nuestra fe y esperanza»
              </div>
            </div>
          </button>

          {/* Actions: Search & Mobile Menu Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-lg bg-white/10 hover:bg-[#D4AF37]/20 text-slate-200 hover:text-[#D4AF37] transition flex items-center gap-2 text-sm font-medium border border-white/10"
              title="Buscador General"
            >
              <Search className="w-4 h-4" />
              <span className="hidden lg:inline">Buscar</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition xl:hidden border border-white/10"
              aria-label="Abrir menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Horizontal Scroll Menu */}
        <nav className="hidden xl:flex items-center gap-1 overflow-x-auto py-2 border-t border-white/10 text-xs font-medium no-scrollbar">
          {navItems.map((item) => {
            const active = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition flex items-center gap-1.5 ${
                  active
                    ? 'bg-[#D4AF37] text-[#0A1128] font-bold shadow-sm'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0A1128] border-t border-[#D4AF37]/20 max-h-[80vh] overflow-y-auto px-4 py-4 space-y-1 shadow-2xl">
          <div className="text-xs uppercase font-bold text-[#D4AF37] px-3 py-1 tracking-wider">
            Menú de Evangelización
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const active = currentView === item.view;
              const Icon = item.icon;
              return (
                <button
                  key={item.view}
                  onClick={() => handleNavClick(item.view)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm transition ${
                    active
                      ? 'bg-[#D4AF37] text-[#0A1128] font-bold'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#0A1128]' : 'text-[#D4AF37]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 mt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleNavClick('intentions')}
              className="p-2.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 text-center flex items-center justify-center gap-1.5"
            >
              <HeartHandshake className="w-4 h-4 text-[#D4AF37]" />
              <span>Intenciones</span>
            </button>
            <button
              onClick={() => handleNavClick('donations')}
              className="p-2.5 rounded bg-white/5 hover:bg-white/10 text-slate-200 text-center flex items-center justify-center gap-1.5"
            >
              <Heart className="w-4 h-4 text-[#D4AF37]" />
              <span>Donaciones</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Quick Bar on Mobile */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#060B1A]/95 backdrop-blur-md border-t border-[#D4AF37]/30 px-2 py-2 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center text-[10px] ${
            currentView === 'home' ? 'text-[#D4AF37] font-bold' : 'text-slate-300'
          }`}
        >
          <Church className="w-5 h-5 mb-0.5" />
          <span>Inicio</span>
        </button>
        <button
          onClick={() => handleNavClick('gospel')}
          className={`flex flex-col items-center text-[10px] ${
            currentView === 'gospel' ? 'text-[#D4AF37] font-bold' : 'text-slate-300'
          }`}
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span>Evangelio</span>
        </button>
        <button
          onClick={() => handleNavClick('rosary')}
          className={`flex flex-col items-center text-[10px] ${
            currentView === 'rosary' ? 'text-[#D4AF37] font-bold' : 'text-slate-300'
          }`}
        >
          <div className="p-1 rounded-full bg-[#D4AF37] text-[#0A1128] -mt-3 shadow-lg">
            <Layers className="w-5 h-5" />
          </div>
          <span>Rosario</span>
        </button>
        <button
          onClick={() => handleNavClick('ai')}
          className={`flex flex-col items-center text-[10px] ${
            currentView === 'ai' ? 'text-[#D4AF37] font-bold' : 'text-slate-300'
          }`}
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span>IA Católica</span>
        </button>
        <button
          onClick={() => handleNavClick('mass')}
          className={`flex flex-col items-center text-[10px] ${
            currentView === 'mass' ? 'text-[#D4AF37] font-bold' : 'text-slate-300'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span>Misas</span>
        </button>
      </div>
    </header>
  );
};
