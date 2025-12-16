import { Activity, BookOpen, Coffee, Laptop } from 'lucide-react';

export const HERO_DATA = {
  topText: 'PORTFOLIO',
  bottomText: ['FRONTEND', 'DEVELOPER'],
  description: '',
  socialLinks: [
    { label: 'Github', value: 'github.com/username' },
    { label: 'Blog', value: 'velog.io/@username' },
    { label: 'Email', value: 'dev@example.com' },
  ],
};

export const INTERESTS_DATA = {
  activities: [
    {
      year: '2023',
      title: '오픈소스 기여',
      description: 'React 라이브러리 번역 및 버그 수정 참여',
    },
    {
      year: '2022',
      title: '해커톤 참여',
      description: '대학생 연합 해커톤 대상 수상 (팀 리더)',
    },
  ],
  languages: [
    { name: 'Korean', level: 'Native' },
    { name: 'English', level: 'Conversational' },
  ],
  hobbies: [
    {
      icon: <Laptop size={32} strokeWidth={1.5} />,
      name: '사이드 프로젝트',
      description: '새로운 기술 실험',
    },
    {
      icon: <BookOpen size={32} strokeWidth={1.5} />,
      name: '기술 블로그',
      description: '학습 내용 기록',
    },
    {
      icon: <Activity size={32} strokeWidth={1.5} />,
      name: '러닝',
      description: '체력 관리',
    },
    {
      icon: <Coffee size={32} strokeWidth={1.5} />,
      name: '카페 투어',
      description: '코딩하기 좋은 곳 찾기',
    },
  ],
};
