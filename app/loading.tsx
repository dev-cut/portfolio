import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.content}>
        <p className={styles.text}>로딩 중...</p>
      </div>
    </div>
  );
}

