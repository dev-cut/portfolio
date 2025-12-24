import Footer from '@/components/Footer';

import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import CoreCompetencies from '@/components/CoreCompetencies';
import Skills from '@/components/Skills';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <main id="main-content" className={styles.main}>
        <Hero />

        {/* 모든 섹션을 세로로 순차 배치 */}
        <CoreCompetencies />
        <Skills />
        <Experience />

        <Footer />
      </main>
    </>
  );
}
