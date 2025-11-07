import { ReactNode } from 'react';
import styles from './Section.module.scss';

interface SectionProps {
  id?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({
  id,
  title,
  children,
  className = '',
}: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      <div className={styles.content}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

