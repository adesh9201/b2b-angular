import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Stat, Feature } from '../../core/models/why-choose.model';
import { WhyChooseService } from '../../core/services/why-choose.service';

@Component({
  selector: 'app-why-choose',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './why-choose.html',
  styleUrls: ['./why-choose.css']
})
export class WhyChoose implements OnInit {
  stats: Stat[] = [];
  features: Feature[] = [];

  constructor(private whyChooseService: WhyChooseService) {}

  ngOnInit(): void {
    this.whyChooseService.getStats().subscribe(stats => this.stats = stats);
    this.whyChooseService.getFeatures().subscribe(features => this.features = features);
  }
}