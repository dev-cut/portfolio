'use client';

import {
  EXPERIENCE_LABELS,
  type TeamMember,
  type ExperienceLevel,
} from '@/lib/team-roles';
import styles from './TeamCompositionField.module.scss';

interface TeamCompositionFieldProps {
  teamMembers: TeamMember[];
  onChange: (members: TeamMember[]) => void;
}

export default function TeamCompositionField({
  teamMembers,
  onChange,
}: TeamCompositionFieldProps) {
  const handleTeamMemberCountChange = (
    level: ExperienceLevel,
    count: number
  ) => {
    if (count < 0) return;

    let newMembers: TeamMember[];
    if (count === 0) {
      newMembers = teamMembers.filter((m) => m.level !== level);
    } else {
      const existingIndex = teamMembers.findIndex((m) => m.level === level);
      if (existingIndex >= 0) {
        newMembers = teamMembers.map((m, idx) =>
          idx === existingIndex ? { ...m, count } : m
        );
      } else {
        newMembers = [...teamMembers, { level, count }];
      }
    }
    onChange(newMembers);
  };

  return (
    <div>
      <label className={styles.label}>팀 구성</label>
      <div className={styles.teamRoleContainer}>
        {(Object.keys(EXPERIENCE_LABELS) as ExperienceLevel[]).map((level) => {
          const member = teamMembers.find((m) => m.level === level);
          const count = member?.count || 0;

          return (
            <div key={level} className={styles.teamRoleItem}>
              <label className={styles.levelLabel}>
                {EXPERIENCE_LABELS[level]}
              </label>
              <div className={styles.countInputWrapper}>
                <input
                  type="number"
                  min="0"
                  max="99"
                  value={count === 0 ? '' : count}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '') {
                      handleTeamMemberCountChange(level, 0);
                    } else {
                      const numValue = parseInt(value, 10);
                      if (!isNaN(numValue) && numValue >= 0) {
                        handleTeamMemberCountChange(level, numValue);
                      }
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === '') {
                      handleTeamMemberCountChange(level, 0);
                    }
                  }}
                  onFocus={(e) => {
                    e.target.select();
                  }}
                  className={styles.countInput}
                  placeholder="0"
                />
                <span className={styles.countLabel}>명</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className={styles.helpText}>
        {(() => {
          const total = teamMembers.reduce((sum, m) => sum + m.count, 0);
          return total > 0 ? `총 ${total}명` : '';
        })()}
      </p>
    </div>
  );
}
