'use client';

import { AnimatePresence, m } from 'framer-motion';
import Link from 'next/link';
import { getStringHash, popoverVariants } from './utils';
import styles from '../Experience.module.scss';

interface ProjectDescription {
  id?: string;
  name: string;
  period: string;
  description?: string[];
}

interface ProjectPopoverProps {
  project: ProjectDescription;
  popoverKey: string;
  isPopoverOpen: boolean;
  colorOffset: number;
  onToggle: (key: string) => void;
}

export default function ProjectPopover({
  project,
  popoverKey,
  isPopoverOpen,
  colorOffset,
  onToggle,
}: ProjectPopoverProps) {
  return (
    <m.div
      className={`${styles.projectItem} ${isPopoverOpen ? styles.active : ''}`}
      layout
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      onClick={() => project.description && onToggle(popoverKey)}
    >
      <div className={styles.projectMain}>
        <div className={styles.projectNameButton}>
          <div className={styles.nameHeader}>
            <span className={styles.projectNameText}>{project.name}</span>
            {project.description && (
              <m.span
                className={styles.expandIcon}
                animate={{ rotate: isPopoverOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                +
              </m.span>
            )}
          </div>
        </div>
        <span className={styles.projectPeriod}>{project.period}</span>
      </div>

      <AnimatePresence>
        {project.description && isPopoverOpen && (
          <m.div
            className={styles.projectDetails}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            onClick={(e) => e.stopPropagation()} // 상세 내용 영역 클릭 시 닫히지 않도록 방지
          >
            <ul className={styles.projectDescription}>
              {project.description.map((desc, dIndex) => (
                <m.li
                  key={dIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: dIndex * 0.05 }}
                >
                  {desc}
                </m.li>
              ))}
            </ul>

            {project.id && (
              <m.div
                className={styles.detailLinkWrapper}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href={`/board/${project.id}`}
                  className={styles.detailLink}
                  onClick={(e) => e.stopPropagation()} // 상세 보기 링크 클릭 시 버블링 방지
                >
                  <span>자세히 보기</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </m.div>
            )}
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}
