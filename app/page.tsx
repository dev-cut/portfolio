import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ResumeGrid from '@/components/ResumeGrid';
import CoreCompetencies from '@/components/CoreCompetencies';
import Philosophy from '@/components/Philosophy';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <main id="main-content" className={styles.main}>
        <Hero />
        <CoreCompetencies />
        <Philosophy />
        <Header />
        <ResumeGrid />
        <Footer />
      </main>
    </>
  );
}
