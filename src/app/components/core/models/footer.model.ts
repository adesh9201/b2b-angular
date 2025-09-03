export interface FooterLink {
  label: string;
  url: string;
}

export interface FooterUSP {
  icon: string;
  title: string;
  subtitle: string;
}

export interface FooterSocial {
  icon: string;
  url: string;
}

export interface FooterData {
  id?: number;

  newsletterHeading: string;
  newsletterPlaceholder?: string;
  newsletterButton?: string;

  brandName: string;
  logoUrl?: string;

  mobileAppHeading?: string;
  playStoreLink?: string;   // navigate hone wala URL
  appStoreLink?: string;    // navigate hone wala URL
  playStoreBadge?: string;  // image
  appStoreBadge?: string;   // image

  helpHeading?: string;
  phoneNumber?: string;
  timings?: string;

  companyLinks: FooterLink[];
  helpLinks: FooterLink[];
  quickLinks: FooterLink[];
  topCategories: FooterLink[];

  usPs: FooterUSP[];
  socials: FooterSocial[];

  policies: FooterLink[];
  copyText?: string;
}
