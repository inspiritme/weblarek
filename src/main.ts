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
import { Success } from '@views/Success';
import { CardCatalog } from '@views/CardCatalog';
import { IApiPostOrder, IProduct } from '@types';
import { EventEmitter } from './components/base/Events';
import { ensureElement,cloneTemplate } from '@utils/utils';
import { OrderPresenter } from './components/Presenters/OrderPresenter';
import { ContactsPresenter } from './components/Presenters/ContactsPresenter';

const api = new Api(API_URL);
const communication = new Communication(api);
communication.getProducts()
  .then(productItems => {
    productsModel.setItems(productItems.items);
    const gallery = new Gallery(ensureElement<HTMLElement>('.gallery'))
    const elements = productsModel.getItems();

    const cards = elements.map((element)=>{
      const onClick = () => {
          if(productsModel.getItemById(element.id)){
            productsModel.setSelectedItem(element);
          }
      }
      return new CardCatalog(cloneTemplate<HTMLButtonElement>('#card-catalog'), {onClick}).render(element)
    })
    gallery.render({catalog:cards})
  })
  .catch(err => {
    console.error(err)
  })

const eventEmitter = new EventEmitter;
const productsModel = new Products(eventEmitter);
const cartModel = new Cart(eventEmitter);
const customerModel = new Customer(eventEmitter);
const header = new Header(eventEmitter, ensureElement<HTMLElement>('.header'))
const modal = Modal.getInstance(ensureElement<HTMLElement>('#modal-container'), eventEmitter)
const basket = Basket.getInstance(cloneTemplate<HTMLElement>('#basket'), eventEmitter);


function basketContent(items:IProduct[]){
  return items.map((element,index) => {
    const onClick = eventEmitter.trigger('card:remove', element);
    const el = new CardBasket(cloneTemplate("#card-basket"), {onClick});
    return el.render({...element, index: ++index})
  })
}

function previewContent(){
  const item = productsModel.getSelectedItem();
  if(!item) return;

  const onClick = eventEmitter.trigger('card:toggle', item)
  const card = new CardPreview(cloneTemplate('#card-preview'), {onClick});
  const isInCart = cartModel.isInCart(item.id);
  const isAvailable = !!item.price;
  const obj = {
    textContent: isInCart? 'Удалить из корзины' : isAvailable? 'Купить' : 'Недоступно',
    disabled: !isAvailable
  }
  return card.render({...item,button:obj})
}

interface ModalOpenPayload {content: HTMLElement;}

eventEmitter.on('modal', (data:ModalOpenPayload)=>{
  modal.render({content:data.content})
  eventEmitter.emit('modal:open')
})

eventEmitter.on('modal:open', () => modal.open())

eventEmitter.on('modal:close', ()=>{
  productsModel.setSelectedItem(null)
  modal.close();
})

eventEmitter.on('preview', () => {
  eventEmitter.emit('modal', {content:previewContent()})
})

eventEmitter.on('card:toggle', (item:IProduct)=>{
  if(cartModel.isInCart(item.id)){
    eventEmitter.emit('card:remove', item)
  } else{
    eventEmitter.emit('card:add', item)
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
    eventEmitter.emit('preview')
  } else{
    eventEmitter.emit('basket')
  }
})

eventEmitter.on('basket', ()=>{
  basket.render({
    content: basketContent(cartModel.getItems()),
    orderButton: Boolean(cartModel.totalItems()),
    totalPrice: cartModel.totalPrice()
  })
  eventEmitter.emit('modal', {
    content:basket.element
  })
})

eventEmitter.on('order', ()=>{
  const {form} = new OrderPresenter(cloneTemplate('#order'), customerModel, eventEmitter);
  eventEmitter.emit('modal', {content:form.element})
})

eventEmitter.on('contacts', ()=>{
  const {form} = new ContactsPresenter(cloneTemplate('#contacts'), customerModel, eventEmitter);
  eventEmitter.emit('modal', {content:form.element})
})

eventEmitter.on('post', ()=>{
  const items = cartModel.getItems().map(item=>item.id)
  const customerInfo = customerModel.getInfo();
  communication.postOrder({
    total: cartModel.totalPrice(),
    items,
    ...customerInfo,

  } as IApiPostOrder).then(result=>{
    const successView = new Success(cloneTemplate('#success'), eventEmitter).render(result)
    eventEmitter.emit('clear')
    eventEmitter.emit('modal', {content:successView})
  }) .catch(err => {
    console.error(err)
  })
})

eventEmitter.on('clear', ()=>{
  cartModel.clearCart();
  customerModel.clearInfo();
})
