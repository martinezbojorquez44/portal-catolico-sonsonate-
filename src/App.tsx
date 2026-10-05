import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';

import { HomeView } from './views/HomeView';
import { JesusView } from './views/JesusView';
import { TrinityView } from './views/TrinityView';
import { MaryView } from './views/MaryView';
import { AdvocationsView } from './views/AdvocationsView';
import { RosaryView } from './views/RosaryView';
import { SaintsView } from './views/SaintsView';
import { GospelView } from './views/GospelView';
import { CatholicAiView } from './views/CatholicAiView';
import { QuizView } from './views/QuizView';
import { SacramentsView } from './views/SacramentsView';
import { BibleView } from './views/BibleView';
import { PrayersView } from './views/PrayersView';
import { DioceseView } from './views/DioceseView';
import { MassSchedulesView } from './views/MassSchedulesView';
import { NewsEventsView } from './views/NewsEventsView';
import { PopeView } from './views/PopeView';
import { IntentionsView } from './views/IntentionsView';
import { DonationsView } from './views/DonationsView';
import { AdminView } from './views/AdminView';
import { ProfileView } from './views/ProfileView';

function getViewFromLocation(): ViewType {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();

  if (path.startsWith('/admin') || hash.startsWith('#admin')) return 'admin';
  if (path.startsWith('/jesus') || hash.startsWith('#jesus')) return 'jesus';
  if (path.startsWith('/trinidad') || hash.startsWith('#trinidad') || path.startsWith('/trinity')) return 'trinity';
  if (path.startsWith('/maria') || hash.startsWith('#maria') || path.startsWith('/mary')) return 'mary';
  if (path.startsWith('/advocaciones') || hash.startsWith('#advocaciones')) return 'advocations';
  if (path.startsWith('/rosario') || hash.startsWith('#rosario')) return 'rosary';
  if (path.startsWith('/santos') || hash.startsWith('#santos')) return 'saints';
  if (path.startsWith('/evangelio') || hash.startsWith('#evangelio') || path.startsWith('/gospel')) return 'gospel';
  if (path.startsWith('/ia') || hash.startsWith('#ia') || path.startsWith('/ai')) return 'ai';
  if (path.startsWith('/quiz') || hash.startsWith('#quiz')) return 'quiz';
  if (path.startsWith('/sacramentos') || hash.startsWith('#sacramentos')) return 'sacraments';
  if (path.startsWith('/biblia') || hash.startsWith('#biblia')) return 'bible';
  if (path.startsWith('/oraciones') || hash.startsWith('#oraciones')) return 'prayers';
  if (path.startsWith('/diocesis') || hash.startsWith('#diocesis')) return 'diocese';
  if (path.startsWith('/misa') || hash.startsWith('#misa') || path.startsWith('/mass')) return 'mass';
  if (path.startsWith('/noticias') || hash.startsWith('#noticias') || path.startsWith('/news')) return 'news';
  if (path.startsWith('/papa') || hash.startsWith('#papa')) return 'pope';
  if (path.startsWith('/intenciones') || hash.startsWith('#intenciones')) return 'intentions';
  if (path.startsWith('/donaciones') || hash.startsWith('#donaciones')) return 'donations';
  if (path.startsWith('/perfil') || hash.startsWith('#perfil') || path.startsWith('/profile')) return 'profile';

  return 'home';
}

function AppContent() {
  const [currentView, setCurrentView] = useState<ViewType>(getViewFromLocation);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getViewFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    const newPath = view === 'home' ? '/' : `/${view}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({}, '', newPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView onNavigate={handleNavigate} />;
      case 'jesus':
        return <JesusView />;
      case 'trinity':
        return <TrinityView />;
      case 'mary':
        return <MaryView />;
      case 'advocations':
        return <AdvocationsView />;
      case 'rosary':
        return <RosaryView />;
      case 'saints':
        return <SaintsView />;
      case 'gospel':
        return <GospelView onNavigate={handleNavigate} />;
      case 'ai':
        return <CatholicAiView />;
      case 'quiz':
        return <QuizView />;
      case 'sacraments':
        return <SacramentsView />;
      case 'bible':
        return <BibleView />;
      case 'prayers':
        return <PrayersView />;
      case 'diocese':
        return <DioceseView />;
      case 'mass':
        return <MassSchedulesView />;
      case 'news':
        return <NewsEventsView />;
      case 'pope':
        return <PopeView />;
      case 'intentions':
        return <IntentionsView />;
      case 'donations':
        return <DonationsView />;
      case 'admin':
        return <AdminView onNavigate={handleNavigate} />;
      case 'profile':
        return (
          <ProfileView
            onNavigate={handleNavigate}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        );
      default:
        return <HomeView onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1E293B]">
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      <main className="flex-1">
        {renderView()}
      </main>

      <Footer onNavigate={handleNavigate} />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={() => handleNavigate('profile')}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
