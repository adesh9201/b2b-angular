import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-catalog',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-catalog.html',
  styleUrl: './product-catalog.css'
})
export class ProductCatalog {

}
