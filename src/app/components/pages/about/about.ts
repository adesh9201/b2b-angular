import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../core/services/about.service';
import { AboutPageData } from '../../core/models/about.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
})
export class About implements OnInit {
  aboutData!: AboutPageData;

  contactFormData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAboutData().subscribe(data => {
      this.aboutData = data;
    });
  }

  onSubmit() {
    if (
      !this.contactFormData.name ||
      !this.contactFormData.email ||
      !this.contactFormData.subject ||
      !this.contactFormData.message
    ) {
      return;
    }
    console.log('Contact Form Data:', this.contactFormData);
    alert('Thank you for your message, we will get back to you shortly.');
    this.contactFormData = { name: '', email: '', subject: '', message: '' };
  }
}
