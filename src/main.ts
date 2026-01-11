import './scss/styles.scss';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { Communication } from '@services/Communication';
import { Products } from '@models/Products';
import { Cart } from '@models/Cart';
import { Customer } from "@models/Customer";
import { Header } from '@views/Header';
import { Gallery } from '@views/Gallery';
import { Modal } from '@views/Modal';
import { Basket } from '@views/Basket';
import { CardPreview } from '@views/CardPreview';
import { CardBasket } from '@views/CardBasket';
import { SuccessView } from '@views/Success';
import { CardCatalog } from '@views/CardCatalog';
import { IApiPostOrder, IProduct } from '@types';
import { EventEmitter } from './components/base/Events';
import { ensureElement,cloneTemplate } from '@utils/utils';
import { IBuyer } from '@types';
import { FormOrder } from '@views/FormOrder';
import { errorsArray } from '@utils/myUtils';
import { TBuyerErrors } from '@models/Customer';
import { FormContacts } from '@views/FormContacts';

const api = new Api(API_URL);
const communication = new Communication(api);
communication.getProducts()
  .then(productItems => {
    productsModel.setItems(productItems.items);
  })
  .catch(err => {
    console.error(err)
  })

const eventEmitter = new EventEmitter;
const modalClose = eventEmitter.trigger('modal:close')
const cardToggle = eventEmitter.trigger('card:toggle')
const removeCard = eventEmitter.trigger('card:remove')

const productsModel = new Products(eventEmitter);
const cartModel = new Cart(eventEmitter);
const customerModel = new Customer(eventEmitter);
const header = new Header(eventEmitter, ensureElement<HTMLElement>('.header'))
const modal = Modal.getInstance(ensureElement<HTMLElement>('#modal-container'), {modalClose})
const basket = new Basket(cloneTemplate<HTMLElement>('#basket'), eventEmitter);
const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'))
const formOrder = new FormOrder(cloneTemplate('#order'), eventEmitter);
const formContacts = new FormContacts(cloneTemplate('#contacts'), eventEmitter);
const cardPreview = new CardPreview(cloneTemplate('#card-preview'), {cardToggle});
const successView = new SuccessView(cloneTemplate('#success'), {modalClose})


export interface IInfo{info:Partial<IBuyer>, errors:TBuyerErrors, type:string}

function basketContent(items:IProduct[]){
  return items.map((element,index) => {
    const onClick = () => removeCard(element);
    const el = new CardBasket(cloneTemplate("#card-basket"), {onClick});
    return el.render({...element, index: ++index})
  })
}

function previewContent(){
  const item = productsModel.getSelectedItem();
  if(!item) return;
  const isInCart = cartModel.isInCart(item.id);
  const isAvailable = !!item.price;
  const btnState = {
    textContent: isInCart? 'Удалить из корзины' : isAvailable? 'Купить' : 'Недоступно',
    disabled: !isAvailable
  }
  const data = isInCart? {} : item
  return cardPreview.render({
    ...data,
    button:btnState
  })
}

interface ModalOpenPayload {content: HTMLElement;}

eventEmitter.on('catalog', (galleryItems:IProduct[])=>{
  const cards = galleryItems.map((element)=>{
    const onClick = () => {
        if(productsModel.getItemById(element.id)){
          productsModel.setSelectedItem(element);
        }
    }
    return new CardCatalog(cloneTemplate<HTMLButtonElement>('#card-catalog'), {onClick}).render(element)
  })
  gallery.render({catalog:cards})
})

eventEmitter.on('modal', (data:ModalOpenPayload)=>{
  modal.render({content:data.content})
  modal.open()
})

eventEmitter.on('modal:open', () => modal.open())

eventEmitter.on('modal:close', ()=>{
  productsModel.setSelectedItem(null)
  modal.close();
})

eventEmitter.on('preview', () => {
  modal.render({content:previewContent()})
  modal.open()
})

eventEmitter.on('card:toggle', ()=>{
  const item = productsModel.getSelectedItem()
  if(!item) return
  if(cartModel.isInCart(item.id)){
    cartModel.removeItem(item.id)
    productsModel.setSelectedItem(null)
    modal.close()
  } else{
    cartModel.addItem(item)
  }
})

eventEmitter.on('card:add', (item:IProduct)=>{
  cartModel.addItem(item)
})

eventEmitter.on('card:remove', (item:IProduct)=>{
  cartModel.removeItem(item.id)
})

eventEmitter.on('cart:changed', ()=>{
  header.render({ counter: cartModel.totalItems() });
  basket.render({ orderButton:cartModel.totalItems()>0 });
  if(productsModel.getSelectedItem()){
    previewContent()
  } else{
    basket.render({
      content: basketContent(cartModel.getItems()),
      orderButton: Boolean(cartModel.totalItems()),
      totalPrice: cartModel.totalPrice()
    })
  }
})

eventEmitter.on('basket', ()=>{
  basket.render({
    content: basketContent(cartModel.getItems()),
    orderButton: Boolean(cartModel.totalItems()),
    totalPrice: cartModel.totalPrice()
  })
  modal.render({content:basket.element})
  modal.open();
})

eventEmitter.on('customer:change', (data)=>{
    customerModel.setInfo(data)
})

eventEmitter.on('customer:changed', (data:IInfo)=>{
  const {payment, address, ...contacts} = data.errors;
  if(data.type === 'order'){
    const errors = errorsArray([payment, address] as string[])
    formOrder.render(data.info as object)
    formOrder.setErrors(errors)
    formOrder.setSubmitEnable(errors.length===0)
  } else{
    const errors = errorsArray(Object.values(contacts))
    formContacts.render(data.info as object)
    formContacts.setErrors(errors)
    formContacts.setSubmitEnable(errors.length===0)
  }
})

eventEmitter.on('order', ()=>{
  formOrder.setSubmitEnable(false)
  modal.render({content:formOrder.render()})
  modal.open()
})

eventEmitter.on('contacts', ()=>{
  formContacts.setSubmitEnable(false)
  modal.render({content:formContacts.render()})
})

eventEmitter.on('post', ()=>{
  const items = cartModel.getItems().map(item=>item.id)
  const customerInfo = customerModel.getInfo();
  communication.postOrder({
    total: cartModel.totalPrice(),
    items,
    ...customerInfo,
  } as IApiPostOrder).then(result=>{
    cartModel.clearCart();
    customerModel.clearInfo();
    const info = customerModel.getInfo()

    formOrder.setSubmitEnable(false)
    formOrder.render(info);
    formContacts.setErrors([])
    formContacts.render(info);
    modal.render({content:successView.render(result)})
  }) .catch(err => {
    console.error(err)
  })
})