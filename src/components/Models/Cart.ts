import {IProduct} from "@types"

export class Cart {
  private _cartItems: IProduct[] = []

  constructor(){}

  get cartItems(): IProduct[] {
    return [...this._cartItems];
  }

  addItem(newItem: IProduct): void {
    this._cartItems.push(newItem);
  }

  removeItem(id: IProduct['id']): void {
    this._cartItems = this._cartItems.filter(item=>item.id !== id); // делегирование
  }

  clearCart(): void {
    this._cartItems = []; // делегирование
  }

  totalPrice(): number {
    return this._cartItems.reduce((acc,current)=>acc + Number(current.price), 0);
  }

  totalItems(): number {
    return this._cartItems.length;
  }

  isAvailable(id: IProduct['id']): boolean {
    return this._cartItems.some(item=>item.id === id);
  }
}