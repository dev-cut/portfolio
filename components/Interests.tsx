import { INTERESTS_DATA } from '@/lib/data/home';
import FadeIn from './animations/FadeIn';
import StaggerContainer, { StaggerItem } from './animations/StaggerContainer';
import styles from './Interests.module.scss';

export default function Interests() {
  return (
    <section className={styles.interests} id="interests">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Column: Activities */}
          <div className={styles.leftColumn}>
            <FadeIn direction="up">
              <h2 className={styles.sectionTitle}>Activities</h2>
            </FadeIn>
            <StaggerContainer className={styles.activitiesList} delay={0.2}>
              {INTERESTS_DATA.activities.map((activity, index) => (
                <StaggerItem key={index} className={styles.activityItem}>
                  <div className={styles.marker}>✦</div>
                  <div className={styles.activityContent}>
                    <span className={styles.activityYear}>{activity.year}</span>
                    <h3 className={styles.activityTitle}>{activity.title}</h3>
                    <p className={styles.activityDesc}>
                      {activity.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right Column: Language & Hobbies */}
          <div className={styles.rightColumn}>
            {/* Language Section */}
            <div className={styles.sectionWrapper}>
              <FadeIn direction="up" delay={0.2}>
                <h2 className={styles.sectionTitle}>Language</h2>
              </FadeIn>
              <StaggerContainer className={styles.languageList} delay={0.4}>
                {INTERESTS_DATA.languages.map((lang, index) => (
                  <StaggerItem key={index} className={styles.languageItem}>
                    <h3 className={styles.langName}>{lang.name}</h3>
                    <span className={styles.langLevel}>{lang.level}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            {/* Hobbies Section */}
            <div className={styles.sectionWrapper}>
              <FadeIn direction="up" delay={0.4}>
                <h2 className={styles.sectionTitle}>Hobbies & Interests</h2>
              </FadeIn>
              <StaggerContainer className={styles.hobbiesGrid} delay={0.6}>
                {INTERESTS_DATA.hobbies.map((hobby, index) => (
                  <StaggerItem key={index} className={styles.hobbyItem}>
                    <div className={styles.iconWrapper}>{hobby.icon}</div>
                    <span className={styles.hobbyName}>
                      {hobby.name}
                      <br />
                      <span style={{ fontSize: '0.8em', opacity: 0.8 }}>
                        {hobby.description}
                      </span>
                    </span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
