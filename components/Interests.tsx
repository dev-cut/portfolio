import { INTERESTS_DATA } from '@/lib/data/home';
import styles from './Interests.module.scss';

export default function Interests() {
  return (
    <section className={styles.interests} id="interests">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Activities Section */}
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Activities</h2>
            <div className={styles.activitiesList}>
              {INTERESTS_DATA.activities.map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <div className={styles.marker}>✦</div>
                  <div className={styles.activityContent}>
                    <span className={styles.activityYear}>{activity.year}</span>
                    <h3 className={styles.activityTitle}>{activity.title}</h3>
                    <p className={styles.activityDesc}>
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Language Section */}
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Language</h2>
            <div className={styles.languageList}>
              {INTERESTS_DATA.languages.map((lang, index) => (
                <div key={index} className={styles.languageItem}>
                  <h3 className={styles.langName}>{lang.name}</h3>
                  <span className={styles.langLevel}>{lang.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Hobbies Section */}
          <div className={styles.column}>
            <h2 className={styles.sectionTitle}>Hobbies & Interests</h2>
            <div className={styles.hobbiesGrid}>
              {INTERESTS_DATA.hobbies.map((hobby, index) => (
                <div key={index} className={styles.hobbyItem}>
                  <div className={styles.iconWrapper}>{hobby.icon}</div>
                  <span className={styles.hobbyName}>
                    {hobby.name}
                    <br />
                    <span style={{ fontSize: '0.8em', opacity: 0.8 }}>
                      {hobby.description}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
