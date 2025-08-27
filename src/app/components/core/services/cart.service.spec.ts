import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;
  let mockProduct: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    
    mockProduct = {
      id: '1',
      name: 'Test Product',
      price: 25.99,
      description: 'Test Description',
      category: 'test',
      images: ['test.jpg'],
      stock: 10,
      rating: 4.5,
      reviews: 5,
      vendor: {
        id: 'vendor-1',
        name: 'Test Vendor'
      }
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    service.addToCart(mockProduct, 2);
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].product.id).toBe('1');
      expect(items[0].quantity).toBe(2);
    });
  });

  it('should update item quantity', () => {
    service.addToCart(mockProduct, 1);
    service.updateQuantity('1', 3);
    
    service.getCartItems().subscribe(items => {
      expect(items[0].quantity).toBe(3);
    });
  });

  it('should remove item from cart', () => {
    service.addToCart(mockProduct, 1);
    service.removeFromCart('1');
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
    });
  });

  it('should calculate total price', () => {
    service.addToCart(mockProduct, 2);
    
    service.getTotalPrice().subscribe(total => {
      expect(total).toBe(51.98); // 25.99 * 2
    });
  });

  it('should get cart item count', () => {
    service.addToCart(mockProduct, 3);
    
    service.getCartItemCount().subscribe(count => {
      expect(count).toBe(3);
    });
  });

  it('should clear cart', () => {
    service.addToCart(mockProduct, 1);
    service.clearCart();
    
    service.getCartItems().subscribe(items => {
      expect(items.length).toBe(0);
    });
  });

  it('should persist cart to localStorage', () => {
    service.addToCart(mockProduct, 1);
    
    // Create new service instance to test persistence
    const newService = TestBed.inject(CartService);
    
    newService.getCartItems().subscribe(items => {
      expect(items.length).toBe(1);
      expect(items[0].product.id).toBe('1');
    });
  });
});