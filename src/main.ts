import './scss/styles.scss';
import { Catalog } from '@models/Catalog';
import { Cart } from '@models/Cart';
import { Customer } from "@models/Customer";
import { Communication } from '@services/Communication';
import { Api } from './components/base/Api';
import { API_URL } from './utils/constants';

const catalog = new Catalog;
const cart = new Cart;
const customer = new Customer;
const api = new Api(API_URL);
const communication = new Communication(api);
const productItems = await communication.getProducts();
catalog.setItems(productItems.items)
console.log(catalog.getItems())