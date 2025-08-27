import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './order.html',
  styleUrl: './order.css'
})
export class Order {

}
