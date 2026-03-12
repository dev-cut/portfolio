'use client';

import { m } from 'framer-motion';
import { EXPERIENCE_DATA } from '@/lib/data/resume';
import { calculateDuration } from '@/lib/utils/date';
import styles from '../Experience.module.scss';

interface ExperienceItemProps {
  item: (typeof EXPERIENCE_DATA)[0];
}

export default function ExperienceItem({
  item,
}: ExperienceItemProps) {
  return (
    <div className={styles.content}>
      <h3 className={styles.itemTitle}>{item.title}</h3>
      <div className={styles.infoWrapper}>
        <p className={styles.subtitle}>{item.subtitle}</p>
        <span className={styles.period}>
          {item.period}
          <span className={styles.duration}>
            · {calculateDuration(item.period)}
          </span>
        </span>
      </div>

      {/* 업무 요약 (Summary) 추가 */}
      {item.summary && (
        <ul className={styles.summaryList}>
          {item.summary.map((desc, sIdx) => (
            <li key={sIdx} className={styles.summaryItem}>
              {desc}
            </li>
          ))}
        </ul>
      )}

      {/* 프로젝트 리스트 렌더링 - Career 탭에서는 요약 위주로 보여주기 위해 제거하거나 최소화 가능 */}
      {/* 현재는 프로젝트 탭이 별도로 존재하므로 Career 탭에서는 상세 프로젝트 리스트를 노출하지 않음 */}
    </div>
  );
}
