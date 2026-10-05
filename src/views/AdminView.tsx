import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  AlertCircle,
  Building,
  Calendar,
  Clock,
  BookOpen,
  Heart,
  Crown,
  HelpCircle,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { PRIMARY_ADMIN_EMAIL } from '../config/admin';
import { ViewType, DiocesanNews, MassSchedule, Saint, MarianAdvocation, QuizQuestion } from '../types';
import { INITIAL_DIOCESE_INFO, INITIAL_MASS_SCHEDULES, INITIAL_NEWS } from '../data/dioceseData';
import { SAINTS_DATA } from '../data/saintsData';
import { ADVOCATIONS_DATA } from '../data/advocationsData';
import { CATHOLIC_PRAYERS } from '../data/faithData';
import { CATHOLIC_QUIZ_QUESTIONS } from '../data/quizData';

interface AdminViewProps {
  onNavigate: (view: ViewType) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onNavigate }) => {
  const { user, isAdmin, adminLoading, signInWithGoogle, logout, verifyAdminAccess } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'diocese' | 'news' | 'events' | 'masses' | 'saints' | 'advocations' | 'prayers' | 'quiz' | 'gallery'
  >('diocese');

  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Firestore-backed data state
  const [dioceseData, setDioceseData] = useState({
    cathedralName: 'Catedral de la Santísima Trinidad de Sonsonate',
    cathedralHistory: 'Sede episcopal de la Diócesis de Sonsonate erigida en 1986 por San Juan Pablo II. Alberga la consagrada imagen de Nuestra Señora de Candelaria y la venerada imagen de Jesús Nazareno de Sonsonate.',
    cathedralImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    patronName: 'Nuestra Señora de Candelaria',
    patronHistory: 'Excelsa Patrona de la Diócesis de Sonsonate cuya fiesta solemne se celebra cada 2 de febrero con bendición de candelas y procesión solemne.',
    patronImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
    bishopName: 'S.E. Mons. Constantino Barrera Morales',
    bishopMotto: '«In veritate et caritate» (En la verdad y la caridad)',
    bishopBiography: 'Obispo de Sonsonate nombrado por el Papa Benedicto XVI el 11 de junio de 2012.',
    bishopMessage: INITIAL_DIOCESE_INFO.bishop.message,
    bishopImage: INITIAL_DIOCESE_INFO.bishop.image
  });

  const [newsList, setNewsList] = useState<DiocesanNews[]>(INITIAL_NEWS);
  const [massList, setMassList] = useState<MassSchedule[]>(INITIAL_MASS_SCHEDULES);
  const [saintsList, setSaintsList] = useState<Saint[]>(SAINTS_DATA);
  const [advocationsList, setAdvocationsList] = useState<MarianAdvocation[]>(ADVOCATIONS_DATA);
  const [prayersList, setPrayersList] = useState(CATHOLIC_PRAYERS);
  const [quizList, setQuizList] = useState<QuizQuestion[]>(CATHOLIC_QUIZ_QUESTIONS);
  const [galleriesList, setGalleriesList] = useState<{ id: string; title: string; category: string; imageUrl: string; description: string }[]>([
    {
      id: 'g-1',
      title: 'Solemnes Procesiones de Semana Santa en Sonsonate',
      category: 'Semana Santa',
      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&auto=format&fit=crop&q=80',
      description: 'Patrimonio Cultural Inmaterial: alfombras multicolores de aserrín y devoción a Jesús Nazareno.'
    },
    {
      id: 'g-2',
      title: 'Fiestas Patronales de la Candelaria en la Catedral de la Santísima Trinidad',
      category: 'Fiesta Patronal',
      imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
      description: 'Misa pontifical y bendición de las candelas en la sede episcopal de Sonsonate.'
    }
  ]);

  // Modals / Item Creation States
  const [newNews, setNewNews] = useState({ title: '', category: 'Pastoral', summary: '', content: '', image: '' });
  const [newMass, setNewMass] = useState({ parish: '', location: '', weekdays: '', saturdays: '', sundays: '', confessions: '', phone: '' });
  const [newSaint, setNewSaint] = useState({ name: '', feastDay: '01-01', feastDayDisplay: '', category: 'Apóstoles' as any, countryOfOrigin: '', patronage: '', biography: '', prayer: '' });
  const [newAdvocation, setNewAdvocation] = useState({ name: '', country: '', feastDay: '', history: '', significance: '', devotion: '', prayer: '', image: '' });
  const [newPrayer, setNewPrayer] = useState({ title: '', category: 'Fundamentales', text: '' });
  const [newQuiz, setNewQuiz] = useState({ category: 'Jesús', question: '', opt0: '', opt1: '', opt2: '', opt3: '', correctIndex: 0, explanation: '' });
  const [newGallery, setNewGallery] = useState({ title: '', category: 'Celebración', imageUrl: '', description: '' });

  // Load Firestore diocese data if existing
  useEffect(() => {
    if (!isAdmin) return;

    // Load Diocese Content doc
    const fetchDioceseDoc = async () => {
      try {
        const snap = await getDocs(collection(db, 'diocese_content'));
        if (!snap.empty) {
          const docData = snap.docs[0].data();
          setDioceseData((prev) => ({ ...prev, ...docData }));
        }
      } catch (err) {
        console.warn('Using default diocese data:', err);
      }
    };

    // Load News from Firestore
    const unsubNews = onSnapshot(collection(db, 'news'), (snapshot) => {
      if (!snapshot.empty) {
        const items: DiocesanNews[] = [];
        snapshot.forEach((d) => items.push({ id: d.id, ...d.data() } as DiocesanNews));
        setNewsList(items);
      }
    }, () => {});

    // Load Mass schedules from Firestore
    const unsubMass = onSnapshot(collection(db, 'mass_schedules'), (snapshot) => {
      if (!snapshot.empty) {
        const items: MassSchedule[] = [];
        snapshot.forEach((d) => items.push({ ...d.data() } as MassSchedule));
        setMassList(items);
      }
    }, () => {});

    // Load Galleries from Firestore
    const unsubGalleries = onSnapshot(collection(db, 'galleries'), (snapshot) => {
      if (!snapshot.empty) {
        const items: any[] = [];
        snapshot.forEach((d) => items.push({ id: d.id, ...d.data() }));
        setGalleriesList(items);
      }
    }, () => {});

    fetchDioceseDoc();

    return () => {
      unsubNews();
      unsubMass();
      unsubGalleries();
    };
  }, [isAdmin]);

  const handleGoogleLogin = async () => {
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const loggedUser = await signInWithGoogle();
      const authorized = await verifyAdminAccess();
      if (!authorized) {
        setLoginError('No tienes permisos para acceder al área administrativa.');
      }
    } catch (err: any) {
      console.error(err);
      setLoginError(err.message || 'Error al iniciar sesión con Google.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  const showActionError = (msg: string) => {
    setActionError(msg);
    setTimeout(() => setActionError(null), 4000);
  };

  // Save Diocese Institutional Content to Firestore
  const handleSaveDioceseContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionError(null);
    try {
      const docRef = doc(db, 'diocese_content', 'institutional');
      await setDoc(docRef, {
        ...dioceseData,
        updatedAt: new Date().toISOString()
      });
      showNotification('¡Información de la Diócesis, Catedral y Patrona guardada con éxito en Firestore!');
    } catch (err: any) {
      console.error(err);
      showActionError('Error al guardar en Firestore: ' + (err.message || 'Permiso denegado por Security Rules.'));
    }
  };

  // Add News to Firestore
  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNews.title || !newNews.summary) return;
    try {
      const docRef = await addDoc(collection(db, 'news'), {
        title: newNews.title,
        category: newNews.category,
        date: new Date().toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }),
        summary: newNews.summary,
        content: newNews.content || newNews.summary,
        image: newNews.image || 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80',
        createdAt: new Date().toISOString()
      });
      showNotification('¡Noticia publicada con éxito en Firestore!');
      setNewNews({ title: '', category: 'Pastoral', summary: '', content: '', image: '' });
    } catch (err: any) {
      showActionError('Error al crear noticia: ' + err.message);
    }
  };

  const handleDeleteNews = async (id: string) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta noticia?')) return;
    try {
      await deleteDoc(doc(db, 'news', id));
      setNewsList((prev) => prev.filter((n) => n.id !== id));
      showNotification('Noticia eliminada correctamente.');
    } catch (err: any) {
      showActionError('Error al eliminar noticia: ' + err.message);
    }
  };

  // Add Mass Schedule to Firestore
  const handleAddMass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMass.parish || !newMass.sundays) return;
    try {
      await addDoc(collection(db, 'mass_schedules'), {
        ...newMass,
        createdAt: new Date().toISOString()
      });
      showNotification('¡Horario de Misa guardado en Firestore!');
      setNewMass({ parish: '', location: '', weekdays: '', saturdays: '', sundays: '', confessions: '', phone: '' });
    } catch (err: any) {
      showActionError('Error al guardar horario de misa: ' + err.message);
    }
  };

  // Add Gallery item to Firestore
  const handleAddGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGallery.title || !newGallery.imageUrl) return;
    try {
      await addDoc(collection(db, 'galleries'), {
        ...newGallery,
        date: new Date().toLocaleDateString('es-ES'),
        createdAt: new Date().toISOString()
      });
      showNotification('¡Elemento agregado a la galería!');
      setNewGallery({ title: '', category: 'Celebración', imageUrl: '', description: '' });
    } catch (err: any) {
      showActionError('Error al agregar a la galería: ' + err.message);
    }
  };

  const handleDeleteGallery = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'galleries', id));
      setGalleriesList((prev) => prev.filter((g) => g.id !== id));
      showNotification('Elemento eliminado de la galería.');
    } catch (err: any) {
      showActionError('Error al eliminar: ' + err.message);
    }
  };

  // 1. Loading State
  if (adminLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <RefreshCw className="w-8 h-8 text-[#D4AF37] animate-spin" />
        <p className="text-sm font-semibold text-slate-600">Verificando credenciales diocesanas en Firestore...</p>
      </div>
    );
  }

  // 2. Unauthenticated State → Show Google Login Screen
  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-8 animate-in fade-in duration-200">
        <div className="w-20 h-20 rounded-full bg-[#0A1128] text-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center mx-auto shadow-2xl">
          <Lock className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-[#B8860B] border border-amber-200 text-xs font-bold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Área Administrativa Restringida</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-sacred text-slate-900">
            Diócesis de Sonsonate
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
            Acceso exclusivo para el Administrador Diocesano. Inicia sesión con la cuenta de Google autorizada.
          </p>
        </div>

        {loginError && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-2.5 text-left">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong>Acceso Denegado:</strong> {loginError}
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={isLoggingIn}
            className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-300 hover:border-[#D4AF37] shadow-sm transition flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{isLoggingIn ? 'Iniciando sesión...' : 'Iniciar Sesión con Google'}</span>
          </button>

          <p className="text-[11px] text-slate-400">
            Cuenta configurada autorizada: <span className="font-mono text-slate-600">{PRIMARY_ADMIN_EMAIL}</span>
          </p>
        </div>

        <button
          onClick={() => onNavigate('home')}
          className="text-xs font-semibold text-[#B8860B] hover:underline flex items-center justify-center gap-1.5 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al portal principal</span>
        </button>
      </div>
    );
  }

  // 3. Authenticated BUT NOT Authorized → Access Denied Screen
  if (!isAdmin) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-8 animate-in fade-in duration-200">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-600 border-2 border-rose-300 flex items-center justify-center mx-auto shadow-xl">
          <ShieldAlert className="w-10 h-10" />
        </div>

        <div className="space-y-3">
          <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold uppercase tracking-wider">
            Acceso Denegado
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold font-sacred text-slate-900">
            No tienes permisos para acceder al área administrativa
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Has iniciado sesión como: <br />
            <strong className="font-mono text-slate-800 text-xs">{user.email}</strong>
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Esta cuenta no está registrada como administradora en Firestore ni cumple las reglas de seguridad diocesanas.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={logout}
            className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
          <button
            onClick={() => onNavigate('home')}
            className="px-6 py-3 rounded-2xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider transition"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  // 4. Authenticated & Authorized Admin → Full Diocesan Dashboard
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Admin Header */}
      <div className="bg-gradient-to-r from-[#0A1128] via-[#102048] to-[#1E3A70] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-[#D4AF37]/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] text-xs font-bold uppercase tracking-widest border border-[#D4AF37]/40">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Administración Diocesana Autorizada</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sacred text-white">
            Panel de Control Eclesiástico
          </h1>
          <p className="text-xs text-slate-300">
            Sesión activa como: <span className="font-mono text-[#D4AF37]">{user.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition flex items-center gap-1.5"
          >
            <span>Ver Portal Web</span>
          </button>
          <button
            onClick={logout}
            className="px-4 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md"
          >
            <LogOut className="w-4 h-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>

      {/* Notification Banners */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center gap-2 shadow-sm animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {actionError && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs sm:text-sm flex items-center gap-2 shadow-sm animate-in fade-in">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{actionError}</span>
        </div>
      )}

      {/* Navigation Tabs for All Requested Features */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 no-scrollbar">
        {[
          { key: 'diocese', label: 'Catedral, Diócesis & Patrona', icon: Building },
          { key: 'news', label: 'Noticias', icon: BookOpen },
          { key: 'masses', label: 'Horarios de Misa', icon: Clock },
          { key: 'saints', label: 'Santos', icon: Shield },
          { key: 'advocations', label: 'Advocaciones', icon: Crown },
          { key: 'prayers', label: 'Oraciones', icon: Heart },
          { key: 'quiz', label: 'Preguntas Quiz', icon: HelpCircle },
          { key: 'gallery', label: 'Galerías', icon: ImageIcon }
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition flex items-center gap-2 ${
                active
                  ? 'bg-[#0A1128] text-[#D4AF37] shadow-md border border-[#D4AF37]/50'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: DIÓCESIS, CATEDRAL DE LA SANTÍSIMA TRINIDAD Y NUESTRA SEÑORA DE CANDELARIA */}
      {activeTab === 'diocese' && (
        <form onSubmit={handleSaveDioceseContent} className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl font-bold font-sacred text-slate-900">
                Información Institucional: Catedral, Patrona y Obispo
              </h2>
              <p className="text-xs text-slate-500">
                Diferenciación oficial: Catedral de la Santísima Trinidad de Sonsonate y Excelsa Patrona Nuestra Señora de Candelaria.
              </p>
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-[#0A1128] font-bold text-xs uppercase tracking-wider transition shadow-md hover:scale-105 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span>Guardar en Firestore</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Catedral */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <span className="text-xs font-bold text-[#B8860B] uppercase">Sede Episcopal</span>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre Oficial de la Catedral</label>
                <input
                  type="text"
                  required
                  value={dioceseData.cathedralName}
                  onChange={(e) => setDioceseData({ ...dioceseData, cathedralName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Historia y Descripción de la Catedral</label>
                <textarea
                  rows={3}
                  value={dioceseData.cathedralHistory}
                  onChange={(e) => setDioceseData({ ...dioceseData, cathedralHistory: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#D4AF37] bg-white"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL de Imagen de la Catedral</label>
                <input
                  type="text"
                  value={dioceseData.cathedralImage}
                  onChange={(e) => setDioceseData({ ...dioceseData, cathedralImage: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
              </div>
            </div>

            {/* Patrona */}
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-4">
              <span className="text-xs font-bold text-amber-900 uppercase">Patronazgo Diocesano</span>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Excelsa Patrona Diocesana</label>
                <input
                  type="text"
                  required
                  value={dioceseData.patronName}
                  onChange={(e) => setDioceseData({ ...dioceseData, patronName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#D4AF37] bg-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Historia y Devoción de la Patrona</label>
                <textarea
                  rows={3}
                  value={dioceseData.patronHistory}
                  onChange={(e) => setDioceseData({ ...dioceseData, patronHistory: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#D4AF37] bg-white"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL de Imagen de la Patrona</label>
                <input
                  type="text"
                  value={dioceseData.patronImage}
                  onChange={(e) => setDioceseData({ ...dioceseData, patronImage: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                />
              </div>
            </div>
          </div>

          {/* Obispo */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <span className="text-xs font-bold text-[#B8860B] uppercase">Obispo Diocesano</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre del Obispo</label>
                <input
                  type="text"
                  value={dioceseData.bishopName}
                  onChange={(e) => setDioceseData({ ...dioceseData, bishopName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Lema Episcopal</label>
                <input
                  type="text"
                  value={dioceseData.bishopMotto}
                  onChange={(e) => setDioceseData({ ...dioceseData, bishopMotto: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Mensaje Pastoral a los Fieles</label>
              <textarea
                rows={3}
                value={dioceseData.bishopMessage}
                onChange={(e) => setDioceseData({ ...dioceseData, bishopMessage: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white"
              ></textarea>
            </div>
          </div>
        </form>
      )}

      {/* TAB 2: NOTICIAS */}
      {activeTab === 'news' && (
        <div className="space-y-8">
          <form onSubmit={handleAddNews} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#B8860B]" />
              <span>Publicar Nueva Noticia Diocesana</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Título de la Noticia</label>
                <input
                  type="text"
                  required
                  value={newNews.title}
                  onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                  placeholder="Ej. Celebración Solemne en la Catedral..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Categoría</label>
                <select
                  value={newNews.category}
                  onChange={(e) => setNewNews({ ...newNews, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Pastoral">Pastoral</option>
                  <option value="Semana Santa">Semana Santa</option>
                  <option value="Jóvenes">Jóvenes</option>
                  <option value="Celebración">Celebración</option>
                  <option value="Caritas">Cáritas</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Resumen</label>
              <input
                type="text"
                required
                value={newNews.summary}
                onChange={(e) => setNewNews({ ...newNews, summary: e.target.value })}
                placeholder="Breve resumen visible en portada..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Contenido Completo</label>
              <textarea
                rows={4}
                required
                value={newNews.content}
                onChange={(e) => setNewNews({ ...newNews, content: e.target.value })}
                placeholder="Texto completo de la noticia eclesial..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0A1128] text-[#D4AF37] font-bold text-xs uppercase tracking-wider hover:bg-[#16295A] transition shadow-md"
            >
              Publicar Noticia
            </button>
          </form>

          {/* List of News */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100">
              Noticias Existentes ({newsList.length})
            </h3>
            <div className="space-y-3">
              {newsList.map((n) => (
                <div key={n.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#B8860B] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {n.category} • {n.date}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm mt-1">{n.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{n.summary}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteNews(n.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition"
                    title="Eliminar noticia"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HORARIOS DE MISA */}
      {activeTab === 'masses' && (
        <div className="space-y-8">
          <form onSubmit={handleAddMass} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#B8860B]" />
              <span>Agregar Horario de Santa Misa Parroquial</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Parroquia o Templo</label>
                <input
                  type="text"
                  required
                  value={newMass.parish}
                  onChange={(e) => setNewMass({ ...newMass, parish: e.target.value })}
                  placeholder="Ej. Parroquia San Miguel Arcángel"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Municipio / Ubicación</label>
                <input
                  type="text"
                  required
                  value={newMass.location}
                  onChange={(e) => setNewMass({ ...newMass, location: e.target.value })}
                  placeholder="Ej. Salcoatitán, Sonsonate"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Horarios Domingos</label>
                <input
                  type="text"
                  required
                  value={newMass.sundays}
                  onChange={(e) => setNewMass({ ...newMass, sundays: e.target.value })}
                  placeholder="Ej. 7:00 AM, 9:00 AM, 5:00 PM"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Sábados</label>
                <input
                  type="text"
                  value={newMass.saturdays}
                  onChange={(e) => setNewMass({ ...newMass, saturdays: e.target.value })}
                  placeholder="Ej. 6:30 AM, 5:00 PM"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Semana (Lunes a Viernes)</label>
                <input
                  type="text"
                  value={newMass.weekdays}
                  onChange={(e) => setNewMass({ ...newMass, weekdays: e.target.value })}
                  placeholder="Ej. 6:30 AM, 5:30 PM"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0A1128] text-[#D4AF37] font-bold text-xs uppercase tracking-wider transition shadow-md"
            >
              Guardar Horario Parroquial
            </button>
          </form>

          {/* List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-3">
            <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100">
              Parroquias Registradas ({massList.length})
            </h3>
            {massList.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{m.parish}</h4>
                  <p className="text-xs text-slate-500">{m.location} • Domingos: {m.sundays}</p>
                </div>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Activo</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SANTOS */}
      {activeTab === 'saints' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100">
            Administración del Santoral Católico ({saintsList.length} santos)
          </h3>
          <p className="text-xs text-slate-500">
            Catálogo completo protegido por reglas de seguridad de Firestore.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {saintsList.map((s) => (
              <div key={s.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <img src={s.image} alt={s.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h5 className="font-bold text-xs text-slate-900 truncate">{s.name}</h5>
                  <p className="text-[10px] text-[#B8860B]">{s.feastDayDisplay}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ADVOCACIONES MARIANAS */}
      {activeTab === 'advocations' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100">
            Administración de Advocaciones Marianas ({advocationsList.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
            {advocationsList.map((a) => (
              <div key={a.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <img src={a.image} alt={a.name} className="w-10 h-10 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <h5 className="font-bold text-xs text-slate-900 truncate">{a.name}</h5>
                  <p className="text-[10px] text-[#B8860B]">{a.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: ORACIONES */}
      {activeTab === 'prayers' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100">
            Biblioteca de Oraciones ({prayersList.length})
          </h3>
          <div className="space-y-3">
            {prayersList.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-bold text-slate-900 text-sm">{p.title}</h5>
                  <span className="text-[10px] bg-amber-50 border border-amber-200 text-[#B8860B] px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-scripture italic line-clamp-2">«{p.text}»</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: PREGUNTAS DEL QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100">
            Banco de Preguntas Doctrinales ({quizList.length})
          </h3>
          <div className="space-y-3">
            {quizList.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-[#B8860B] uppercase">{q.category}</span>
                <p className="font-semibold text-slate-900 text-sm">{q.question}</p>
                <p className="text-emerald-700 font-medium">✓ Respuesta correcta: {q.options[q.correctIndex]}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 8: GALERÍAS */}
      {activeTab === 'gallery' && (
        <div className="space-y-8">
          <form onSubmit={handleAddGallery} className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Plus className="w-5 h-5 text-[#B8860B]" />
              <span>Agregar Registro Audiovisual a Galería</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Título</label>
                <input
                  type="text"
                  required
                  value={newGallery.title}
                  onChange={(e) => setNewGallery({ ...newGallery, title: e.target.value })}
                  placeholder="Ej. Procesión del Santo Entierro..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Categoría</label>
                <select
                  value={newGallery.category}
                  onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  <option value="Semana Santa">Semana Santa</option>
                  <option value="Fiesta Patronal">Fiesta Patronal</option>
                  <option value="Celebración">Celebración</option>
                  <option value="Catedral">Catedral</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">URL de la Imagen o Video</label>
              <input
                type="text"
                required
                value={newGallery.imageUrl}
                onChange={(e) => setNewGallery({ ...newGallery, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Descripción</label>
              <input
                type="text"
                value={newGallery.description}
                onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                placeholder="Descripción del evento litúrgico o procesional..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0A1128] text-[#D4AF37] font-bold text-xs uppercase tracking-wider transition shadow-md"
            >
              Guardar en Galería
            </button>
          </form>

          {/* List */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold font-sacred text-slate-900 pb-2 border-b border-slate-100">
              Galería Diocesana ({galleriesList.length})
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {galleriesList.map((g) => (
                <div key={g.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex gap-4 items-start justify-between">
                  <img src={g.imageUrl} alt={g.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase text-[#B8860B]">{g.category}</span>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5 line-clamp-1">{g.title}</h5>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{g.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteGallery(g.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
