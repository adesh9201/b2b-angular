import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class Analytics {

}
