import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Sidebar } from '../shared/sidebar/sidebar';

@Component({
  selector: 'app-account-setting',
  standalone: true,
  imports: [RouterLink, Sidebar],
  templateUrl: './account-setting.html',
  styleUrls: ['./account-setting.css']
})
export class AccountSetting {

}
