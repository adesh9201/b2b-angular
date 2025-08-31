import { Component, OnInit } from '@angular/core';
import { FabricService } from '../../core/services/fabric.service';
import { FabricModel } from '../../core/models/fabric.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fabric-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fabric.html',
  styleUrls: ['./fabric.css']
})
export class Fabric implements OnInit {
  fabrics: FabricModel[] = [];
  loading = false;
  search = '';

  constructor(private api: FabricService) {}

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

  filtered(): FabricModel[] {
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
