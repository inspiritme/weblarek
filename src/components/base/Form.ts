import { Component } from "./Component";
import { ensureElement } from "@utils/utils";

export interface IFormData{
  element:HTMLElement
}

export abstract class Form<T = {}> extends Component<T>{
  protected submitButton: HTMLButtonElement;
  protected errorField: HTMLElement;
  protected  constructor(container: HTMLElement){
    super(container);
    this.submitButton = ensureElement<HTMLButtonElement>('[type=submit]', this.container);
    this.errorField = ensureElement<HTMLElement>('.form__errors', this.container);
  }

  setSubmitEnable(enabled: boolean){
    this.submitButton.disabled = !enabled;
  }
  setErrors = (errors: string[]) => {
    this.errorField.textContent = errors.join(' * ');
  }  
}