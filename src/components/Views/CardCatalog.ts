import { ensureElement } from '@utils/utils';
import { IProduct } from '@types';
import { Card } from '../base/Card';
import { ICardActions } from '@types';
import { applyCategory } from '@utils/applyCategory';
import { categoryMap } from '@utils/constants';

export type CardCatalogData = Omit<IProduct, 'description'>

export class CardCatalog extends Card<CardCatalogData>{
  private cardCategory: HTMLElement;
  private cardImage: HTMLImageElement;
  constructor(container: HTMLElement, actions?: ICardActions){
    super(container);
    this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);
    if(actions?.onClick){
      this.container.addEventListener('click', actions.onClick);
    }
  }
  set category(value: keyof typeof categoryMap){
    this.cardCategory.textContent = value;
    applyCategory(this.cardCategory, value);
  }
  set image(src: string){
    this.setImage(this.cardImage, src);
  }
}