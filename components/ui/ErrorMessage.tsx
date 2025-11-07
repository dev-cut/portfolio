import styles from './ErrorMessage.module.scss';

interface ErrorMessageProps {
  message: string;
  type?: 'error' | 'success';
}

export default function ErrorMessage({
  message,
  type = 'error',
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div
      className={`${styles.message} ${
        type === 'success' ? styles.success : styles.error
      }`}
    >
      {message}
    </div>
  );
}

