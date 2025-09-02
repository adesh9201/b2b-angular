// hero-section.component.ts - Updated with auto-open functionality
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HeroService } from '../../core/services/test.service';
import { AnalyticsService } from '../../core/services/analytics.service';
import { HeroContent, FabricCategory, SearchSuggestion } from '../../core/models/test.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './test.html',
  styleUrls: ['./test.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Test implements OnInit, OnDestroy {
  heroContent: HeroContent | null = null;
  fabricCategories: FabricCategory[] = [];
  searchSuggestions: SearchSuggestion[] = [];
  showSuggestions = false;
  isLoading = false;
  isHeroExpanded = false; // New property to control hero expansion

  searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  constructor(
    private heroService: HeroService,
    private analyticsService: AnalyticsService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadHeroContent();
    this.loadFabricCategories();
    this.setupSearchSuggestions();
    this.checkRouteForAutoOpen(); // New method to check route
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // New method to check if we should auto-open based on route
  private checkRouteForAutoOpen(): void {
    // Check current route
    const currentUrl = this.router.url;
    if (currentUrl.includes('/test')) {
      this.openHeroSection();
    }

    // Also listen for route changes
    this.route.url.pipe(
      takeUntil(this.destroy$)
    ).subscribe(urlSegments => {
      const path = urlSegments.map(segment => segment.path).join('/');
      if (path === 'test') {
        this.openHeroSection();
      }
    });
  }

  // New method to open hero section
  private openHeroSection(): void {
    this.isHeroExpanded = true;
    this.analyticsService.trackEvent('Hero Section', 'Auto Open', '/test route');
    this.cdr.detectChanges();
  }

  // New method to close hero section
  closeHeroSection(): void {
    this.isHeroExpanded = false;
    this.cdr.detectChanges();
  }

  private loadHeroContent(): void {
    this.heroService.getHeroContent()
      .pipe(takeUntil(this.destroy$))
      .subscribe(content => {
        this.heroContent = content;
        this.cdr.detectChanges();
      });
  }

  private loadFabricCategories(): void {
    this.heroService.getFabricCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe(categories => {
        this.fabricCategories = categories;
        this.cdr.detectChanges();
      });
  }

  private setupSearchSuggestions(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(query => {
          if (query && query.length > 2) {
            return this.heroService.getSearchSuggestions(query);
          }
          return ([]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(suggestions => {
        this.searchSuggestions = suggestions;
        this.showSuggestions = suggestions.length > 0;
        this.cdr.detectChanges();
      });
  }

  onCtaClick(button: any): void {
    this.analyticsService.trackHeroInteraction(button.type, button.text);
    // Navigate to the specified route
    this.router.navigate([button.link]);
    console.log('CTA clicked:', button);
  }

  onSearch(): void {
    const query = this.searchControl.value;
    if (query && query.trim()) {
      this.analyticsService.trackSearch(query.trim());
      this.hideSuggestions();
      // Navigate to search results with query parameter
      this.router.navigate(['/search'], { queryParams: { q: query.trim() } });
      console.log('Search query:', query.trim());
    }
  }

  onSuggestionClick(suggestion: SearchSuggestion): void {
    this.searchControl.setValue(suggestion.term);
    this.analyticsService.trackSearch(suggestion.term);
    this.hideSuggestions();
    // Navigate to search results with the suggestion
    this.router.navigate(['/search'], { queryParams: { q: suggestion.term } });
    console.log('Suggestion selected:', suggestion);
  }

  onCategoryClick(category: FabricCategory): void {
    this.analyticsService.trackEvent('Hero Section', 'Category Click', category.name);
    // Navigate to category page
    this.router.navigate(['/category', category.id]);
    console.log('Category clicked:', category);
  }

  hideSuggestions(): void {
    this.showSuggestions = false;
  }

  onFocusSearch(): void {
    if (this.searchSuggestions.length > 0) {
      this.showSuggestions = true;
    }
  }
}
