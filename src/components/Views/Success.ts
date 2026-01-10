import { IApiPostOrder } from "@types";
import { ensureElement } from "@utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/Events";

export interface ISuccess{
  total: Pick<IApiPostOrder, 'total'>
}

export class Success extends Component<ISuccess>{
  private totalPrice: HTMLElement;
  private successButton: HTMLButtonElement;
  constructor(container: HTMLElement, private eventEmmiter: IEvents){
    super(container);
    this.totalPrice = ensureElement('.order-success__description', this.container);
    this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container)

    this.successButton.addEventListener('click', this.eventEmmiter.trigger('modal:close'))
  }

  set total(value: Pick<IApiPostOrder, 'total'>){
    this.totalPrice.textContent = String(value);
  }
}