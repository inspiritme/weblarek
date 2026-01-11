import { IApiPostOrder } from "@types";
import { ensureElement } from "@utils/utils";
import { Component } from "../base/Component";
import { IActions } from "@types";

export interface ISuccess{
  total: Pick<IApiPostOrder, 'total'>
}

export class SuccessView extends Component<ISuccess>{
  private totalPrice: HTMLElement;
  private closeButton: HTMLButtonElement;
  constructor(container: HTMLElement, actions:Partial<IActions>){
    super(container);
    this.totalPrice = ensureElement('.order-success__description', this.container);
    this.closeButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container)

    if(actions.modalClose){
      this.closeButton.addEventListener('click', actions.modalClose)
    }
  }

  set total(value: Pick<IApiPostOrder, 'total'>){
    this.totalPrice.textContent = `Списано ${value} синапсов`;
  }
}