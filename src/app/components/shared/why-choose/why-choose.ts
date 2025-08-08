// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { WhyChooseFeature } from '../../core/models/why-choose.model';
// import { WhyChooseService } from '../../core/services/why-choose.service';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

// @Component({
//   selector: 'app-why-choose',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './why-choose.html',
//   styleUrls: ['./why-choose.css']
// })
// export class WhyChoose implements OnInit {
//   features: WhyChooseFeature[] = [];

//   constructor(private featureService: WhyChooseService) {}

//   ngOnInit(): void {
//     this.featureService.getFeatures().subscribe((data) => {
//       this.features = data;
//     });
//   }
// }

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
      description: 'All suppliers undergo rigorous verification process for quality assurance',
      stat: '100% Verified'
    },
    {
      icon: 'bi-credit-card-fill',
      title: 'Secure Payments',
      description: 'Protected transactions with multiple payment options and buyer protection',
      stat: 'SSL Encrypted'
    },
    {
      icon: 'bi-truck',
      title: 'Global Shipping',
      description: 'Worldwide delivery with tracking and insurance for all orders',
      stat: '50+ Countries'
    },
    {
      icon: 'bi-people-fill',
      title: 'Expert Support',
      description: 'Dedicated account managers and 24/7 customer support',
      stat: '24/7 Support'
    },
    {
      icon: 'bi-award-fill',
      title: 'Quality Guarantee',
      description: "Money-back guarantee if products don't meet specified standards",
      stat: '100% Guarantee'
    },
    {
      icon: 'bi-clock-history',
      title: 'Fast Processing',
      description: 'Quick quote responses and efficient order processing',
      stat: '24hr Response'
    }
  ];
}
