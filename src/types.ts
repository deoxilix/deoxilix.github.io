// src/types.ts

export interface Basics {
  name: string;
  description: string;
  email: string | string[];
  phone: string;
  location: string;
  website: string;
  social: Social[];
}

export interface Social {
  name: string;
  url: string;
}

export interface Education {
  institution: string;
  area: string;
  studyType: string;
  gpa?: string;
  startDate: string;
  endDate: string;
  location: string;
  courses?: string[];
}

export interface Work {
  company: string;
  position: string;
  location: string;
  remote?: boolean;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  achievements?: string[];
}

export interface Internship {
  company: string;
  location: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  name: string;
  summary: string;
  tech?: string;
  source?: string;
  url?: string;
  disabled?: boolean;
}

export interface Skills {
  languages: string[];
  frameworks: string[];
  ml_ai: string[];
  tools: string[];
  methodologies: string[];
}

export interface Leadership {
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Resume {
  basics: Basics;
  education: Education[];
  work: Work[];
  internships: Internship[];
  projects: Project[];
  skills: Skills;
  leadership: Leadership[];
  internshipAvailability: string;
}
