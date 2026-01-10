import { Form } from "../base/Form"
import { ensureElement } from "@utils/utils";
import { IBuyer } from "@types"

export interface IActions{
  onInput(data: Partial<IBuyer>): void
  onSubmit():void
}

export class FormContacts extends Form{
  protected email: HTMLInputElement; 
  protected phone: HTMLInputElement;
  constructor(container: HTMLFormElement, actions:IActions){
    super(container);
    this.email = ensureElement<HTMLInputElement>('input[name=email]', this.container);
    this.phone = ensureElement<HTMLInputElement>('input[name=phone]', this.container);

    this.email.addEventListener('input', (e)=>{
      if (!(e.target instanceof HTMLInputElement)) return;
      actions.onInput({email:e.target.value})
    })
    this.phone.addEventListener('input', (e)=>{
      if (!(e.target instanceof HTMLInputElement)) return;
      actions.onInput({phone:e.target.value})
    })
    this.container.addEventListener('submit', (e)=>{
      e.preventDefault()
      actions.onSubmit();
    })
  }

  setErrors = (errors: string[]) => {
    this.errorField.textContent = errors.join(' • ');
    this.setSubmitEnable(!errors.length)
  }
}