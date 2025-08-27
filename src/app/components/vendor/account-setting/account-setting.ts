import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './account-setting.html',
  styleUrl: './account-setting.css'
})
export class AccountSetting {

}
