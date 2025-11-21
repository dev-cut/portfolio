import { Project } from '@/types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: '포트폴리오 웹사이트',
    content: `Next.js와 TypeScript를 사용하여 제작한 개인 포트폴리오 웹사이트입니다.
    
반응형 디자인을 적용하여 다양한 디바이스에서 최적화된 화면을 제공하며, SEO를 고려하여 메타태그를 구성했습니다.
Supabase를 이용한 동적 데이터 관리에서 정적 데이터 관리로 전환하여 유지보수성을 높였습니다.`,
    overview: '개인 포트폴리오 및 프로젝트 아카이빙을 위한 웹사이트 제작',
    work_period: '2024.01 - 2024.02',
    team_composition: ['1인 개발'],
    role: 'Frontend Developer',
    tech_stack: ['Next.js', 'TypeScript', 'SCSS', 'Vercel'],
    main_contribution: `• Next.js 14 App Router 기반의 프로젝트 구조 설계
• 반응형 UI/UX 구현 및 디자인 시스템 구축
• SEO 최적화 및 성능 개선`,
    achievements: 'Lighthouse 성능 점수 90점 이상 달성',
    reflection:
      'Next.js의 최신 기능을 활용해보며 서버 컴포넌트와 클라이언트 컴포넌트의 적절한 분리 기준을 익혔습니다.',
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z',
    description: 'Next.js와 TypeScript로 제작한 개인 포트폴리오',
    image: '/images/portfolio-cover.jpg', // 이미지 경로는 실제 파일이 있을 경우 수정 필요
    githubUrl: 'https://github.com/yourusername/portfolio',
    featured: true,
  },
  // 추가 프로젝트를 여기에 등록하세요
];
