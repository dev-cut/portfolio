'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useAuth } from './AuthProvider';
import Link from 'next/link';
import { cn } from '@/lib/utils/classNames';
import { throttle } from '@/lib/utils/throttle';
import styles from './Header.module.scss';

// AuthModal은 모달이므로 필요할 때만 로드 (동적 import)
const AuthModal = dynamic(() => import('./AuthModal'), {
  ssr: false, // 모달은 SSR 불필요
});



const SCROLL_THRESHOLD = 50;
const SCROLL_THROTTLE_MS = 100;

type AuthModalTab = 'login' | 'signup';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<AuthModalTab>('login');

  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }, SCROLL_THROTTLE_MS);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);





  const handleOpenAuthModal = (tab: AuthModalTab = 'login') => {
    setAuthModalTab(tab);
    setAuthModalOpen(true);
  };





  const renderAuthSection = (isMobile = false) => {
    if (user) {
      if (isMobile) {
        return (
          <>
            <span className={styles.mobileUserEmail}>
              {user.email}
            </span>
            <button onClick={signOut} className={styles.authButton}>
              로그아웃
            </button>
          </>
        );
      }
      return (
        <div className={styles.userProfile}>
          <span className={styles.userEmail}>{user.email}</span>
          <button onClick={signOut} className={styles.logoutButton}>
            로그아웃
          </button>
        </div>
      );
    }
    
    if (isMobile) {
      return null; // Remove mobile menu entirely
    }
    
    return (
      <button
        onClick={() => handleOpenAuthModal('login')}
        className={styles.authIconButton}
        aria-label="로그인"
      >
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>
    );
  };

  return (
    <>
      <header
        className={cn(
          styles.header,
          isScrolled ? styles.scrolled : styles.transparent
        )}
      >
        <nav className={styles.nav} role="navigation" aria-label="주요 내비게이션">
          <div className={styles.navContent}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>✦</span> JO HYUKRAE
            </Link>
            <div className={styles.actions}>
              {renderAuthSection(false)}
            </div>
          </div>
        </nav>
      </header>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialTab={authModalTab}
      />
    </>
  );
}
