import Link from 'next/link';
import { cn } from '@/lib/utils/classNames';
import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.badgeText}>프론트엔드 개발자</span>
        </div>
        <h1 className={styles.title}>
          안녕하세요,{' '}
          <span className={styles.titleHighlight}>개발자</span>입니다
        </h1>
        <p className={styles.description}>
          사용자 경험을 중시하며, 현대적인 웹 기술로 의미있는 프로덕트를 만드는
          것을 좋아합니다.
        </p>
        <div className={styles.actions}>
          <Link href="#projects" className={cn(styles.button, styles.primary)}>
            프로젝트 보기
          </Link>
          <Link href="#contact" className={cn(styles.button, styles.secondary)}>
            연락하기
          </Link>
        </div>
      </div>
    </section>
  );
}
