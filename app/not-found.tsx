import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h2 className={styles.title}>404</h2>
        <p className={styles.message}>페이지를 찾을 수 없습니다.</p>
      </div>
    </div>
  );
}
