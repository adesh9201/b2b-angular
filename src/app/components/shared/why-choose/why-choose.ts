import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-why-choose',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './why-choose.html',
  styleUrls: ['./why-choose.css']
})
export class WhyChoose {
  stats = [
    { number: '10,000+', label: 'Active Buyers' },
    { number: '5,000+', label: 'Verified Suppliers' },
    { number: '$50M+', label: 'Transactions Processed' },
    { number: '99.8%', label: 'Customer Satisfaction' }
  ];

  features = [
    {
      icon: 'bi-shield-lock-fill',
      title: 'Verified Suppliers',
      description: 'We ensure every supplier is vetted and approved for quality assurance.',
      stat: '100% Verified'
    },
    {
      icon: 'bi-credit-card-fill',
      title: 'Secure Payments',
      description: 'Multiple payment methods with full buyer protection and SSL encryption.',
      stat: 'SSL Encrypted'
    },
    {
      icon: 'bi-truck',
      title: 'Global Shipping',
      description: 'We ship worldwide with real-time tracking and insurance on every order.',
      stat: '50+ Countries'
    },
    {
      icon: 'bi-people-fill',
      title: 'Expert Support',
      description: 'Our dedicated support team is available 24/7 to assist you anytime.',
      stat: '24/7 Support'
    },
    {
      icon: 'bi-award-fill',
      title: 'Quality Guarantee',
      description: 'If it doesn’t match the promised quality, you get your money back.',
      stat: '100% Guarantee'
    },
    {
      icon: 'bi-clock-history',
      title: 'Fast Processing',
      description: 'Get your quotes in under 24 hours and start production without delay.',
      stat: '24hr Response'
    }
  ];
}
