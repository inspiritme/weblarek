import { Component } from "./Component";
import { ensureElement } from "@utils/utils";

export interface IFormData{
  element:HTMLElement
}

export abstract class Form extends Component<HTMLElement>{
  protected submitButton: HTMLButtonElement;
  protected errorField: HTMLElement;
  protected  constructor(container: HTMLElement){
    super(container);
    this.submitButton = ensureElement<HTMLButtonElement>('[type=submit]', this.container);
    this.errorField = ensureElement<HTMLElement>('.form__errors', this.container);
  }

  get element(): HTMLElement {
    return this.container;
  }

  setSubmitEnable(enabled: boolean){
    this.submitButton.disabled = !enabled;
  }
}