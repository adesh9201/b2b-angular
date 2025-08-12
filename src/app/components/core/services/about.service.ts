import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AboutPageData } from '../models/about.model';

@Injectable({
  providedIn: 'root'
})
export class AboutService {
  private aboutData: AboutPageData = {
    header: {
      title: 'About FabricHub',
      subtitle: "Connecting the world's fabric industry through innovative B2B solutions",
      imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      imageAlt: 'About FabricHub'
    },
    story: {
      title: 'Our Story',
      subtitle: 'Founded in 2020, FabricHub emerged from a simple vision: to revolutionize how the global fabric industry connects, trades, and grows together.',
      features: [
        {
          icon: 'fas fa-lightbulb',
          title: 'Innovation',
          description: 'Pioneering digital solutions for traditional textile trade',
          bgClass: 'bg-primary bg-opacity-10',
          iconColorClass: 'text-primary'
        },
        {
          icon: 'fas fa-handshake',
          title: 'Trust',
          description: 'Building lasting relationships through transparency and reliability',
          bgClass: 'bg-success bg-opacity-10',
          iconColorClass: 'text-success'
        },
        {
          icon: 'fas fa-globe',
          title: 'Global Reach',
          description: 'Connecting suppliers and buyers across continents',
          bgClass: 'bg-warning bg-opacity-10',
          iconColorClass: 'text-warning'
        }
      ]
    },
    missionVision: {
      mission: {
        title: 'Our Mission',
        description: 'To democratize access to quality fabrics by creating a seamless, transparent, and efficient B2B marketplace that empowers both suppliers and buyers.',
        points: [
          'Connect global fabric suppliers with buyers',
          'Ensure quality and authenticity of products',
          'Provide secure and efficient transactions',
          'Support sustainable textile practices'
        ],
        icon: 'fas fa-bullseye',
        bgClass: 'bg-primary bg-opacity-10',
        iconColorClass: 'text-primary'
      },
      vision: {
        title: 'Our Vision',
        description: "To become the world's leading B2B fabric marketplace, driving innovation and sustainability in the global textile industry.",
        points: [
          'Global market leadership in fabric trading',
          'Industry-standard digital solutions',
          'Sustainable and ethical business practices',
          'Continuous innovation and growth'
        ],
        icon: 'fas fa-eye',
        bgClass: 'bg-success bg-opacity-10',
        iconColorClass: 'text-success'
      }
    },
    stats: [
      { number: '500+', description: 'Verified Suppliers', colorClass: 'text-primary' },
      { number: '10,000+', description: 'Active Buyers', colorClass: 'text-success' },
      { number: '50,000+', description: 'Products Listed', colorClass: 'text-warning' },
      { number: '150+', description: 'Countries Served', colorClass: 'text-info' }
    ],
    team: {
      title: 'Our Leadership Team',
      subtitle: 'Meet the visionaries behind FabricHub',
      members: [
        {
          name: 'David Chen',
          role: 'CEO & Founder',
          description: 'Former textile industry executive with 15+ years of experience in global supply chains.',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          socialLinks: [
            { platform: 'linkedin', url: '#', iconClass: 'fab fa-linkedin' },
            { platform: 'twitter', url: '#', iconClass: 'fab fa-twitter' }
          ]
        },
        {
          name: 'Sarah Johnson',
          role: 'CTO',
          description: 'Technology leader with expertise in e-commerce platforms and digital marketplaces.',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          socialLinks: [
            { platform: 'linkedin', url: '#', iconClass: 'fab fa-linkedin' },
            { platform: 'github', url: '#', iconClass: 'fab fa-github' }
          ]
        },
        {
          name: 'Michael Rodriguez',
          role: 'COO',
          description: 'Operations expert specializing in logistics operation, and in the business development.',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          socialLinks: [
            { platform: 'linkedin', url: '#', iconClass: 'fab fa-linkedin' },
            { platform: 'twitter', url: '#', iconClass: 'fab fa-twitter' }
          ]
        },
        {
          name: 'Emily Watson',
          role: 'CMO',
          description: 'Marketing strategist with deep experience in B2B marketing and brand development.',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
          socialLinks: [
            { platform: 'linkedin', url: '#', iconClass: 'fab fa-linkedin' },
            { platform: 'instagram', url: '#', iconClass: 'fab fa-instagram' }
          ]
        }
      ]
    },
    contact: {
      title: 'Get in Touch',
      subtitle: "We'd love to hear from you",
      infoItems: [
        {
          icon: 'fas fa-map-marker-alt',
          title: 'Address',
          details: '123 Fabric Street, New York, NY 10001, USA',
          bgClass: 'bg-primary bg-opacity-10',
          iconColorClass: 'text-primary'
        },
        {
          icon: 'fas fa-phone',
          title: 'Phone',
          details: '+1 (555) 123-4567',
          bgClass: 'bg-success bg-opacity-10',
          iconColorClass: 'text-success'
        },
        {
          icon: 'fas fa-envelope',
          title: 'Email',
          details: 'info@fabrichub.com',
          bgClass: 'bg-warning bg-opacity-10',
          iconColorClass: 'text-warning'
        },
        {
          icon: 'fas fa-clock',
          title: 'Business Hours',
          details: 'Monday - Friday: 9:00 AM - 6:00 PM EST',
          bgClass: 'bg-info bg-opacity-10',
          iconColorClass: 'text-info'
        }
      ]
    }
  };

  constructor() {}

  getAboutData(): Observable<AboutPageData> {
    return of(this.aboutData);
  }
}
