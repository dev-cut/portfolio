import styles from './loading.module.scss';

export default function Loading() {
    return (
        <main className={styles.container}>
            <div className={`${styles.skeleton} ${styles.backLink}`} />

            <div className={styles.content}>
                <div className={`${styles.skeleton} ${styles.title}`} />

                {[1, 2, 3].map((i) => (
                    <div key={i} className={styles.section}>
                        <div className={`${styles.skeleton} ${styles.subtitle}`} />
                        <div className={`${styles.skeleton} ${styles.text}`} />
                        <div className={`${styles.skeleton} ${styles.text}`} />
                        <div className={`${styles.skeleton} ${styles.text}`} />
                    </div>
                ))}
            </div>
        </main>
    );
}
