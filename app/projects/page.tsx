import { Suspense } from 'react';
import type { Metadata } from 'next';
import { PROJECTS } from '@/lib/data/projects';
import PostCard from '@/components/PostCard';
import styles from './projects.module.scss';
import Loading from '@/app/loading';

export const metadata: Metadata = {
  title: 'Portfolio | Portfolio',
  description: '프로젝트와 개발 경험을 공유하는 포트폴리오입니다.',
  openGraph: {
    title: 'Portfolio | Portfolio',
    description: '프로젝트와 개발 경험을 공유하는 포트폴리오입니다.',
    type: 'website',
  },
};

export const revalidate = 60;

function PostList() {
  const posts = PROJECTS;

  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h2 className={styles.emptyTitle}>아직 등록된 프로젝트가 없습니다</h2>
        <p className={styles.emptyDescription}>
          첫 번째 프로젝트를 등록해보세요!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default function BoardPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Portfolio</h1>
      </div>
      <Suspense fallback={<Loading />}>
        <PostList />
      </Suspense>
    </div>
  );
}
