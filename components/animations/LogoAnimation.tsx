'use client';

import { motion, useAnimate } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './LogoAnimation.module.scss';

interface LogoAnimationProps {
  className?: string;
}

const dropSpring = {
  duration: 0.5,
  type: 'spring',
  damping: 7,
  bounce: 0.25,
} as const;

const slideSpring = {
  duration: 0.5,
  ease: 'easeInOut' as const,
  type: 'spring',
} as const;

const hoverSpring = {
  duration: 0.1,
  type: 'spring',
  damping: 7,
  bounce: 0.25,
} as const;

export default function LogoAnimation({ className = '' }: LogoAnimationProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      await animate([
        ['.logoSvg.blue', { y: -10 }, { ...dropSpring, at: 0.5 }],
        ['.logoSvg.green', { y: -10 }, { ...dropSpring, at: 0.6 }],
        ['.logoSvg.yellow', { y: -10 }, { ...dropSpring, at: 0.7 }],

        ['.logoSvg', { x: 0 }, { ...slideSpring, at: 2 }],

        [
          '.bluePath',
          { pathLength: 1 },
          { at: 3, duration: 1, ease: 'easeOut', type: 'spring' as const },
        ],

        [
          '.greenTop',
          { y: 0 },
          { at: 4, duration: 0.5, ease: 'easeOut', type: 'spring' as const },
        ],
        [
          '.greenTop',
          { pathLength: 1 },
          { at: 4, duration: 1, ease: 'easeInOut', type: 'spring' as const },
        ],
        [
          '.greenBottom',
          { pathLength: 1 },
          { at: 4.7, duration: 1, ease: 'easeInOut', type: 'spring' as const },
        ],

        [
          '.yellowRing',
          { x: 0 },
          { at: 5.6, duration: 0.5, ease: 'easeOut', type: 'spring' as const },
        ],
        [
          '.yellowRing',
          { pathLength: 1 },
          { at: 5.6, duration: 1, ease: 'easeOut', type: 'spring' as const },
        ],
        [
          '.yellowMouth',
          { scale: 1 },
          { at: 6.4, duration: 0.5, ease: 'easeOut', type: 'spring' as const },
        ],
      ]);

      if (mounted) setIsInteractive(true);
    };

    run();

    return () => {
      mounted = false;
    };
  }, [animate]);

  return (
    <div ref={scope} className={`${styles.container} ${className}`}>
      <motion.div
        className={styles.logoItem}
        style={{ zIndex: 3 }}
        {...(isInteractive
          ? {
              whileHover: { y: -30 },
              whileTap: { scale: 0.9 },
              transition: hoverSpring,
            }
          : {})}
      >
        <motion.svg
          className={`${styles.logo} logoSvg blue`}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ x: 250, y: 300 }}
        >
          <motion.path
            className="bluePath"
            d="M 50 140.5 L 100 64 L 150 140.5"
            stroke="#007AFF"
            strokeWidth="72"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={0}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className={styles.logoItem}
        style={{ zIndex: 2 }}
        {...(isInteractive
          ? {
              whileHover: { y: -30 },
              whileTap: { scale: 0.9 },
              transition: hoverSpring,
            }
          : {})}
      >
        <motion.svg
          className={`${styles.logo} logoSvg green`}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          style={{ x: 50, y: 300 }}
        >
          <motion.path
            className="greenTop"
            d="M50 57H150"
            stroke="#00C676"
            strokeWidth="72"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={0}
            style={{ y: 86 }}
          />
          <motion.path
            className="greenBottom"
            d="M50 143L100 93L150 143"
            stroke="#00C676"
            strokeWidth="72"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={0}
          />
        </motion.svg>
      </motion.div>

      <motion.div
        className={styles.logoItem}
        style={{ zIndex: 1 }}
        {...(isInteractive
          ? {
              whileHover: { y: -30 },
              whileTap: { scale: 0.9 },
              transition: hoverSpring,
            }
          : {})}
      >
        <motion.svg
          className={`${styles.logo} logoSvg yellow`}
          width="200"
          height="200"
          viewBox="0 0 200 200"
          fill="none"
          style={{ x: -150, y: 300 }}
        >
          <motion.path
            className="yellowRing"
            d="M100 144C75.6995 144 56 124.301 56 100C56 75.6995 75.6995 56 100 56C124.301 56 144 75.6995 144 100C144 124.301 124.301 144 100 144Z"
            stroke="#E2FF00"
            strokeWidth="72"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={0}
            style={{ x: -50 }}
          />
          <motion.path
            className="yellowMouth"
            d="M86 143C86 162.882 69.8823 179 50 179C30.1177 179 14 162.882 14 143C14 123.118 30.1177 107 50 107C69.8823 107 86 123.118 86 143Z"
            fill="var(--bg-color, #2d4338)"
            style={{ transformOrigin: '50px 143px', scale: 0 }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}
