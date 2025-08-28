import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-logistics',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './logistics.html',
  styleUrls: ['./logistics.css']
})
export class Logistics {

}
