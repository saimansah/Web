export type ProjectCategory = 'cybersecurity' | 'systems' | 'web' | 'iot';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  metrics?: { label: string; value: string }[];
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  accentColor: 'cyan' | 'violet' | 'amber' | 'emerald';
}

export type SkillCategory = 'frontend' | 'backend' | 'embedded' | 'security';

export interface SkillItem {
  name: string;
  level: string; // e.g., 'Mastery', 'Production', 'Advanced'
  category: SkillCategory;
  iconName?: string;
  featured?: boolean;
}

export interface TimelineEvent {
  id: string;
  period: string;
  title: string;
  organization: string;
  location: string;
  roleType: string;
  highlightBadge?: string;
  badgeNumber?: string;
  duration?: string;
  description: string[];
  skills: string[];
  isVerifiedRecord?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
