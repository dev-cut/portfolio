export interface AcademicItem {
  period: string;
  title: string;
  subtitle: string;
}

export interface ExperienceItem {
  period: string;
  title: string;
  subtitle: string;
}

export const ACADEMIC_DATA: AcademicItem[] = [
  {
    period: '2014.03 - 2016.02',
    title: '한국IT직업전문학교',
    subtitle: '웹디자인학과',
  },
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    period: '2022.06 - 재직중',
    title: '(주)디플루이드',
    subtitle: 'Frontend Developer',
  },
  {
    period: '2021.02 - 2021.09',
    title: '주식회사 쏠쏠',
    subtitle: 'Frontend Developer',
  },
  {
    period: '2018.11 - 2020.12',
    title: '주식회사 알디엠체인',
    subtitle: 'Frontend Developer',
  },
  {
    period: '2018.07 - 2018.10',
    title: '프리랜서',
    subtitle: '프리랜서',
  },
  {
    period: '2018.04 - 2018.07',
    title: '기본좋은커뮤니케이션',
    subtitle: '',
  },
  {
    period: '2015.11 - 2017.02',
    title: '유엔제컴퍼니주식회사',
    subtitle: 'Frontend Developer',
  },
];

export const SOFT_SKILLS = [
  '#문제해결능력',
  '#원활한커뮤니케이션',
  '#주도적인학습',
  '#사용자중심사고',
];

export const TECHNICAL_SKILLS = {
  software: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'SCSS'],
  coding: [
    'Git',
    'GitHub',
    'Figma',
    'Tailwind CSS',
    'React Query',
    'Zustand',
    'Node.js',
    'Vercel',
    'Storybook',
    'Jira',
  ],
  tags: ['Web Performance', 'Accessibility', 'Responsive Design', 'SEO'],
};
