"use client";

import styles from './error.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles.error}>
      <div className={styles.content}>
        <h2 className={styles.title}>오류가 발생했습니다</h2>
        <p className={styles.message}>{error.message}</p>
        <button onClick={reset} className={styles.button}>
          다시 시도
        </button>
      </div>
    </div>
  );
}

