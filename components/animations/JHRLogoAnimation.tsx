'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants, useReducedMotion } from 'framer-motion';
import styles from './JHRLogoAnimation.module.scss';

// ============================================
// 타입 정의
// ============================================
interface JHRLogoAnimationProps {
  /** 로고 크기 */
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  /** 아이콘(심볼) 표시 여부 */
  showIcon?: boolean;
  /** 워드마크(텍스트) 표시 여부 */
  showWordmark?: boolean;
  /** 클릭 시 이동할 링크 */
  href?: string;
  /** 추가 클래스명 */
  className?: string;
}

// ============================================
// 애니메이션 Variants 정의
// Framer Motion의 물리 기반 애니메이션 활용
// ============================================

// 컨테이너 애니메이션: 전체 로고의 등장과 호버 효과
const containerVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom ease-out (smooth feel)
      staggerChildren: 0.1, // 자식 요소들이 순차적으로 나타남
    },
  },
  hover: {
    scale: 1.03,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
    },
  },
};

// SVG 경로 애니메이션: 선이 그려지는 효과 (Draw Animation)
const pathVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        duration: 1.5,
        ease: 'easeInOut',
      },
      opacity: {
        duration: 0.3,
      },
    },
  },
};

// 채우기 애니메이션: 로고 내부 채우기 효과
const fillVariants: Variants = {
  hidden: { fillOpacity: 0 },
  visible: {
    fillOpacity: 1,
    transition: {
      delay: 1.2,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

// 스파클/별 애니메이션: 반짝이는 효과
const sparkleVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: [0, 1.2, 1],
    opacity: [0, 1, 0.8],
    transition: {
      delay: 1.8,
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  pulse: {
    scale: [1, 1.3, 1],
    opacity: [0.8, 1, 0.8],
    transition: {
      repeat: Infinity,
      repeatType: 'loop',
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

// 워드마크 애니메이션
const wordmarkVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.3,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ============================================
// JHR 로고 SVG 심볼
// J, H, R을 추상화한 기하학적 디자인
// ============================================
const JHRLogoSymbol: React.FC<{ reducedMotion: boolean }> = ({
  reducedMotion,
}) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* 배경 원 (글로우 효과용) */}
      <motion.circle
        cx="24"
        cy="24"
        r="22"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeOpacity="0.3"
        variants={reducedMotion ? undefined : pathVariants}
      />

      {/* J - 왼쪽 수직선 + 하단 곡선 */}
      <motion.path
        d="M16 12 L16 32 Q16 38 22 38"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={reducedMotion ? undefined : pathVariants}
      />

      {/* H - 중앙 연결선 */}
      <motion.path
        d="M16 24 L32 24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={reducedMotion ? undefined : pathVariants}
      />

      {/* R - 오른쪽 수직선 + 상단 곡선 + 대각선 */}
      <motion.path
        d="M32 38 L32 12 Q32 12 32 12 L26 12 Q20 12 20 18 Q20 24 26 24 L32 24 L38 36"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        variants={reducedMotion ? undefined : pathVariants}
      />

      {/* 장식용 점 (브랜드 악센트) */}
      <motion.circle
        cx="38"
        cy="12"
        r="3"
        fill="currentColor"
        variants={
          reducedMotion
            ? undefined
            : {
                hidden: { scale: 0, opacity: 0 },
                visible: {
                  scale: 1,
                  opacity: 1,
                  transition: { delay: 1.6, duration: 0.4 },
                },
              }
        }
        style={{ color: '#ffb400' }} // accent-color
      />
    </svg>
  );
};

// ============================================
// 메인 컴포넌트
// ============================================
const JHRLogoAnimation: React.FC<JHRLogoAnimationProps> = ({
  size = 'l',
  showIcon = true,
  showWordmark = true,
  href = '/',
  className = '',
}) => {
  // 접근성: 시스템의 "동작 줄이기" 설정 감지
  const shouldReduceMotion = useReducedMotion();

  // 사이즈 클래스 매핑
  const sizeClassMap: Record<string, string> = {
    xs: styles.sizeXs,
    s: styles.sizeS,
    m: styles.sizeM,
    l: styles.sizeL,
    xl: styles.sizeXl,
  };

  // 동작 감소 모드 시 즉시 표시되는 variants
  const accessibleContainerVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
        hover: { scale: 1 },
        tap: { scale: 1 },
      }
    : containerVariants;

  // 로고 콘텐츠 렌더링 함수
  const LogoContent = () => (
    <motion.div
      className={`${styles.logoContainer} ${sizeClassMap[size] || styles.sizeL}`}
      variants={accessibleContainerVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      {showIcon && (
        <div className={styles.iconWrapper}>
          <JHRLogoSymbol reducedMotion={!!shouldReduceMotion} />

          {/* 스파클 효과 */}
          {!shouldReduceMotion && (
            <>
              <motion.span
                className={`${styles.sparkle} ${styles.sparkle1}`}
                variants={sparkleVariants}
                initial="hidden"
                animate={['visible', 'pulse']}
              >
                ✦
              </motion.span>
              <motion.span
                className={`${styles.sparkle} ${styles.sparkle2}`}
                variants={sparkleVariants}
                initial="hidden"
                animate={['visible', 'pulse']}
                style={{ animationDelay: '0.5s' }}
              >
                ✦
              </motion.span>
            </>
          )}
        </div>
      )}

      {showWordmark && (
        <motion.div className={styles.wordmark} variants={wordmarkVariants}>
          <span className={styles.wordmarkPrimary}>JHR</span>
          <span className={styles.wordmarkSecondary}>.dev</span>
        </motion.div>
      )}
    </motion.div>
  );

  // 링크 또는 단순 div로 렌더링
  if (href) {
    return (
      <Link
        href={href}
        className={`${styles.logoWrapper} ${className}`}
        aria-label="홈으로 이동"
      >
        <LogoContent />
      </Link>
    );
  }

  return (
    <div className={`${styles.logoWrapper} ${className}`}>
      <LogoContent />
    </div>
  );
};

export default JHRLogoAnimation;
