import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './support.html',
  styleUrl: './support.css'
})
export class Support {

}
