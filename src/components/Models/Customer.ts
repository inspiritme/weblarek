import { IBuyer, TPayment } from "@types";
import { IEvents } from "components/base/Events";

type CustomerChangeType = 'order' | 'contacts';

interface CustomerChangedEvent {
  type: CustomerChangeType;
  info: Partial<IBuyer>;
  errors: Partial<Record<keyof IBuyer, string>>;
}

export type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export class Customer {
  private payment: TPayment = ''
  private address: string = ''
  private phone: string = ''
  private email: string = ''

  constructor(private events:IEvents){}

  setInfo(info: Partial<IBuyer>): void {
    const oldValues = this.getInfo();
    const hasChanges = Object.entries(info).some(([k, v]) => oldValues[k as keyof IBuyer] !== v)
    if (!hasChanges) return;

    if (info.payment !== undefined) this.payment = info.payment;
    if (info.address !== undefined) this.address = info.address;
    if (info.phone !== undefined)   this.phone   = info.phone;
    if (info.email !== undefined)   this.email   = info.email;

    const isOrderChange = info.payment !== undefined || info.address !== undefined;
    const isContactsChange = info.phone !== undefined || info.email !== undefined;

    if (isOrderChange) {
      const data: CustomerChangedEvent = {
        type: 'order',
        info: this.getInfo(),
        errors: this.validateInfo(),
      };
      this.events.emit('customer:changed', data);
    }

    if (isContactsChange) {
      const data: CustomerChangedEvent = {
        type: 'contacts',
        info: this.getInfo(),
        errors: this.validateInfo(),
      };

      this.events.emit('customer:changed', data);
    }
  }

  getInfo(): IBuyer {
    return {
      'payment': this.payment,
      'address':this.address,
      'phone':this.phone,
      'email':this.email,
    }
  }

  clearInfo(): void {
    this.payment = '';
    this.address = '';
    this.phone = '';
    this.email = '';
  }

  validateInfo(): TBuyerErrors {
    const errors: TBuyerErrors = {}
    const info = this.getInfo()

    if(info.payment === '') errors.payment = 'Не выбран вид оплаты';
    if(info.address === '') errors.address = 'Укажите адрес';
    if(info.phone === '') errors.phone = 'Укажите номер телефона';
    if(info.email === '') errors.email = 'Укажите емэйл';

    return errors 
  }

}