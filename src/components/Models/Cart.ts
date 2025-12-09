import {IProduct} from "@types"

export class Cart {
  private cartItems: IProduct[] = []

  getItems(): IProduct[] {
    return [...this.cartItems];
  }

  addItem(newItem: IProduct): void {
    this.cartItems.push(newItem);
  }

  removeItem(id: IProduct['id']): void {
    this.cartItems = this.cartItems.filter(item=>item.id !== id);
  }

  clearCart(): void {
    this.cartItems = [];
  }

  totalPrice(): number {
    return this.cartItems.reduce((acc,current)=>acc + Number(current.price), 0);
  }

  totalItems(): number {
    return this.cartItems.length;
  }

  isAvailable(id: IProduct['id']): boolean {
    return this.cartItems.some(item=>item.id === id);
  }
}