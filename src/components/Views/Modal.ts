import { IActions } from '@types';
import { Component } from '../base/Component';
import { ensureElement } from '@utils/utils';
export interface ModalData{
  content: HTMLElement;
}

type ModalActions = Pick<IActions, 'modalClose'>

export class Modal extends Component<ModalData>{
  private modalCloseButton: HTMLButtonElement;
  private modalContent: HTMLElement;
  private static instance: Modal;
  private constructor(container: HTMLElement, actions: ModalActions){
    super(container);
    this.modalCloseButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);
    this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);
    this.modalCloseButton.addEventListener('click', actions.modalClose)

    this.container.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        actions.modalClose()
      }
    })
  }
  static getInstance(container: HTMLElement, actions: ModalActions) {
    if (!this.instance) {
      this.instance = new Modal(container, actions);
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