import { useMemo } from 'react';
import { skills } from '@/lib/data';
import SkillItem from './SkillItem';
import Section from './ui/Section';
import styles from './Skills.module.scss';

export default function Skills() {
  const skillCategories = useMemo(
    () => ({
      frontend: skills.filter((s) => s.category === 'frontend'),
      tools: skills.filter((s) => s.category === 'tools'),
    }),
    []
  );

  return (
    <Section id="skills" title="Skills" className={styles.skills}>
      <div className={styles.grid}>
        <div className={styles.category}>
          <h3 className={styles.categoryTitle}>Frontend</h3>
          <div className={styles.skillList}>
            {skillCategories.frontend.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
        <div className={styles.category}>
          <h3 className={styles.categoryTitle}>Tools & Others</h3>
          <div className={styles.skillList}>
            {skillCategories.tools.map((skill) => (
              <SkillItem key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
