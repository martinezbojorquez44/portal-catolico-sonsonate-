import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { PRIMARY_ADMIN_EMAIL } from '../config/admin';

export interface UserProfileData {
  userId: string;
  displayName: string;
  email: string;
  role?: 'user' | 'admin';
  parish?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SavedUserIntention {
  id: string;
  name: string;
  category: string;
  intention: string;
  date: string;
  createdAt: string;
}

export interface UserQuizStats {
  quizzesTaken: number;
  highestScore: number;
  lastScore: number;
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  lastQuizDate?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfileData | null;
  loading: boolean;
  isAdmin: boolean;
  adminLoading: boolean;
  intentions: SavedUserIntention[];
  quizStats: UserQuizStats | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (email: string, pass: string, name: string, parish?: string) => Promise<void>;
  signInWithGoogle: () => Promise<User>;
  logout: () => Promise<void>;
  updateUserParish: (parish: string) => Promise<void>;
  saveIntention: (name: string, category: string, intention: string) => Promise<void>;
  deleteIntention: (id: string) => Promise<void>;
  saveQuizResult: (score: number, totalQuestions: number) => Promise<void>;
  verifyAdminAccess: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  const [intentions, setIntentions] = useState<SavedUserIntention[]>([]);
  const [quizStats, setQuizStats] = useState<UserQuizStats | null>(null);

  const checkAndSyncAdmin = async (currentUser: User): Promise<boolean> => {
    setAdminLoading(true);
    try {
      const userEmail = (currentUser.email || '').toLowerCase().trim();
      const primaryEmail = PRIMARY_ADMIN_EMAIL.toLowerCase().trim();
      const adminDocRef = doc(db, 'admins', currentUser.uid);

      let isAuthorized = false;

      // 1. If user matches configured primary admin email, bootstrap or verify in Firestore
      if (userEmail === primaryEmail) {
        try {
          const adminSnap = await getDoc(adminDocRef);
          if (!adminSnap.exists()) {
            await setDoc(adminDocRef, {
              userId: currentUser.uid,
              email: currentUser.email,
              role: 'admin',
              grantedAt: new Date().toISOString()
            });
          }
          isAuthorized = true;
        } catch (err) {
          console.warn('Could not write admin record directly:', err);
          // If already admin in security rules
          isAuthorized = true;
        }
      } else {
        // 2. Query Firestore /admins/{userId} document (only exists if explicitly granted)
        try {
          const adminSnap = await getDoc(adminDocRef);
          if (adminSnap.exists() && adminSnap.data()?.role === 'admin') {
            isAuthorized = true;
          }
        } catch (err) {
          // If security rules reject read, user is definitely NOT an admin
          isAuthorized = false;
        }
      }

      setIsAdmin(isAuthorized);
      setAdminLoading(false);
      return isAuthorized;
    } catch (e) {
      console.error('Error verifying admin authorization:', e);
      setIsAdmin(false);
      setAdminLoading(false);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check admin authorization via Firestore & rules
        await checkAndSyncAdmin(currentUser);

        // Fetch or create profile doc
        try {
          const profileRef = doc(db, 'users', currentUser.uid);
          const snap = await getDoc(profileRef);
          if (snap.exists()) {
            setProfile(snap.data() as UserProfileData);
          } else {
            const initialProfile: UserProfileData = {
              userId: currentUser.uid,
              displayName: currentUser.displayName || 'Fiel Católico',
              email: currentUser.email || '',
              role: (currentUser.email || '').toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase() ? 'admin' : 'user',
              parish: 'Catedral de la Santísima Trinidad de Sonsonate',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            };
            await setDoc(profileRef, initialProfile);
            setProfile(initialProfile);
          }
        } catch (e) {
          console.error('Error fetching user profile:', e);
        }

        // Subscribe to user prayer intentions
        try {
          const intentionsRef = collection(db, 'users', currentUser.uid, 'intentions');
          const q = query(intentionsRef, orderBy('createdAt', 'desc'));
          const unsubIntentions = onSnapshot(q, (snapshot) => {
            const list: SavedUserIntention[] = [];
            snapshot.forEach((d) => {
              list.push({ id: d.id, ...d.data() } as SavedUserIntention);
            });
            setIntentions(list);
          });

          // Subscribe to user quiz progress
          const quizDocRef = doc(db, 'users', currentUser.uid, 'quizProgress', 'stats');
          const unsubQuiz = onSnapshot(quizDocRef, (docSnap) => {
            if (docSnap.exists()) {
              setQuizStats(docSnap.data() as UserQuizStats);
            } else {
              setQuizStats({
                quizzesTaken: 0,
                highestScore: 0,
                lastScore: 0,
                totalQuestionsAnswered: 0,
                totalCorrectAnswers: 0
              });
            }
          });

          setLoading(false);
          return () => {
            unsubIntentions();
            unsubQuiz();
          };
        } catch (err) {
          console.error('Error attaching listeners:', err);
          setLoading(false);
        }
      } else {
        setProfile(null);
        setIsAdmin(false);
        setAdminLoading(false);
        setIntentions([]);
        setQuizStats(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signup = async (email: string, pass: string, name: string, parish?: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, pass);
    await updateProfile(cred.user, { displayName: name });
    const isPrimaryAdmin = email.toLowerCase().trim() === PRIMARY_ADMIN_EMAIL.toLowerCase().trim();
    const profileData: UserProfileData = {
      userId: cred.user.uid,
      displayName: name,
      email,
      role: isPrimaryAdmin ? 'admin' : 'user',
      parish: parish || 'Catedral de la Santísima Trinidad de Sonsonate',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await setDoc(doc(db, 'users', cred.user.uid), profileData);
    setProfile(profileData);
  };

  const signInWithGoogle = async (): Promise<User> => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const result = await signInWithPopup(auth, provider);
    await checkAndSyncAdmin(result.user);
    return result.user;
  };

  const logout = async () => {
    setIsAdmin(false);
    await signOut(auth);
  };

  const updateUserParish = async (parish: string) => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid);
    await updateDoc(ref, { parish, updatedAt: new Date().toISOString() });
    setProfile((prev) => (prev ? { ...prev, parish } : null));
  };

  const saveIntention = async (name: string, category: string, intention: string) => {
    if (!user) return;
    const colRef = collection(db, 'users', user.uid, 'intentions');
    await addDoc(colRef, {
      userId: user.uid,
      name: name || user.displayName || 'Fiel devoto',
      category,
      intention,
      date: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
      createdAt: new Date().toISOString()
    });
  };

  const deleteIntention = async (id: string) => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'intentions', id);
    await deleteDoc(ref);
  };

  const saveQuizResult = async (score: number, totalQuestions: number) => {
    if (!user) return;
    const ref = doc(db, 'users', user.uid, 'quizProgress', 'stats');
    const prev = quizStats || {
      quizzesTaken: 0,
      highestScore: 0,
      lastScore: 0,
      totalQuestionsAnswered: 0,
      totalCorrectAnswers: 0
    };

    const updated: UserQuizStats = {
      quizzesTaken: prev.quizzesTaken + 1,
      highestScore: Math.max(prev.highestScore, score),
      lastScore: score,
      totalQuestionsAnswered: prev.totalQuestionsAnswered + totalQuestions,
      totalCorrectAnswers: prev.totalCorrectAnswers + score,
      lastQuizDate: new Date().toISOString()
    };

    await setDoc(ref, updated);
    setQuizStats(updated);
  };

  const verifyAdminAccess = async (): Promise<boolean> => {
    if (!user) return false;
    return await checkAndSyncAdmin(user);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAdmin,
        adminLoading,
        intentions,
        quizStats,
        login,
        signup,
        signInWithGoogle,
        logout,
        updateUserParish,
        saveIntention,
        deleteIntention,
        saveQuizResult,
        verifyAdminAccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
