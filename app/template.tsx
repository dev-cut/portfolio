import styles from './template.module.scss';

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className={styles.pageTransition}>{children}</div>;
}
