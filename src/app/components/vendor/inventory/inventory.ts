import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})
export class Inventory {

}
