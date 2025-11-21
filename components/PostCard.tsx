import Link from 'next/link';
import { Project } from '@/types';
import { formatDate } from '@/lib/utils/date';
import { truncateText } from '@/lib/utils/string';
import styles from './PostCard.module.scss';

interface PostCardProps {
  post: Project;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className={styles.postCard}>
      <Link href={`/projects/${post.id}`} className={styles.link}>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={styles.content}>{truncateText(post.content)}</p>
        <div className={styles.meta}>
          <span className={styles.date}>{formatDate(post.created_at)}</span>
          {post.updated_at !== post.created_at && (
            <span className={styles.updated}>수정됨</span>
          )}
        </div>
      </Link>
    </article>
  );
}
