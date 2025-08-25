import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-inventory',
  imports: [RouterLink, Sidebar],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css'
})
export class Inventory {

}
