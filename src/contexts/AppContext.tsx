import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, translations, Translations } from '@/i18n/translations';

type Theme = 'light' | 'dark' | 'system';

interface UserProfile {
  age: number;
  selectedSymptoms: string[];
  customSymptoms: string;
}

interface HistoryItem {
  id: string;
  timestamp: Date;
  ingredients: string[];
  healthScore: number;
  symptoms: string[];
  summary: string;
}

interface AppContextType {
  // Language
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  
  // User
  isGuest: boolean;
  setIsGuest: (isGuest: boolean) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  
  // History
  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('nutriguardian-language');
    return (saved as Language) || 'en';
  });
  
  const [theme, setThemeState] = useState<Theme>(() => {
    const saved = localStorage.getItem('nutriguardian-theme');
    return (saved as Theme) || 'system';
  });
  
  const [isGuest, setIsGuest] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    const saved = localStorage.getItem('nutriguardian-history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
      } catch {
        return [];
      }
    }
    return [];
  });

  // Apply theme
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    localStorage.setItem('nutriguardian-theme', theme);
  }, [theme]);

  // Save language
  useEffect(() => {
    localStorage.setItem('nutriguardian-language', language);
  }, [language]);

  // Save history for guests
  useEffect(() => {
    if (isGuest) {
      localStorage.setItem('nutriguardian-history', JSON.stringify(history));
    }
  }, [history, isGuest]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  const addToHistory = (item: Omit<HistoryItem, 'id' | 'timestamp'>) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setHistory(prev => [newItem, ...prev].slice(0, 50)); // Keep last 50
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        theme,
        setTheme,
        isGuest,
        setIsGuest,
        userProfile,
        setUserProfile,
        history,
        addToHistory,
        clearHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
