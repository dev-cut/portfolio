'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// 기본값을 제공하여 Provider 밖에서도 사용 가능하도록 함
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return;
    
    try {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
        if (savedTheme === 'dark') {
          document.documentElement.classList.add('dark');
        }
        return;
      }
      
      // 시스템 설정 확인
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      // localStorage 접근 실패 시 기본값 유지
    }
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
    // 테마 변경 시 HTML 클래스 업데이트
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // 로컬 스토리지에 저장
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // localStorage 저장 실패 무시
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // ThemeProvider는 항상 Provider를 렌더링해야 함
  // 서버 사이드에서도 기본값을 사용할 수 있도록 보장
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  // 기본값이 제공되었으므로 context는 항상 정의되어 있음
  // 하지만 타입 안전성을 위해 기본값 반환
  if (!context) {
    return { theme: 'light' as Theme, toggleTheme: () => {} };
  }
  return context;
}