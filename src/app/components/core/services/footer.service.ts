import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FooterData } from '../models/footer.model';

@Injectable({ providedIn: 'root' })
export class FooterService {
  private footerData: FooterData = {
    newsletterHeading: 'Subscribe for exclusive offers',
    newsletterPlaceholder: 'Enter your email',
    newsletterButton: 'Subscribe',

  brandName: 'FabHub',
  logoUrl: `<svg width="40" height="40" viewBox="0 0 32 32" aria-hidden="true">
            <circle cx="16" cy="16" r="16" fill="url(#footerLogoGradient)" />
            <path d="M10 22L16 10L22 22H10Z" fill="#fff" />
          </svg>`, // ya backend se aaya URL

    mobileAppHeading: 'Get our mobile app',
    playStoreLink: '/fabric',
    appStoreLink: '/test',
    playStoreBadge: 'https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg',
    appStoreBadge: 'https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg',


    helpHeading: 'Need Help?',
    phoneNumber: '1800-267-4444',
    timings: '(Mon–Sat: 8AM–10PM, Sun: 10AM–7PM)',

    companyLinks: [
      { label: 'About Us', url: '/about' },
      { label: 'Fabrics', url: 'fabric' },
      { label: 'Supplier', url: '/suppliers' },
      { label: 'Sustainability', url: '/about' },
      { label: 'Investor Relations', url: '/about' },
    ],

    helpLinks: [
      { label: 'Contact Us', url: '/about' },
      { label: 'FAQs', url: '#' },
      { label: 'Shipping & Delivery', url: '#' },
      { label: 'Returns & Cancellation', url: '#' },
      { label: 'Sell on FabHub', url: '#' },
    ],

    quickLinks: [
      { label: 'New Launches', url: '#' },
      { label: 'Offers', url: '#' },
      { label: 'Sitemap', url: '#' },
      { label: 'Blogs', url: '#' },
    ],

    topCategories: [
      { label: 'Printed Fabric', url: '#' },
      { label: 'Chiffon Fabric', url: '#' },
      { label: 'Georgette Fabric', url: '#' },
      { label: 'Silk Fabric', url: '#' },
    ],

    usps: [
      { icon: 'fas fa-shipping-fast', title: 'Free Shipping', subtitle: 'On Orders Above 100 meter' },
      { icon: 'fas fa-undo-alt', title: 'Easy Returns', subtitle: '15-Day Return Policy' },
      { icon: 'fas fa-certificate', title: '100% Authentic', subtitle: 'Directly Sourced' },
      { icon: 'fas fa-tags', title: '100+ Brands', subtitle: '1 Lakh+ Products' },
    ],

    socials: [
      { icon: 'fab fa-instagram', url: '#' },
      { icon: 'fab fa-facebook', url: '#' },
      { icon: 'fab fa-youtube', url: '#' },
      { icon: 'fab fa-twitter', url: '#' },
    ],

    policies: [
      { label: 'Terms & Conditions', url: '#' },
      { label: 'Shipping Policy', url: '#' },
      { label: 'Cancellation Policy', url: '#' },
      { label: 'Privacy Policy', url: '#' },
    ],

    copyText: '© 2025 FabHub All Rights Reserved.',
  };

  getFooterData(): Observable<FooterData> {
    return of(this.footerData);
  }
}
