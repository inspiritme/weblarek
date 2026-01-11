import { Card } from "../base/Card";
import { IActions, IProduct } from "@types";
import { ensureElement } from "@utils/utils";
import { applyCategory } from "@utils/myUtils";
import { categoryMap } from "@utils/constants";

type Status = {
  textContent: string;
  disabled: boolean;
}
interface ICardPreview{
  product: IProduct;
  button: Status;
}

type CardActions = Pick<IActions, 'cardToggle'>

export class CardPreview extends Card<ICardPreview>{
  private cardImage: HTMLImageElement;
  private cardCategory: HTMLElement;
  private cardText: HTMLElement;
  private cardButton: HTMLButtonElement;
  constructor(container: HTMLElement, actions: CardActions){
    super(container);
    this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardText = ensureElement<HTMLElement>('.card__text', this.container);
    this.cardButton = ensureElement<HTMLButtonElement>('.card__button', this.container);

    this.cardButton.addEventListener('click', actions.cardToggle);
  }
  set image(src: string){
    this.setImage(this.cardImage, src);
  }
  set category(value: keyof typeof categoryMap){
    this.cardCategory.textContent = value;
    applyCategory(this.cardCategory, value);
  }
  set description(value: string){
    this.cardText.textContent = value;
  }
  set button(obj:{disabled:boolean, textContent:string}){
    Object.assign(this.cardButton, obj)
  }
}