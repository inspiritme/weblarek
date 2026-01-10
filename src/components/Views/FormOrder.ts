import { Form } from "../base/Form";
import { ensureElement } from "@utils/utils";
import { TPayment, IOrderActions } from "@types";

const isPayment = (x: string): x is TPayment => x === 'card' || x === 'cash' || x === '';
const active = 'button_alt-active';

export class FormOrder extends Form{
  protected paymentTypes: HTMLElement; 
  protected address: HTMLInputElement;
  constructor(container: HTMLFormElement, actions:IOrderActions){
    super(container);
    this.address = ensureElement<HTMLInputElement>('input[name=address]', this.container);
    this.paymentTypes = ensureElement<HTMLElement>('.order__buttons', this.container);

    this.paymentTypes.addEventListener('click', (e)=>{
      if (!(e.target instanceof HTMLButtonElement)) return;

      const payment = e.target.name;
      if(!isPayment(payment)) return

      [...this.paymentTypes.children].forEach((el) => {
        if(el === e.target) return;
        el.classList.remove(active);
      });
      e.target.classList.toggle(active);

      actions.onClick({ payment: e.target.classList.contains(active)? payment : "" });

    })
    
    this.address.addEventListener('input', ()=>{
      actions.onInput({ address: this.address.value })
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