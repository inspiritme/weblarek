import { Card } from "../base/Card";
import { IProduct } from "@types";
import { ensureElement } from "@utils/utils";
import { ICardActions } from "@types";

interface IBasketView{
  product: IProduct;
  index: number;
}

export class CardBasket extends Card<IBasketView>{
  private basketIndex: HTMLElement;
  private basketDeleteButton: HTMLButtonElement;
  constructor(container: HTMLElement, actions: ICardActions){
    super(container);
    this.basketIndex = ensureElement<HTMLElement>('.basket__item-index', this.container);
    this.basketDeleteButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
    this.basketDeleteButton.addEventListener('click', actions.onClick)
  }

  set index(value:number){
    this.basketIndex.textContent = String(value);
  }
}