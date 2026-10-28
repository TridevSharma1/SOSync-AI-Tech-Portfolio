export interface InitialProject {
  title: string;
  href: string;
  image: string;
  category: string;
  description: string;
  tags: string[];
}

// Clean slate: all dummy projects removed so only real admin-created projects appear on the website
export const PROJECTS: InitialProject[] = [];
