import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './pricing.html',
  styleUrls: ['./pricing.css']
})
export class Pricing {

}
