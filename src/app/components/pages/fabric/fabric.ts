import { Component, OnInit } from '@angular/core';
import { FabricService } from '../../core/services/fabric.service';
import { FabricDetails_20241012 } from '../../core/models/fabric.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fabric',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './fabric.html',
  styleUrls: ['./fabric.css']
})
export class Fabric implements OnInit {
  fabrics: FabricDetails_20241012[] = [];
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

filtered(): FabricDetails_20241012[] {
  const q = this.search.toLowerCase().trim();

  return this.fabrics.filter(x =>
    !q ||
    [x.faB_NAME, x.faB_TYPE, x.quality, x.color, x.count, x.construction, x.reF_NO]
      .filter(Boolean)
      .some(v => String(v).toLowerCase().includes(q))
  );
}


}
