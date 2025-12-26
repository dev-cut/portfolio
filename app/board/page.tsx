import { PROJECT_DESCRIPTIONS } from '@/lib/data/projectDescriptions';
import { parseProjectMarkdown } from '@/lib/utils/markdown-parser';
import BoardGrid from './BoardGrid';
import styles from './page.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Board | Portfolio',
  description: '개발 과정과 고민이 담긴 프로젝트 기록들입니다.',
};

export default function BoardPage() {
  const projects = Object.entries(PROJECT_DESCRIPTIONS).map(([id, content]) =>
    parseProjectMarkdown(id, content)
  );

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Project Log</h1>
        <p className={styles.subtitle}>
          개발 과정과 고민이 담긴 프로젝트 기록들입니다.
        </p>
      </header>

      <BoardGrid projects={projects} />
    </main>
  );
}
