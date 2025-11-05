import { skills } from '@/lib/data';
import styles from './Skills.module.scss';

export default function Skills() {
  const skillCategories = {
    frontend: skills.filter((s) => s.category === 'frontend'),
    tools: skills.filter((s) => s.category === 'tools'),
  };

  const levelClasses = {
    expert: styles.expert,
    advanced: styles.advanced,
    intermediate: styles.intermediate,
    beginner: styles.beginner,
  };

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.content}>
        <h2 className={styles.title}>Skills</h2>
        <div className={styles.grid}>
          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Frontend</h3>
            <div className={styles.skillList}>
              {skillCategories.frontend.map((skill) => (
                <div key={skill.name} className={styles.skillItem}>
                  <div className={styles.skillHeader}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillLevel}>{skill.level}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={`${styles.progressFill} ${
                        levelClasses[skill.level]
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.category}>
            <h3 className={styles.categoryTitle}>Tools & Others</h3>
            <div className={styles.skillList}>
              {skillCategories.tools.map((skill) => (
                <div key={skill.name} className={styles.skillItem}>
                  <div className={styles.skillHeader}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillLevel}>{skill.level}</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={`${styles.progressFill} ${
                        levelClasses[skill.level]
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
