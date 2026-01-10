import { FormOrder } from "@views/FormOrder";
import { Customer } from "@models/Customer";
import { IEvents } from "components/base/Events";
import { IBuyer} from "@types";

export class OrderPresenter {
  form: FormOrder
  constructor(
    container: HTMLFormElement,
    private customer: Customer,
    private eventEmmiter: IEvents
  ) {
    this.form = new FormOrder(container, {
      onClick: this.onChange,
      onInput: this.onChange,
      onSubmit: this.onSubmit,
    })
  }

  onChange = (data:Partial<IBuyer>) => {
    this.customer.setInfo(data);
    const {payment, address} = this.customer.validateInfo();
    const errors = [payment, address].filter((e): e is string => !!e)
    this.form.setErrors(errors);
  }

  onSubmit = () => {this.eventEmmiter.emit('contacts')}

}