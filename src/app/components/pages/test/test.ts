import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { FabricService } from '../../core/services/fabric.service';
import { FabricModel } from '../../core/models/fabric.model';

@Component({
  selector: 'app-test',
  standalone: true,           // make it standalone
  imports: [ FormsModule, CommonModule],
  templateUrl: './test.html',
  styleUrls: ['./test.css']
})
export class Test implements OnInit {

  fabrics: FabricModel[] = [];
  loading = true;

  constructor(private fabricService: FabricService) {}

  ngOnInit(): void {
    this.fabricService.getAll().subscribe({
      next: (res) => {
        this.fabrics = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching fabrics:', err);
        this.loading = false;
      }
    });
  }
}
