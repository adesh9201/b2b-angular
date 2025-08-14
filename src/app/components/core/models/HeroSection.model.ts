// src/app/core/models/hero.model.ts
export interface HeroSectionModel {
  title: string;
  subtitle: string;
  imageUrl: string;
  stats: { number: string; label: string }[];
}
