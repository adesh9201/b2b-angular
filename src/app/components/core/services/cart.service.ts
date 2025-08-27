
// local storage me nahi save rahega cart item


// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { CartItem, OrderSummary } from '../models/cart.model';
// import { Product } from '../models/product.model';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {
//   private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
//   private shippingCost = 15;
//   private discount = 0;

//   constructor() {
//     // Example default data
//     this.cartItemsSubject.next([
// // Item Added Here
//       ]);
//   }

//   getCartItems(): Observable<CartItem[]> {
//     return this.cartItemsSubject.asObservable();
//   }

//     getCartItemCount(): Observable<number> {
//     return this.cartItemsSubject.asObservable().pipe(
//       map(items => items.reduce((sum, item) => sum + item.quantity, 0))
//     );
//   }


//   updateQuantity(itemId: number, qty: number) {
//     const items = this.cartItemsSubject.getValue().map(item =>
//       item.id === itemId ? { ...item, quantity: qty } : item
//     );
//     this.cartItemsSubject.next(items);
//   }

//   removeItem(itemId: number) {
//     const items = this.cartItemsSubject.getValue().filter(item => item.id !== itemId);
//     this.cartItemsSubject.next(items);
//   }

//   applyPromoCode(code: string): boolean {
//     if (code.toLowerCase() === 'save10') {
//       this.discount = 10;
//       return true;
//     }
//     this.discount = 0;
//     return false;
//   }

//   setShipping(cost: number) {
//     this.shippingCost = cost;
//   }

//   getOrderSummary(): OrderSummary {
//     const subtotal = this.cartItemsSubject.getValue()
//       .reduce((sum, item) => sum + item.price * item.quantity, 0);
//     return {
//       subtotal,
//       shipping: this.shippingCost,
//       discount: this.discount,
//       total: subtotal + this.shippingCost - this.discount
//     };
//   }




//   addToCart(product: Product, quantity: number = 1) {
//   const items = this.cartItemsSubject.getValue();
//   const existingItem = items.find(item => item.id === product.id);

//   if (existingItem) {
//     // If already in cart, increase quantity
//     existingItem.quantity += quantity;
//   } else {
//     // Add new item
//     items.push({
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       quantity,
//       image: product.imageUrl
//     });
//   }

//   this.cartItemsSubject.next([...items]);
// }

// }





// local storage me save rahega cart item


import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, OrderSummary } from '../models/cart.model';
import { Product } from '../models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private shippingCost = 15;
  private discount = 0;

  constructor() {
    // Page load pe localStorage se cart items load karo
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  // LocalStorage me save karne ka private method
  private saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSubject.getValue()));
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemsSubject.asObservable().pipe(
      map(items => items.reduce((sum, item) => sum + item.quantity, 0))
    );
  }

  addToCart(product: Product, quantity: number = 1) {
    const items = this.cartItemsSubject.getValue();
    const existingItem = items.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity; // agar duplicate hai to quantity increase
    } else {
      items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.imageUrl
      });
    }

    this.cartItemsSubject.next([...items]);
    this.saveCart(); // persist kar do
  }

  updateQuantity(itemId: number, qty: number) {
    const items = this.cartItemsSubject.getValue().map(item =>
      item.id === itemId ? { ...item, quantity: qty } : item
    );
    this.cartItemsSubject.next(items);
    this.saveCart(); // persist
  }

  removeItem(itemId: number) {
    const items = this.cartItemsSubject.getValue().filter(item => item.id !== itemId);
    this.cartItemsSubject.next(items);
    this.saveCart(); // persist
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    this.saveCart();
  }

  applyPromoCode(code: string): boolean {
    if (code.toLowerCase() === 'save10') {
      this.discount = 10;
      return true;
    }
    this.discount = 0;
    return false;
  }

  setShipping(cost: number) {
    this.shippingCost = cost;
  }

  getOrderSummary(): OrderSummary {
    const subtotal = this.cartItemsSubject.getValue()
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    return {
      subtotal,
      shipping: this.shippingCost,
      discount: this.discount,
      total: subtotal + this.shippingCost - this.discount
    };
  }
}

