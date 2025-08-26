import { Component, OnInit } from '@angular/core';
import { TestService, ImageColorDetail } from '../../core/services/test.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
    imports: [CommonModule],
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})
export class Test implements OnInit {
  imageColors: ImageColorDetail[] = [];
  loading = true;

  constructor(private testService: TestService) {}

  ngOnInit(): void {
    this.testService.getAll().subscribe({
      next: (data) => {
        this.imageColors = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching data', err);
        this.loading = false;
      }
    });
  }
}




































// // hero-section.component.ts
// import { CommonModule } from '@angular/common';
// import { Component, Input, Output, EventEmitter } from '@angular/core';


// @Component({
//   selector: 'app-test',
//   imports: [CommonModule],
//   templateUrl: './test.html',
//   styleUrl: './test.css'
// })
// export class Test {

//  @Input() title: string = 'Discover Premium Fabrics for Your Business';
//   @Input() subtitle: string = 'Connect with verified suppliers...';
//   @Input() backgroundImage: string = '/assets/images/Cotton Poplin Print Fabric.jpeg';

//   @Output() primaryButtonClick = new EventEmitter<void>();
//   @Output() secondaryButtonClick = new EventEmitter<void>();

// get backgroundStyle() {
//   return {
//     'background-image': `url('${this.backgroundImage}')`
//   };
// }


//   onPrimaryClick(): void {
//     this.primaryButtonClick.emit();
//   }

//   onSecondaryClick(): void {
//     this.secondaryButtonClick.emit();
//   }
// }
