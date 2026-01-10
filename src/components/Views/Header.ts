import { Component } from "../base/Component";
import { IEvents } from "../base/Events";
import { ensureElement } from "../../utils/utils";

export interface HeaderData{
  counter: number;
}

export class Header extends Component<HeaderData>{
  private basketButton: HTMLButtonElement;
  private counterElement: HTMLElement;

  constructor(private eventEmmiter: IEvents, container: HTMLElement){
    super(container);
    this.basketButton = ensureElement<HTMLButtonElement>('.header__basket', this.container);
    this.counterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
    this.basketButton.addEventListener('click', this.eventEmmiter.trigger('basket'))
  }

  set counter(value: number){
    this.counterElement.textContent = String(value);
  }
}
  