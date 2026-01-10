import { Component } from '../base/Component';
import { ensureElement } from '@utils/utils';
import { IEvents } from 'components/base/Events';
export interface ModalData{
  content: HTMLElement;
}

export class Modal extends Component<ModalData>{
  private modalCloseButton: HTMLButtonElement;
  private modalContent: HTMLElement;
  private static instance: Modal;
  private constructor(container: HTMLElement, private eventEmmiter: IEvents){
    super(container);
    this.modalCloseButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);
    this.modalCloseButton.addEventListener('click', this.eventEmmiter.trigger('modal:close'))

    this.container.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.eventEmmiter.emit('modal:close');
      }
    })
  }
  static getInstance(container: HTMLElement, events: IEvents) {
    if (!this.instance) {
      this.instance = new Modal(container, events);
    }
    return this.instance;
  }
  
  get content(){
    return this.modalContent;
  }

  set content(value: HTMLElement){
    this.modalContent.replaceChildren(value);
  }

  open(){
    this.container.classList.add('modal_active');
  }
  
  close(){
    this.container.classList.remove('modal_active');
  }
}