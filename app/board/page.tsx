import Link from 'next/link';
import { PROJECT_DESCRIPTIONS } from '@/lib/data/projectDescriptions';
import { parseProjectMarkdown } from '@/lib/utils/markdown-parser';
import styles from './page.module.scss';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Project Board | Portfolio',
  description: 'Detailed logs of my development projects.',
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

      <div className={styles.grid}>
        {projects.map((project) => (
          <Link
            key={project.id}
            href={`/board/${project.id}`}
            className={styles.card}
          >
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>{project.title}</h2>
              <span className={styles.period}>{project.period}</span>
            </div>
            <p className={styles.summary}>{project.summary}</p>
            <div className={styles.techStack}>
              {project.techStack.slice(0, 4).map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className={styles.tag}>
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
