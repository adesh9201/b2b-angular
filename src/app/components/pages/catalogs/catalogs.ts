// import { Component } from '@angular/core';


// @Component({
//   selector: 'app-home',
//   standalone: true,
//   templateUrl: './home.html',
//   styleUrls: ['./home.css'],
//   // 👇 IMPORTANT: bring these in, otherwise *ngFor, *ngIf, currency, ngSrc will error
//   imports: [],
// })
// export class Home {
 
// }




// // src/app/home/home.ts
// import { Component } from '@angular/core';
// import { CommonModule, CurrencyPipe } from '@angular/common';
// import { ProductService } from '../../core/services/product.service';
// import { Product } from '../../core/models/product.model';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   templateUrl: './home.html',
//   styleUrls: ['./home.css'],
//   imports: [CommonModule],
//   providers: [CurrencyPipe]
// })
// export class Home {
//   featuredProducts: Product[] = [];

//   constructor(private productService: ProductService) {
//     this.featuredProducts = this.productService.getFeaturedProducts();
//   }
// }





// src/app/home/home.ts
import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { Filter } from '../../shared/filter/filter';
import { AutoscrollProducts } from '../../shared/autoscroll-products/autoscroll-products';

@Component({
  selector: 'app-catalogs',
  standalone: true,
  templateUrl: './catalogs.html',
  styleUrls: ['./catalogs.css'],
  imports: [CommonModule, Filter, AutoscrollProducts],
  providers: [CurrencyPipe]
})
export class Catalogs {
  featuredProducts: Product[] = [];

  constructor(private productService: ProductService) {
    this.featuredProducts = this.productService.getFeaturedProducts();
  }
}
