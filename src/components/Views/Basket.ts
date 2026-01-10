import { Card } from "../base/Card";
import { IProduct } from "@types";
import { ensureElement } from "@utils/utils";
import { ICardActions } from "@types";
import { Component } from "../base/Component";
import { IEvents } from "components/base/Events";

export interface IBasketData{
  content: HTMLElement[];
  totalPrice: number;
  orderButton: boolean;
}

export class Basket extends Component<IBasketData>{
  private basketList: HTMLElement;
  private basketPrice: HTMLElement;
  private basketButton: HTMLButtonElement;
  private static instance: Basket;
  private constructor(container: HTMLElement, private eventEmmiter: IEvents){
    super(container);
    this.basketList = ensureElement<HTMLElement>('.basket__list', this.container);
    this.basketPrice = ensureElement<HTMLButtonElement>('.basket__price', this.container);
    this.basketButton = ensureElement<HTMLButtonElement>('.basket__button', this.container);

    this.basketButton.addEventListener('click', this.eventEmmiter.trigger('order'))
  }

  static getInstance(container: HTMLElement, eventEmmiter: IEvents) {
      if (!this.instance) {
        this.instance = new Basket(container, eventEmmiter);
      }
      return this.instance;
  }

  get element(): HTMLElement {
    return this.container;
  }

  set content(value: string){
    this.basketList.replaceChildren(...value);
  }

  set totalPrice(value: number){
    this.basketPrice.textContent = `${value} синапсов`;
  }

  setButtonState(isEnabled: boolean){
    this.basketButton.disabled = !isEnabled;
  }

  set orderButton(isEnabled:boolean){
    this.basketButton.disabled = !isEnabled;
  }

}