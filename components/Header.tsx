'use client';

import Link from 'next/link';
import styles from './Header.module.scss';

const NAV_ITEMS = [
  { label: '기술', href: '#skills' },
  { label: '경력', href: '#experience' },
  { label: '프로젝트', href: '#projects' },
  { label: '블로그', href: '#blog' },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <nav
        className={styles.nav}
        role="navigation"
        aria-label="주요 내비게이션"
      >
        {/* 컬러 점 (로고 역할) */}
        <div className={styles.dots}>
          <span className={styles.dotBlue} />
          <span className={styles.dotGreen} />
          <span className={styles.dotYellow} />
        </div>

        {/* 네비게이션 링크 */}
        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
