export interface Project {
  id: string;
  title: string;
  content: string;
  overview?: string;
  work_period?: string;
  team_composition?: string[];
  role?: string;
  tech_stack?: string[];
  main_contribution?: string;
  achievements?: string;
  reflection?: string;
  created_at: string;
  updated_at: string;
  // Additional fields from previous Project interface
  description?: string; // keeping this as optional alias or short desc
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export interface Skill {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
