import { FormContacts } from "@views/FormContacts";
import { Customer } from "@models/Customer";
import { IEvents } from "components/base/Events";
import { IBuyer} from "@types";

export class ContactsPresenter {
  form: FormContacts
  constructor(
    container: HTMLFormElement,
    private customer: Customer,
    private eventEmmiter: IEvents
  ) {
    this.form = new FormContacts(container, {
      onInput: this.onChange,
      onSubmit: this.onSubmit,
    })
  }

  onChange = (data:Partial<IBuyer>) => {
    this.customer.setInfo(data);
    const {email, phone} = this.customer.validateInfo();
    const errors = [email, phone].filter((e): e is string => !!e)
    this.form.setErrors(errors);
  }

  onSubmit = () => this.eventEmmiter.emit('post')
}