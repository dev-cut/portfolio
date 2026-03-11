'use client';

import { m } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import LogoAnimation from './animations/LogoAnimation';
import styles from './Hero.module.scss';

// 부드러운 "스~~~~윽!" 전환을 위한 이징 & 듀레이션
const SWOOP_EASE = [0.12, 0.98, 0.22, 1] as const;
const SWOOP_DURATION = 2.2;
const TEXT_REVEAL_DELAY = 600;

export default function Hero() {
  const [phase, setPhase] = useState<'intro' | 'landing' | 'settled'>('intro');
  const settleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (settleTimerRef.current) {
        window.clearTimeout(settleTimerRef.current);
      }
    };
  }, []);

  const handleLogoComplete = () => {
    setPhase((currentPhase) => {
      if (currentPhase !== 'intro') {
        return currentPhase;
      }

      settleTimerRef.current = window.setTimeout(() => {
        setPhase('settled');
      }, TEXT_REVEAL_DELAY);

      return 'landing';
    });
  };

  const isSettled = phase === 'settled';
  const usesSettledLayout = phase !== 'intro';

  return (
    <m.section
      layout
      className={styles.hero}
      aria-labelledby="hero-title"
      transition={{
        layout: { duration: SWOOP_DURATION, ease: SWOOP_EASE },
      }}
    >
      <m.div
        className={styles.content}
        initial={false}
        animate={{
          minHeight: usesSettledLayout ? '0px' : '100svh',
        }}
        transition={{
          minHeight: { duration: SWOOP_DURATION, ease: SWOOP_EASE },
        }}
      >
        <m.div
          className={styles.logoStage}
          initial={false}
          animate={{ scale: usesSettledLayout ? 1 : 1.45 }}
          transition={{
            scale: { duration: SWOOP_DURATION, ease: SWOOP_EASE },
          }}
        >
          <div className={styles.logoWrapper}>
            <LogoAnimation onComplete={handleLogoComplete} />
          </div>
        </m.div>

        <m.div
          className={styles.textSection}
          initial={false}
          animate={{
            height: usesSettledLayout ? 'auto' : 0,
            marginTop: usesSettledLayout ? 32 : 0,
          }}
          style={{ pointerEvents: isSettled ? 'auto' : 'none' }}
          transition={{
            height: { duration: SWOOP_DURATION, ease: SWOOP_EASE },
            marginTop: { duration: SWOOP_DURATION, ease: SWOOP_EASE },
          }}
        >
          <m.div
            className={styles.textContent}
            initial={false}
            animate={{
              opacity: isSettled ? 1 : 0,
              filter: isSettled ? 'blur(0px)' : 'blur(6px)',
            }}
            transition={{
              opacity: { duration: 0.4, delay: isSettled ? 0.15 : 0 },
              filter: { duration: 0.4, delay: isSettled ? 0.15 : 0 },
            }}
          >
            <h1 id="hero-title" className={styles.mainText}>
              안녕하세요,
              <br />
              프론트엔드
              <span className={styles.name}> 개발자</span>입니다.
            </h1>
            <div className={styles.subText}>
              다양한 기술로 웹 프론트엔드를 개발합니다.
              <br />
              함께 서비스를 만들고 성장시킬 곳을 찾고 있습니다.
            </div>
          </m.div>
        </m.div>
      </m.div>
    </m.section>
  );
}
