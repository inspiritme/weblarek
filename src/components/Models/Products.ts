import { IProduct } from "@types"
import { IEvents } from "components/base/Events";

export class Products {
  private products: IProduct[] = []
  private selectedProduct: IProduct | null = null
  constructor(private eventEmitter: IEvents){}
  
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
    if(this.getSelectedItem()) {
      this.eventEmitter.emit('preview')
    }
  }

  getSelectedItem(): IProduct | null{
    return this.selectedProduct? { ...this.selectedProduct } : null;
  }

}

