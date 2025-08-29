import { Component, OnInit } from '@angular/core';
import { FabricDetailsService } from '../../core/services/fabric-details.service';
import { FabricDetail } from '../../core/models/fabric-details.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fabric-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fabric-details.html',
  styleUrls: ['./fabric-details.css']
})
export class FabricDetails implements OnInit {
  fabrics: FabricDetail[] = [];
  loading = false;
  search = '';

  constructor(private api: FabricDetailsService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.api.getAll().subscribe({
      next: (data) => {
        this.fabrics = data;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  filtered(): FabricDetail[] {
    const q = this.search.toLowerCase().trim();

    return this.fabrics
      .filter(x => !!x.fabName && x.fabName.trim() !== '')
      .filter(x =>
        !q ||
        [x.fabName, x.fabType, x.quality, x.color, x.count, x.construction, x.refNo]
          .filter(Boolean)
          .some(v => String(v).toLowerCase().includes(q))
      );
  }
}
