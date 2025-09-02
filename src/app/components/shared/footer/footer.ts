import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterData } from '../../core/models/footer.model';
import { FooterService } from '../../core/services/footer.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer implements OnInit {
  footerData!: FooterData;

  constructor(private footerService: FooterService) {}

  ngOnInit(): void {
    this.footerService.getFooterData().subscribe(data => {
      this.footerData = data;
    });
  }
}
