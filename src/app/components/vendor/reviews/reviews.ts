import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-reviews',
  imports: [RouterLink, Sidebar],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class Reviews {

}
