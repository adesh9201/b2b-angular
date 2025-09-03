import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterService } from '../../../components/core/services/footer.service';
import { FooterData } from '../../../components/core/models/footer.model';
import { finalize } from 'rxjs/operators';
import { RouterLink, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

declare const bootstrap: any; // bootstrap bundle is included in scripts

@Component({
  selector: 'app-footer-admin',
    imports: [FormsModule,ReactiveFormsModule , CommonModule  ,RouterModule,],
  templateUrl: './footer-admin.html',
  styleUrls: ['./footer-admin.css']
})
export class FooterAdmin implements OnInit, AfterViewInit {
  items: FooterData[] = [];
  loading = false;
  errorMessage = '';
  form: FormGroup;
  isEdit = false;
  editingId?: number | null = null;

  // pagination & search
  page = 1;
  pageSize = 10;
  filtered: FooterData[] = [];
  search = '';

  @ViewChild('modal') modalRef!: ElementRef;
  bootstrapModal: any;

  // toast
  @ViewChild('toast') toastRef!: ElementRef;
  toast: any;

  constructor(
    private fb: FormBuilder,
    private footerService: FooterService
  ) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    this.loadAll();
  }

  ngAfterViewInit(): void {
    if (this.modalRef) {
      this.bootstrapModal = new bootstrap.Modal(this.modalRef.nativeElement);
    }
    if (this.toastRef) {
      this.toast = new bootstrap.Toast(this.toastRef.nativeElement);
    }
  }

  buildForm(): FormGroup {
    return this.fb.group({
      newsletterHeading: ['', Validators.required],
      newsletterPlaceholder: [''],
      newsletterButton: ['Subscribe'],
      brandName: ['', Validators.required],
      logoUrl: [''],
      mobileAppHeading: [''],
      playStoreLink: [''],
      appStoreLink: [''],
      playStoreBadge: [''],
      appStoreBadge: [''],
      helpHeading: [''],
      phoneNumber: [''],
      timings: [''],
      companyLinks: this.fb.array([]),
      helpLinks: this.fb.array([]),
      quickLinks: this.fb.array([]),
      topCategories: this.fb.array([]),
      usPs: this.fb.array([]),
      socials: this.fb.array([]),
      policies: this.fb.array([]),
      copyText: ['']
    });
  }


  // convenience getters for form arrays
  companyLinks(): FormArray { return this.form.get('companyLinks') as FormArray; }
  helpLinks(): FormArray { return this.form.get('helpLinks') as FormArray; }
  quickLinks(): FormArray { return this.form.get('quickLinks') as FormArray; }
  topCategories(): FormArray { return this.form.get('topCategories') as FormArray; }
  usPs(): FormArray { return this.form.get('usPs') as FormArray; }
  socials(): FormArray { return this.form.get('socials') as FormArray; }
  policies(): FormArray { return this.form.get('policies') as FormArray; }

  private resetFormArrays() {
    ['companyLinks','helpLinks','quickLinks','topCategories','usPs','socials','policies'].forEach(key => {
      const arr = this.form.get(key) as FormArray;
      while (arr.length) arr.removeAt(0);
    });
  }

  loadAll() {
    this.loading = true;
    this.footerService.getAllFooters()
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: (res) => {
          this.items = res || [];
          this.applyFilter();
        },
        error: (err) => {
          this.errorMessage = 'Failed to load footer data.';
          console.error(err);
        }
      });
  }

  openCreate() {
    this.isEdit = false;
    this.editingId = null;
    this.form.reset();
    this.resetFormArrays();
    // seed default values if needed
    this.form.patchValue({ newsletterButton: 'Subscribe' });
    this.bootstrapModal?.show();
  }

  openEdit(item: FooterData) {
    this.isEdit = true;
    this.editingId = item.id ?? null;
    this.form.reset();
    this.resetFormArrays();

    // If backend stores arrays as JSON strings, convert first
    const parse = (x: any) => {
      if (!x) return [];
      return typeof x === 'string' ? JSON.parse(x) : x;
    };

    // fill arrays
    (parse(item.companyLinks) || []).forEach((l: any) => this.companyLinks().push(this.linkGroup(l)));
    (parse(item.helpLinks) || []).forEach((l: any) => this.helpLinks().push(this.linkGroup(l)));
    (parse(item.quickLinks) || []).forEach((l: any) => this.quickLinks().push(this.linkGroup(l)));
    (parse(item.topCategories) || []).forEach((l: any) => this.topCategories().push(this.linkGroup(l)));
    (parse(item.usPs) || []).forEach((l: any) => this.usPs().push(this.uspGroup(l)));
    (parse(item.socials) || []).forEach((l: any) => this.socials().push(this.socialGroup(l)));
    (parse(item.policies) || []).forEach((l: any) => this.policies().push(this.linkGroup(l)));

    // patch scalar fields
    this.form.patchValue({
      newsletterHeading: item.newsletterHeading,
      newsletterPlaceholder: item.newsletterPlaceholder,
      newsletterButton: item.newsletterButton,
      brandName: item.brandName,
      logoUrl: item.logoUrl,
      mobileAppHeading: item.mobileAppHeading,
      playStoreLink: item.playStoreLink,
      appStoreLink: item.appStoreLink,
      playStoreBadge: item.playStoreBadge,
      appStoreBadge: item.appStoreBadge,
      helpHeading: item.helpHeading,
      phoneNumber: item.phoneNumber,
      timings: item.timings,
      copyText: item.copyText
    });

    this.bootstrapModal?.show();
  }

  private linkGroup(obj?: any) {
    return this.fb.group({
      label: [obj?.label || '', Validators.required],
      url: [obj?.url || '', Validators.required]
    });
  }

  private uspGroup(obj?: any) {
    return this.fb.group({
      icon: [obj?.icon || '', Validators.required],
      title: [obj?.title || '', Validators.required],
      subtitle: [obj?.subtitle || '']
    });
  }

  private socialGroup(obj?: any) {
    return this.fb.group({
      icon: [obj?.icon || '', Validators.required],
      url: [obj?.url || '', Validators.required]
    });
  }

  addLink(arrName: string) {
    (this.form.get(arrName) as FormArray).push(this.linkGroup());
  }

  addUSP() {
    this.usPs().push(this.uspGroup());
  }

  addSocial() {
    this.socials().push(this.socialGroup());
  }

  removeAt(arrName: string, idx: number) {
    (this.form.get(arrName) as FormArray).removeAt(idx);
  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const payload: FooterData = this.preparePayload();

    this.loading = true;
    if (this.isEdit && this.editingId) {
      this.footerService.updateFooter(this.editingId, payload)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.showToast('Footer updated successfully');
            this.bootstrapModal?.hide();
            this.loadAll();
          },
          error: (err) => {
            console.error(err);
            this.showToast('Failed to update footer');
          }
        });
    } else {
      this.footerService.createFooter(payload)
        .pipe(finalize(() => this.loading = false))
        .subscribe({
          next: () => {
            this.showToast('Footer created successfully');
            this.bootstrapModal?.hide();
            this.loadAll();
          },
          error: (err) => {
            console.error(err);
            this.showToast('Failed to create footer');
          }
        });
    }
  }

  private preparePayload(): FooterData {
    // When sending to API, prefer arrays (backend should accept them).
    const getVal = (k: string) => this.form.get(k)?.value;
    return {
      newsletterHeading: getVal('newsletterHeading'),
      newsletterPlaceholder: getVal('newsletterPlaceholder'),
      newsletterButton: getVal('newsletterButton'),
      brandName: getVal('brandName'),
      logoUrl: getVal('logoUrl'),
      mobileAppHeading: getVal('mobileAppHeading'),
      playStoreLink: getVal('playStoreLink'),
      appStoreLink: getVal('appStoreLink'),
      playStoreBadge: getVal('playStoreBadge'),
      appStoreBadge: getVal('appStoreBadge'),
      helpHeading: getVal('helpHeading'),
      phoneNumber: getVal('phoneNumber'),
      timings: getVal('timings'),
      companyLinks: getVal('companyLinks') || [],
      helpLinks: getVal('helpLinks') || [],
      quickLinks: getVal('quickLinks') || [],
      topCategories: getVal('topCategories') || [],
      usPs: getVal('usPs') || [],
      socials: getVal('socials') || [],
      policies: getVal('policies') || [],
      copyText: getVal('copyText') || ''
    } as FooterData;
  }

  confirmDelete(item: FooterData) {
    if (!confirm('Delete this footer entry? This cannot be undone.')) return;
    this.loading = true;
    this.footerService.deleteFooter(item.id!)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: () => {
          this.showToast('Deleted successfully');
          this.loadAll();
        },
        error: (err) => {
          console.error(err);
          this.showToast('Delete failed');
        }
      });
  }

  showToast(message: string) {
    if (this.toastRef) {
      const el = this.toastRef.nativeElement.querySelector('.toast-body');
      if (el) el.textContent = message;
      this.toast?.show();
    } else {
      alert(message);
    }
  }

  // filtering & pagination helpers
  applyFilter() {
    const q = (this.search || '').toLowerCase();
    this.filtered = this.items.filter(i =>
      (i.brandName || '').toLowerCase().includes(q) ||
      (i.newsletterHeading || '').toLowerCase().includes(q) ||
      (i.copyText || '').toLowerCase().includes(q)
    );
    this.page = 1;
  }

  get paged(): FooterData[] {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
  return this.pageSize > 0 ? Math.ceil(this.filtered.length / this.pageSize) : 1;
}

prevPage() {
  if (this.page > 1) this.page--;
}

nextPage() {
  if (this.page < this.totalPages) this.page++;
}


}
