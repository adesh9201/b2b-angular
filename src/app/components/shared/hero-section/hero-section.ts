// hero-section.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeroSectionService } from '../../core/services/HeroSection.Service';
import { HeroSectionModel } from '../../core/models/HeroSection.model';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hero-section.html',
  styleUrls: ['./hero-section.css'],
})
export class HeroSection implements OnInit, OnDestroy {
  heroDataList: HeroSectionModel[] = [];
  heroData!: HeroSectionModel;
  currentIndex = 0;
  intervalSubscription!: Subscription;

  constructor(private heroService: HeroSectionService) {}

ngOnInit(): void {
  this.heroService.getHeroDataList().subscribe(data => {
    console.log('API Data:', data); // 👈 Console me check karein
    this.heroDataList = data;
    this.heroData = this.heroDataList[0]; // Initial hero

    // Change hero every 6 seconds
    this.intervalSubscription = interval(6000).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.heroDataList.length;
      this.heroData = this.heroDataList[this.currentIndex];
    });
  });
}


  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }
}

