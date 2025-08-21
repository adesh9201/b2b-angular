// hero-section.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-test',
  imports: [CommonModule],
  templateUrl: './test.html',
  styleUrl: './test.css'
})
export class Test {

 @Input() title: string = 'Discover Premium Fabrics for Your Business';
  @Input() subtitle: string = 'Connect with verified suppliers...';
  @Input() primaryButtonText: string = 'Explore Fabrics';
  @Input() secondaryButtonText: string = 'Become a Supplier';
  @Input() backgroundImage: string = '/assets/images/aa.jpeg';

  @Output() primaryButtonClick = new EventEmitter<void>();
  @Output() secondaryButtonClick = new EventEmitter<void>();

  get backgroundStyle() {
    return {
      'background-image': `
        url('${this.backgroundImage}')
      `
    };
  }

  onPrimaryClick(): void {
    this.primaryButtonClick.emit();
  }

  onSecondaryClick(): void {
    this.secondaryButtonClick.emit();
  }
}
