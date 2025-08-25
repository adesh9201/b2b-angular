import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-pricing',
  imports: [RouterLink, Sidebar],
  templateUrl: './pricing.html',
  styleUrl: './pricing.css'
})
export class Pricing {

}
