import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { ProductService } from '../../core/services/product.service';
import { of } from 'rxjs';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProducts = [
    {
      id: '1',
      name: 'Test Product 1',
      price: 25.99,
      description: 'Test Description 1',
      category: 'test',
      images: ['test1.jpg'],
      stock: 10,
      rating: 4.5,
      reviews: 5,
      vendor: {
        id: 'vendor-1',
        name: 'Test Vendor'
      }
    },
    {
      id: '2',
      name: 'Test Product 2',
      price: 35.99,
      description: 'Test Description 2',
      category: 'test',
      images: ['test2.jpg'],
      stock: 15,
      rating: 4.8,
      reviews: 8,
      vendor: {
        id: 'vendor-2',
        name: 'Test Vendor 2'
      }
    }
  ];

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getFeaturedProducts']);

    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    mockProductService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load featured products on init', () => {
    mockProductService.getFeaturedProducts.and.returnValue(mockProducts);
    
    component.ngOnInit();
    
    expect(mockProductService.getFeaturedProducts).toHaveBeenCalled();
    expect(component.featuredProducts).toEqual(mockProducts);
  });

  it('should display featured products', () => {
    mockProductService.getFeaturedProducts.and.returnValue(mockProducts);
    component.ngOnInit();
    fixture.detectChanges();
    
    const productElements = fixture.nativeElement.querySelectorAll('[data-cy="product-card"]');
    expect(productElements.length).toBe(2);
  });

  it('should display product names', () => {
    mockProductService.getFeaturedProducts.and.returnValue(mockProducts);
    component.ngOnInit();
    fixture.detectChanges();
    
    const productNames = fixture.nativeElement.querySelectorAll('[data-cy="product-name"]');
    expect(productNames[0].textContent).toContain('Test Product 1');
    expect(productNames[1].textContent).toContain('Test Product 2');
  });

  it('should display product prices', () => {
    mockProductService.getFeaturedProducts.and.returnValue(mockProducts);
    component.ngOnInit();
    fixture.detectChanges();
    
    const productPrices = fixture.nativeElement.querySelectorAll('[data-cy="product-price"]');
    expect(productPrices[0].textContent).toContain('$25.99');
    expect(productPrices[1].textContent).toContain('$35.99');
  });

  it('should handle empty featured products', () => {
    mockProductService.getFeaturedProducts.and.returnValue([]);
    component.ngOnInit();
    fixture.detectChanges();
    
    const productElements = fixture.nativeElement.querySelectorAll('[data-cy="product-card"]');
    expect(productElements.length).toBe(0);
  });
});