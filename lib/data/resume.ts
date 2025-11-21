export interface EducationItem {
  period: string;
  title: string;
  subtitle: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  subtitle: string;
}

export const EDUCATION_DATA: EducationItem[] = [
  { period: '2020-2024', title: '한국대학교', subtitle: '컴퓨터공학 학사' },
  {
    period: '2019',
    title: '멋쟁이사자처럼',
    subtitle: '웹 프로그래밍 과정 수료',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    period: '2023-현재',
    title: '프론트엔드 개발자',
    subtitle: '스타트업 A\nReact, Next.js 기반 웹 서비스 개발 및 유지보수',
  },
  {
    period: '2022',
    title: '프론트엔드 인턴',
    subtitle:
      'IT 기업 B\n사내 어드민 페이지 UI 개발 및 컴포넌트 라이브러리 구축',
  },
  {
    period: '2021',
    title: '프리랜서 개발자',
    subtitle: '다수의 중소기업 웹사이트 제작 및 리뉴얼 프로젝트 수행',
  },
];

export const SOFT_SKILLS = [
  '#문제해결능력',
  '#원활한커뮤니케이션',
  '#주도적인학습',
  '#사용자중심사고',
];

export const TECHNICAL_SKILLS = {
  software: ['VsCode', 'Figma', 'Git', 'Jira', 'Slack'],
  coding: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
  tags: ['Web Performance', 'Accessibility', 'Responsive Design', 'SEO'],
};
