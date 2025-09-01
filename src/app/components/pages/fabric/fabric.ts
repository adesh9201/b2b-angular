import { Component, OnInit } from '@angular/core';
import { FabricService } from '../../core/services/fabric.service';
import { FabricModel } from '../../core/models/fabric.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { Filter } from '../../shared/filter/filter';

@Component({
  selector: 'app-fabric-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, Filter],
  templateUrl: './fabric.html',
  styleUrls: ['./fabric.css']
})
export class Fabric implements OnInit {
  fabrics: FabricModel[] = [];
  fabric?: FabricModel;              // ✅ single fabric detail (id से fetch के लिए)
  selectedFabric?: FabricModel;      // ✅ Quick View
  loading = false;
  search = '';

  constructor(
    private api: FabricService,
    private fabricService: FabricService,
    private route: ActivatedRoute    // ✅ id पकड़ने के लिए
  ) {}

  ngOnInit(): void {
    // पहले check करें कि URL में id है या नहीं
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchFabric(+id);   // अगर id है तो detail view के लिए fetch
    } else {
      this.fetch();            // वरना list fetch
    }
  }

  // ✅ list fetch
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

  // ✅ id से specific fabric fetch
  fetchFabric(id: number) {
    this.loading = true;
    this.fabricService.getById(id).subscribe({
      next: (data) => {
        this.fabric = data;
        this.loading = false;
      },
      error: () => (this.loading = false)
    });
  }

  // ✅ search filter
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

  // ✅ Quick View
  openQuickView(fabric: FabricModel) {
    this.selectedFabric = fabric;
  }

  addToCart(fabric: FabricModel) {
    console.log(`${fabric.fabName} added to cart`);
  }

    onFiltersApplied(filtered: FabricModel[]) {
    this.fabrics = filtered;
  }

}
