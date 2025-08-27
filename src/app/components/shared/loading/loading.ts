import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isLoading" class="loading-overlay" [class.fullscreen]="fullscreen">
      <div class="loading-spinner">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <div *ngIf="message" class="loading-message mt-2">
          {{ message }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loading-overlay.fullscreen {
      background-color: rgba(0, 0, 0, 0.5);
    }

    .loading-spinner {
      text-align: center;
      color: #007bff;
    }

    .loading-message {
      color: #6c757d;
      font-size: 0.9rem;
    }

    .spinner-border {
      width: 3rem;
      height: 3rem;
    }
  `]
})
export class LoadingComponent {
  @Input() fullscreen: boolean = true;
  @Input() message: string = '';

  constructor(public loadingService: LoadingService) {}

  get isLoading(): boolean {
    return this.loadingService.isLoading;
  }
}