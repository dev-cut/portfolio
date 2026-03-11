import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import Header from '@/components/Header';
import CoreCompetencies from '@/components/CoreCompetencies';
import Skills from '@/components/Skills';
import TrendingKeywords from '@/components/TrendingKeywords';
import { PageFlow, PageFlowItem } from '@/components/animations/PageFlow';
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
        <PageFlow>
          <Hero />
          <PageFlowItem>
            <Header />
          </PageFlowItem>

          {/* 모든 섹션을 세로로 순차 배치 */}
          <PageFlowItem>
            <CoreCompetencies />
          </PageFlowItem>
          <PageFlowItem>
            <Skills />
          </PageFlowItem>
          <PageFlowItem>
            <Experience />
          </PageFlowItem>
          <PageFlowItem>
            <Suspense
              fallback={
                <div
                  style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-tertiary)',
                    fontSize: '0.875rem',
                  }}
                >
                  실시간 트렌드 로딩 중...
                </div>
              }
            >
              <TrendingKeywords />
            </Suspense>
          </PageFlowItem>
          <PageFlowItem>
            <Footer />
          </PageFlowItem>
        </PageFlow>
      </main>
    </>
  );
}
