import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-analytics',
  imports: [RouterLink, Sidebar],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics {

}
