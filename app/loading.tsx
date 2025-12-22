import LoadingAnimation from '@/components/LoadingAnimation';
import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <LoadingAnimation />
    </div>
  );
}
