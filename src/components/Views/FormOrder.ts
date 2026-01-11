import { Form } from "../base/Form";
import { ensureElement } from "@utils/utils";
import { TPayment, IBuyer } from "@types";
import { IEvents } from "components/base/Events";

const isPayment = (x: string): x is TPayment => x === 'card' || x === 'cash' || x === '';
const active = 'button_alt-active';

export class FormOrder extends Form<Partial<IBuyer>>{
  private paymentTypes: HTMLElement; 
  private addressEl: HTMLInputElement;
  constructor(container: HTMLFormElement, private events:IEvents){
    super(container);
    this.addressEl = ensureElement<HTMLInputElement>('input[name=address]', this.container);
    this.paymentTypes = ensureElement<HTMLElement>('.order__buttons', this.container);

    this.paymentTypes.addEventListener('click', (e)=>{
      if (!(e.target instanceof HTMLButtonElement)) return;
      const payment = e.target.name;
      if(!isPayment(payment)) return;
      this.events.emit('customer:change', {payment})
    })
    
    this.addressEl.addEventListener('input', ()=>{
      this.events.emit('customer:change', { address: this.addressEl.value })
    })

    this.container.addEventListener('submit', (e)=>{
      e.preventDefault()
      this.events.emit('contacts')
    })
    
  }

  set payment(value:TPayment){
    [...this.paymentTypes.children].forEach((el) => {
      if(el.getAttribute('name') === value) 
        el.classList.add(active)
      else 
        el.classList.remove(active)
    });
  }

  set address(value:string){
    this.addressEl.value = value
  }

}