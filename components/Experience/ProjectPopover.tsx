'use client';

import { AnimatePresence, motion } from 'framer-motion';
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
    <motion.div
      className={styles.projectItem}
      layout
      style={{
        zIndex: isPopoverOpen ? 200 : 1,
        position: 'relative',
      }}
    >
      <div className={styles.detailWrapper}>
        <motion.button
          className={`${styles.projectNameButton} ${
            isPopoverOpen ? styles.active : ''
          }`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle(popoverKey);
          }}
          aria-expanded={isPopoverOpen}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          {project.name}
          {project.description && (
            <motion.span
              className={`${styles.hasDetailIndicator} ${
                styles[
                  `indicatorColor${
                    (getStringHash(project.name, colorOffset) % 3) + 1
                  }`
                ]
              }`}
              animate={{ scale: isPopoverOpen ? 1.4 : 1 }}
            />
          )}
        </motion.button>
        <AnimatePresence mode="wait">
          {project.description && isPopoverOpen && (
            <motion.div
              className={styles.descriptionPopover}
              variants={popoverVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className={styles.projectDescription}>
                {project.description.map((desc, dIndex) => (
                  <motion.li
                    key={dIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: dIndex * 0.05 }}
                  >
                    {desc}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <span className={styles.projectPeriod}>{project.period}</span>
    </motion.div>
  );
}
