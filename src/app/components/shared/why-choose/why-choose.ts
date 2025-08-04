import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WhyChooseFeature } from '../../core/models/why-choose.model';
import { WhyChooseService } from '../../core/services/why-choose.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-why-choose',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './why-choose.html',
  styleUrls: ['./why-choose.css']
})
export class WhyChoose implements OnInit {
  features: WhyChooseFeature[] = [];

  constructor(private featureService: WhyChooseService) {}

  ngOnInit(): void {
    this.featureService.getFeatures().subscribe((data) => {
      this.features = data;
    });
  }
}
