export interface Feature {
  icon: string;
  title: string;
  description: string;
  bgClass: string;
  iconColorClass: string;
}

export interface Stat {
  number: string;
  description: string;
  colorClass: string;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  socialLinks: { platform: string; url: string; iconClass: string }[];
}

export interface ContactInfoItem {
  icon: string;
  title: string;
  details: string;
  bgClass: string;
  iconColorClass: string;
}

export interface AboutPageData {
  header: {
    title: string;
    subtitle: string;
    imageUrl: string;
    imageAlt: string;
  };
  story: {
    title: string;
    subtitle: string;
    features: Feature[];
  };
  missionVision: {
    mission: {
      title: string;
      description: string;
      points: string[];
      icon: string;
      bgClass: string;
      iconColorClass: string;
    };
    vision: {
      title: string;
      description: string;
      points: string[];
      icon: string;
      bgClass: string;
      iconColorClass: string;
    };
  };
  stats: Stat[];
  team: {
    title: string;
    subtitle: string;
    members: TeamMember[];
  };
  contact: {
    title: string;
    subtitle: string;
    infoItems: ContactInfoItem[];
  };
}
