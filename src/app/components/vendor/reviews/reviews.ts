import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './reviews.html',
  styleUrls: ['./reviews.css']
})
export class Reviews {

}
