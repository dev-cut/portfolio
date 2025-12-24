import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PROJECT_DESCRIPTIONS } from '@/lib/data/projectDescriptions';
import styles from './page.module.scss';
import { Metadata } from 'next';
import { parseProjectMarkdown } from '@/lib/utils/markdown-parser';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const content = PROJECT_DESCRIPTIONS[id as keyof typeof PROJECT_DESCRIPTIONS];

  if (!content) {
    return {
      title: 'Project Not Found',
    };
  }

  const { title, summary } = parseProjectMarkdown(id, content);

  return {
    title: `${title} | Project Log`,
    description: summary,
  };
}

export async function generateStaticParams() {
  return Object.keys(PROJECT_DESCRIPTIONS).map((id) => ({
    id,
  }));
}

export default async function ProjectBoardPage({ params }: PageProps) {
  const { id } = await params;
  const content = PROJECT_DESCRIPTIONS[id as keyof typeof PROJECT_DESCRIPTIONS];

  if (!content) {
    notFound();
  }

  return (
    <main className={styles.container}>
      <Link href="/board" className={styles.backLink}>
        ← Back to Board
      </Link>

      <article className={styles.content}>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </main>
  );
}
