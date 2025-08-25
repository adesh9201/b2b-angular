import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-payment',
  imports: [RouterLink, Sidebar],
  templateUrl: './payment.html',
  styleUrl: './payment.css'
})
export class Payment {

}
