import { IApi, IApiGetResponse, IApiPostOrder } from '@types';

export class Communication{
  private _api:IApi;
  constructor(api:IApi){
    this._api = api;
  }

  async getProducts(){
    return this._api.get<IApiGetResponse>('/product/')
  }

  async postOrder(order:IApiPostOrder){
    return this._api.post('/order/', order)
  }

}
