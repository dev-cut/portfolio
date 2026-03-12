'use client';

import { AnimatePresence, m } from 'framer-motion';
import { getStringHash, popoverVariants } from './utils';
import styles from '../Experience.module.scss';

interface ProjectDescription {
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
          </m.div>
        )}
      </AnimatePresence>
    </m.div>
  );
}
