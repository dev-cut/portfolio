// 문자열을 숫자로 변환하여 일관된 "랜덤" 색상 선택을 돕는 헬퍼 함수
export const getStringHash = (str: string, seed: number = 0) => {
  let hash = seed;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // 32비트 정수로 변환
  }
  return Math.abs(hash);
};

// 애니메이션 variants
export const popoverVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: -8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: -8,
    transition: {
      duration: 0.15,
      ease: 'easeOut' as const,
    },
  },
};
