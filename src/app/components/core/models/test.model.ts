// models/hero.model.ts
export interface HeroContent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  ctaButtons: CtaButton[];
  backgroundImage: string;
  statistics: Statistic[];
  features: string[];
  isActive: boolean;
}

export interface CtaButton {
  text: string;
  link: string;
  type: 'primary' | 'secondary';
  icon?: string;
}

export interface Statistic {
  value: string;
  label: string;
  icon: string;
}

// models/fabric.model.ts
export interface FabricCategory {
  id: string;
  name: string;
  count: number;
  icon: string;
}

export interface SearchSuggestion {
  id: string;
  term: string;
  category: string;
  popularity: number;
}
