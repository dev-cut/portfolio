import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ResumeGrid from '@/components/ResumeGrid';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <Hero />
        <Header />
        <ResumeGrid />
      </main>
    </>
  );
}
