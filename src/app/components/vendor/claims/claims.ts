import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [RouterLink,Sidebar],
  templateUrl: './claims.html',
  styleUrls: ['./claims.css']
})
export class Claims {

}
