'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils/classNames';
import { throttle } from '@/lib/utils/throttle';
import styles from './Header.module.scss';

const SCROLL_THRESHOLD = 50;
const SCROLL_THROTTLE_MS = 100;

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    }, SCROLL_THROTTLE_MS);

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        styles.header,
        isScrolled ? styles.scrolled : styles.transparent
      )}
    >
      <nav
        className={styles.nav}
        role="navigation"
        aria-label="주요 내비게이션"
      >
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            HR
          </Link>
        </div>
      </nav>
    </header>
  );
}
