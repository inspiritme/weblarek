import { IBuyer, TPayment } from "@types";

export class Customer implements IBuyer{
  private _payment: TPayment = ''
  private _address: string = ''
  private _phone: string = ''
  private _email: string = ''

  constructor(){}

  set payment(value: TPayment) { this._payment = value; }
  set address(value: string) { this._address = value; }
  set phone(value: string) { this._phone = value; }
  set email(value: string) { this._email = value; }

  getInfo(): IBuyer {
    return {
      'payment': this._payment,
      'address':this._address,
      'phone':this._phone,
      'email':this._email,
    }
  }

  clearInfo(): void {
    this._payment = '';
    this._address = '';
    this._phone = '';
    this._email = '';
  }

  validateInfo(): {[key:string]:string} {
    let errors: {[key:string]:string} = {}
    const info = this.getInfo()

    if(info.payment === '') errors.payment = 'Не выбран вид оплаты';
    if(info.address === '') errors.address = 'Укажите адрес';
    if(info.phone === '') errors.phone = 'Укажите номер телефона';
    if(info.email === '') errors.email = 'Укажите емэйл';

    return errors 
  }

}