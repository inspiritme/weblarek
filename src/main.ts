import './scss/styles.scss';
import { Products } from '@models/Products';
import { Cart } from '@models/Cart';
import { Customer } from "@models/Customer";
import { Communication } from '@services/Communication';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';
import { apiProducts } from './utils/data';

//тестируем Каталог
const productsModel = new Products;
productsModel.setItems(apiProducts.items); 
console.log(`Массив товаров из каталога: `, productsModel.getItems())
console.log(`получение одного товара по его id: `, productsModel.getItemById("b06cde61-912f-4663-9751-09956c0eed67"))
productsModel.setSelectedItem(productsModel.getItems()[1])
console.log(`получение товара для подробного отображения по индексу 1: `, productsModel.getSelectedItem())

//тестируем Корзину
const cartModel = new Cart;
cartModel.addItem(productsModel.getItems()[3]) // добавление элемента
cartModel.addItem(productsModel.getItems()[1])
cartModel.addItem(productsModel.getItems()[2])
cartModel.removeItem(cartModel.getItems()[0].id) // удаление элемента
console.log(`получение массива товаров, которые находятся в корзине: `, cartModel.getItems())
console.log(`получение общей стоимости всех товаров в корзине: `, cartModel.totalPrice())
console.log(`получение количества товаров в корзине: `, cartModel.totalItems())
console.log(`проверка наличия товара по id: `, cartModel.isAvailable("c101ab44-ed99-4a54-990d-47aa2bb4e7d9")) 
cartModel.clearCart()
console.log('корзина должна быть пустой: ',cartModel.getItems())

// тестируем модель покупателя
const customerModel = new Customer;
customerModel.setInfo({address:'улица Пушкина'})
customerModel.setInfo({email:'aaa@bbb.ru'})
console.log(customerModel.validateInfo())
customerModel.setInfo({phone:'+77003001763',payment:'card', email:'test@email.ru'})
console.log(customerModel.validateInfo())
console.log(customerModel.getInfo())
customerModel.clearInfo()
console.log("данные быть сброшены: ", customerModel.getInfo())
console.log("валидация должна показывать ошибки: ", customerModel.validateInfo())

// подключение к апи
const api = new Api(API_URL);
const communication = new Communication(api);
communication.getProducts()
  .then(productItems => {
    productsModel.setItems(productItems.items);
    console.log("получаем все товары которые получили с сервера: ", productsModel.getItems())
  })
  .catch(err => {
    console.error(err)
  })