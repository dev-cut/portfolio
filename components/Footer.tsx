import styles from './Footer.module.scss';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>&copy; {CURRENT_YEAR} Portfolio. 모든 권리 보유.</p>
      </div>
    </footer>
  );
}
