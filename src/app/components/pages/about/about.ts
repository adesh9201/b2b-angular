import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutService } from '../../core/services/about.service';
import { LoggingService } from '../../core/services/logging.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class About implements OnInit {
  aboutData: any = {};
  teamMembers: any[] = [];
  statistics: any[] = [];
  isLoading = true;

  constructor(
    private aboutService: AboutService,
    private loggingService: LoggingService
  ) {}

  ngOnInit(): void {
    this.loadAboutData();
    this.loggingService.info('About page loaded');
  }

  private loadAboutData(): void {
    this.aboutService.getAboutData().subscribe({
      next: (data) => {
        this.aboutData = data;
        this.teamMembers = data.team || [];
        this.statistics = data.statistics || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.loggingService.error('Failed to load about data', error);
        this.isLoading = false;
      }
    });
  }
}