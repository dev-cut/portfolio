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
    >
      <div className={styles.projectMain}>
        <m.button
          className={styles.projectNameButton}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(popoverKey);
          }}
          aria-expanded={isPopoverOpen}
        >
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
        </m.button>
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
                <Link href={`/board/${project.id}`} className={styles.detailLink}>
                  <span>자세히 보기?</span>
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
