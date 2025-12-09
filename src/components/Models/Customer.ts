import { IBuyer, TPayment } from "@types";

type TBuyerErrors = Partial<Record<keyof IBuyer, string>>;

export class Customer {
  private payment: TPayment = ''
  private address: string = ''
  private phone: string = ''
  private email: string = ''

  setInfo(info:Partial<IBuyer>): void {
    if (info.payment !== undefined) this.payment = info.payment;
    if (info.address !== undefined) this.address = info.address;
    if (info.phone !== undefined) this.phone = info.phone;
    if (info.email !== undefined) this.email = info.email;
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
    let errors: TBuyerErrors = {}
    const info = this.getInfo()

    if(info.payment === '') errors.payment = 'Не выбран вид оплаты';
    if(info.address === '') errors.address = 'Укажите адрес';
    if(info.phone === '') errors.phone = 'Укажите номер телефона';
    if(info.email === '') errors.email = 'Укажите емэйл';

    return errors 
  }

}