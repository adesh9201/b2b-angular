import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-marketing',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './marketing.html',
  styleUrls: ['./marketing.css']
})
export class Marketing {

}
