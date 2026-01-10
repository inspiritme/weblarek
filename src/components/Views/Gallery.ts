import { Component } from '../base/Component';
import {cloneTemplate } from '@utils/utils';

export interface GalleryData{
  catalog: HTMLElement[];
}

export class Gallery extends Component<GalleryData>{
  protected catalogElement: HTMLElement;
  constructor(container: HTMLElement){
    super(container);
    this.catalogElement = cloneTemplate<HTMLElement>('#card-catalog')
  }

  set catalog(value: HTMLElement[]){
    this.container.replaceChildren(...value)
  }
}

