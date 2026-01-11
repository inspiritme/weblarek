import { Form } from "../base/Form"
import { ensureElement } from "@utils/utils";
import { IBuyer } from "@types"
import { IEvents } from "components/base/Events";

export interface IActions{
  onInput(data: Partial<IBuyer>): void
  onSubmit():void
}

export class FormContacts extends Form<Partial<IBuyer>>{
  private emailEl: HTMLInputElement; 
  private phoneEl: HTMLInputElement;
  constructor(container: HTMLFormElement, private events:IEvents){
    super(container);
    this.emailEl = ensureElement<HTMLInputElement>('input[name=email]', this.container);
    this.phoneEl = ensureElement<HTMLInputElement>('input[name=phone]', this.container);


    this.emailEl.addEventListener('input', (e)=>{
      if (!(e.target instanceof HTMLInputElement)) return;
      this.events.emit('customer:change', {email: e.target.value})
    })
    this.phoneEl.addEventListener('input', (e)=>{
      if (!(e.target instanceof HTMLInputElement)) return;
      this.events.emit('customer:change', {phone: e.target.value})
    })
    this.container.addEventListener('submit', (e)=>{
      e.preventDefault()
      this.events.emit('post')
    })
  }
  set email(value:string){
    this.emailEl.value = value
  }

  set phone(value:string){
    this.phoneEl.value = value
  }

}