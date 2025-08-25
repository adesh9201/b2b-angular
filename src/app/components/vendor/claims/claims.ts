import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-claims',
  imports: [RouterLink,Sidebar],
  templateUrl: './claims.html',
  styleUrl: './claims.css'
})
export class Claims {

}
