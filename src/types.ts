export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  video?: string;
  description: string;
  longDescription: string;
  challenge?: string;
  solution?: string;
  services: string[];
  client: string;
  role: string;
  gallery: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  iconName: string;
}

export type ViewState = {
  view: 'home' | 'project';
  selectedProjectId?: string;
};
