import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import CoreCompetencies from '@/components/CoreCompetencies';
import Skills from '@/components/Skills';
import styles from './page.module.scss';

// 하단 섹션들만 dynamic import 유지
const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: true, // SEO 유지
  loading: () => (
    <div
      style={{
        height: '600px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: '24px',
      }}
    />
  ),
});
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <>
      <main id="main-content" className={styles.main}>
        <Hero />
        <Header />

        {/* 모든 섹션을 세로로 순차 배치 */}
        <CoreCompetencies />
        <Skills />
        <Experience />

        <Footer />
      </main>
    </>
  );
}
