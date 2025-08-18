// import { Component } from '@angular/core';
// import { CommonModule, CurrencyPipe } from '@angular/common';
// import { ProductService } from '../../core/services/product.service';
// import { Product } from '../../core/models/product.model';
// import { RouterModule } from '@angular/router';


// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   providers: [CurrencyPipe],
//   templateUrl: './products.html',
//   styleUrl: './products.css'
// })
// export class Products {
//   featuredProducts: Product[] = [];
//   productChunks: Product[][] = [];

//   constructor(private productService: ProductService) {
//     this.featuredProducts = this.productService.getFeaturedProducts();
//     this.chunkProducts();
//   }

//   private chunkProducts(): void {
//     const chunkSize = 6;
//     for (let i = 0; i < this.featuredProducts.length; i += chunkSize) {
//       this.productChunks.push(this.featuredProducts.slice(i, i + chunkSize));
//     }
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { CommonModule, CurrencyPipe } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [CommonModule, RouterModule],
//   providers: [CurrencyPipe],
//   templateUrl: './products.html',
//   styleUrl: './products.css'
// })
// export class Products implements OnInit {
//   quantity: number = 1;
//   mainImage: string = '';

//   product = {
//     id: 1,
//     name: 'Premium Wireless Headphones',
//     description: 'Experience crystal clear sound with our premium wireless headphones. Featuring noise cancellation, 30-hour battery life, and comfortable over-ear design.',
//     price: 3499,
//     originalPrice: 4999,
//     discount: 30,
//     rating: 4,
//     reviewCount: 1245,
//     images: [
//       { main: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=400&q=80', thumbnail: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=400&q=80' },
//       { main: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=400&q=80', thumbnail: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=400&q=80' },
//       { main: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=400&q=80', thumbnail: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=400&q=80' },
//       { main: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=400&q=80', thumbnail: 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?auto=format&fit=crop&w=400&q=80' }
//     ],
//     options: [
//       { name: 'Color', values: ['Black', 'White', 'Blue'] },
//       { name: 'Size', values: ['Standard', 'Large'] }
//     ]
//   };

//   ngOnInit(): void {
//     // Set the first image as main by default
//     if (this.product.images.length > 0) {
//       this.mainImage = this.product.images[0].main;
//     }
//   }

//   changeMainImage(imageUrl: string): void {
//     this.mainImage = imageUrl;
//   }

//   increaseQuantity(): void {
//     this.quantity++;
//   }

//   decreaseQuantity(): void {
//     if (this.quantity > 1) {
//       this.quantity--;
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models/product.model';
import { RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [CurrencyPipe],
  templateUrl: './products.html',
  styleUrl: './products.css'
})





export class Products implements OnInit {
  selectedProduct: Product | null = null;

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      if (productId) {
        // Fetch product by ID
        this.selectedProduct = this.productService.getProductById(+productId);
      }
    });
  }
}
