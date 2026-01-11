import { Component } from "./Component";
import { ensureElement } from "@utils/utils";

export abstract class Card<T> extends Component<T>{
  protected cardTitle: HTMLElement;
  protected cardPrice: HTMLElement;

  constructor(container: HTMLElement){
    super(container);
    this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container)
    this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container)
  }

  set title(value: string){
    this.cardTitle.textContent = value;
  }

  set price(value: number){
    this.cardPrice.textContent = value? `${value} синапсов` : 'Бесценно';
  }
}