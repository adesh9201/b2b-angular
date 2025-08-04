
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrustedByService } from '../../core/services/trusted-by-users.service';
import { TrustedStat } from '../../core/models/trusted-by-users.model';

@Component({
  selector: 'app-trusted-by-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trusted-by-users.html',
  styleUrl: './trusted-by-users.css'
})
export class TrustedByUsers implements OnInit {
  stats: TrustedStat[] = [];

  constructor(private trustedService: TrustedByService) {}

  ngOnInit(): void {
    this.trustedService.getStats().subscribe((data) => {
      this.stats = data;
    });
  }
}
