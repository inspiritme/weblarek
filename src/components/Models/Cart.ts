import {IProduct} from "@types"
import { IEvents } from "components/base/Events";

export class Cart {
  private cartItems: IProduct[] = [];

  constructor(private eventEmitter: IEvents){}

  getItems(): IProduct[] {
    return [...this.cartItems];
  }

  addItem(item: IProduct): void {
    if(!this.isInCart(item.id)){
      this.cartItems.push(item);
      this.eventEmitter.emit('cart:changed');
    }
  }

  removeItem(id: IProduct['id']): void {
    this.cartItems = this.cartItems.filter(item=>item.id !== id);
    this.eventEmitter.emit('cart:changed');
  }

  clearCart(): void {
    this.cartItems = [];
    this.eventEmitter.emit('cart:changed')
  }

  totalPrice(): number {
    return this.cartItems.reduce((acc,current)=>acc + Number(current.price), 0);
  }

  totalItems(): number {
    return this.cartItems.length;
  }

  isInCart(id: IProduct['id']): boolean {
    return this.cartItems.some(item=>item.id === id);
  }
}