import { IProduct } from "@types"

export class Catalog {
  private _products: IProduct[] = []
  private _selectedProduct: IProduct | null = null
  
  constructor(){}

  set products(value: IProduct[]){
    this._products = value;
  }
  get products(): IProduct[]{
    return [...this._products];
  }
  setItems(items:IProduct[]):void {
    this.products = items;
  }
  getItems():IProduct[]{
    return this.products;
  }

  getProductById(id: IProduct['id']): IProduct {
    const product = this._products.find(product=>product.id === id)
    if(!product) throw new Error('Товар не найден')
    return product
  }

  set selectedProduct(value: IProduct | null){
    this._selectedProduct = value;
  }
  get selectedProduct(): IProduct | null{
    return this._selectedProduct? { ...this._selectedProduct } : null;
  }
}

