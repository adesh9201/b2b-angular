// src/app/core/models/hero.model.ts
export interface HeroSectionModel {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaPrimary: { label: string; url: string };
  ctaSecondary: { label: string; url: string };
  stats: { number: string; label: string }[];
}
