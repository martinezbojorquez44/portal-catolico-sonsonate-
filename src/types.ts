export type ViewType =
  | 'home'
  | 'jesus'
  | 'trinity'
  | 'mary'
  | 'advocations'
  | 'rosary'
  | 'saints'
  | 'gospel'
  | 'ai'
  | 'quiz'
  | 'sacraments'
  | 'bible'
  | 'prayers'
  | 'diocese'
  | 'mass'
  | 'news'
  | 'pope'
  | 'intentions'
  | 'donations'
  | 'admin'
  | 'profile';

export interface GospelReading {
  date: string;
  liturgicalDay: string;
  liturgicalColor: 'blanco' | 'verde' | 'rojo' | 'morado';
  cycle: string;
  firstReadingRef: string;
  firstReadingText: string;
  psalmRef: string;
  psalmResponse: string;
  psalmText: string;
  secondReadingRef?: string;
  secondReadingText?: string;
  gospelRef: string;
  gospelText: string;
  reflection: string;
  prayer: string;
}

export interface Saint {
  id: string;
  name: string;
  feastDay: string; // MM-DD format e.g. "10-04"
  feastDayDisplay: string;
  image: string;
  category: 'Apóstoles' | 'Mártires' | 'Doctores' | 'Pastores' | 'Místicos y Religiosos' | 'Ángeles' | 'Laicos';
  countryOfOrigin: string;
  patronage: string;
  century: string;
  biography: string;
  virtues: string[];
  prayer: string;
}

export interface MarianAdvocation {
  id: string;
  name: string;
  country: string;
  feastDay: string;
  image: string;
  history: string;
  significance: string;
  devotion: string;
  prayer: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MassSchedule {
  parish: string;
  location: string;
  priest?: string;
  weekdays: string;
  saturdays: string;
  sundays: string;
  confessions?: string;
  phone?: string;
}

export interface PrayerIntention {
  id: string;
  name?: string;
  category: 'Salud' | 'Familia' | 'Difuntos' | 'Vocaciones' | 'Acción de gracias' | 'Conversión';
  intention: string;
  date: string;
  approved: boolean;
}

export interface DiocesanNews {
  id: string;
  title: string;
  date: string;
  category: 'Pastoral' | 'Semana Santa' | 'Jóvenes' | 'Celebración' | 'Caritas';
  summary: string;
  content: string;
  image?: string;
}
