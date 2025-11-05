import styles from './Footer.module.scss';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <p>&copy; {currentYear} Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
