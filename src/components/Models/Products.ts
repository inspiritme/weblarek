import { IProduct } from "@types"

export class Products {
  private products: IProduct[] = []
  private selectedProduct: IProduct | null = null
  
  setItems(items:IProduct[]):void {
    this.products = items;
  }

  getItems():IProduct[]{
    return [...this.products];
  }

  getItemById(id: IProduct['id']): IProduct {
    const product = this.products.find(product=>product.id === id)
    if(!product) throw new Error('Товар не найден')
    return product
  }
  
  setSelectedItem(value: IProduct | null){
    this.selectedProduct = value;
  }

  getSelectedItem(): IProduct | null{
    return this.selectedProduct? { ...this.selectedProduct } : null;
  }

}

