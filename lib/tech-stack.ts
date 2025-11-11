// 기술 스택 카테고리 타입
export type TechStackCategory =
  | 'language'
  | 'framework'
  | 'styling'
  | 'state'
  | 'form'
  | 'api'
  | 'build'
  | 'devtool'
  | 'testing'
  | 'animation'
  | 'other';

// 기술 스택 정보 인터페이스
export interface TechStackInfo {
  name: string;
  category: TechStackCategory;
}

// 프론트엔드 기술 스택 목록 (카테고리별 분류)
export const FRONTEND_TECH_STACK: TechStackInfo[] = [
  // 언어
  { name: 'JavaScript', category: 'language' },
  { name: 'TypeScript', category: 'language' },
  { name: 'HTML/CSS', category: 'language' },
  
  // 프레임워크
  { name: 'React', category: 'framework' },
  { name: 'Next.js', category: 'framework' },
  { name: 'Vue.js', category: 'framework' },
  { name: 'Angular', category: 'framework' },
  { name: 'Svelte', category: 'framework' },
  
  // 스타일링
  { name: 'SCSS/SASS', category: 'styling' },
  { name: 'Tailwind CSS', category: 'styling' },
  { name: 'Styled Components', category: 'styling' },
  { name: 'Emotion', category: 'styling' },
  { name: 'Material-UI', category: 'styling' },
  { name: 'Ant Design', category: 'styling' },
  { name: 'Chakra UI', category: 'styling' },
  
  // 상태관리
  { name: 'React Query', category: 'state' },
  { name: 'SWR', category: 'state' },
  { name: 'Zustand', category: 'state' },
  { name: 'Redux', category: 'state' },
  { name: 'Recoil', category: 'state' },
  { name: 'Jotai', category: 'state' },
  
  // 폼/검증
  { name: 'React Hook Form', category: 'form' },
  { name: 'Formik', category: 'form' },
  { name: 'Zod', category: 'form' },
  { name: 'Yup', category: 'form' },
  
  // API/데이터
  { name: 'Axios', category: 'api' },
  { name: 'Fetch API', category: 'api' },
  { name: 'GraphQL', category: 'api' },
  { name: 'Apollo Client', category: 'api' },
  
  // 빌드 도구
  { name: 'Webpack', category: 'build' },
  { name: 'Vite', category: 'build' },
  { name: 'Parcel', category: 'build' },
  
  // 개발 도구
  { name: 'ESLint', category: 'devtool' },
  { name: 'Prettier', category: 'devtool' },
  
  // 테스팅
  { name: 'Jest', category: 'testing' },
  { name: 'Vitest', category: 'testing' },
  { name: 'React Testing Library', category: 'testing' },
  { name: 'Cypress', category: 'testing' },
  { name: 'Playwright', category: 'testing' },
  { name: 'Storybook', category: 'testing' },
  
  // 애니메이션/그래픽
  { name: 'Framer Motion', category: 'animation' },
  { name: 'Three.js', category: 'animation' },
  { name: 'D3.js', category: 'animation' },
  
  // 기타
  { name: 'PWA', category: 'other' },
  { name: 'WebSocket', category: 'other' },
  { name: 'Socket.io', category: 'other' },
];

// 카테고리별 색상 매핑
export const CATEGORY_COLORS: Record<TechStackCategory, { bg: string; text: string; border: string }> = {
  language: {
    bg: '#3b82f6', // 파란색
    text: '#ffffff',
    border: '#2563eb',
  },
  framework: {
    bg: '#10b981', // 초록색
    text: '#ffffff',
    border: '#059669',
  },
  styling: {
    bg: '#8b5cf6', // 보라색
    text: '#ffffff',
    border: '#7c3aed',
  },
  state: {
    bg: '#f59e0b', // 주황색
    text: '#ffffff',
    border: '#d97706',
  },
  form: {
    bg: '#ec4899', // 분홍색
    text: '#ffffff',
    border: '#db2777',
  },
  api: {
    bg: '#06b6d4', // 청록색
    text: '#ffffff',
    border: '#0891b2',
  },
  build: {
    bg: '#a16207', // 갈색
    text: '#ffffff',
    border: '#854d0e',
  },
  devtool: {
    bg: '#6b7280', // 회색
    text: '#ffffff',
    border: '#4b5563',
  },
  testing: {
    bg: '#ef4444', // 빨간색
    text: '#ffffff',
    border: '#dc2626',
  },
  animation: {
    bg: '#eab308', // 노란색
    text: '#000000',
    border: '#ca8a04',
  },
  other: {
    bg: '#6366f1', // 남색
    text: '#ffffff',
    border: '#4f46e5',
  },
};

// 카테고리별 한글 라벨
export const CATEGORY_LABELS: Record<TechStackCategory, string> = {
  language: '언어',
  framework: '프레임워크',
  styling: '스타일링',
  state: '상태관리',
  form: '폼/검증',
  api: 'API/데이터',
  build: '빌드 도구',
  devtool: '개발 도구',
  testing: '테스팅',
  animation: '애니메이션/그래픽',
  other: '기타',
};

// 카테고리별로 그룹화된 기술 스택
export function getTechStackByCategory() {
  const grouped: Record<TechStackCategory, TechStackInfo[]> = {
    language: [],
    framework: [],
    styling: [],
    state: [],
    form: [],
    api: [],
    build: [],
    devtool: [],
    testing: [],
    animation: [],
    other: [],
  };

  FRONTEND_TECH_STACK.forEach((tech) => {
    grouped[tech.category].push(tech);
  });

  return grouped;
}

