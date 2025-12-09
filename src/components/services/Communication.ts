import { IApi, IApiGetResponse, IApiPostOrder } from '@types';

export class Communication{
  private api:IApi;
  constructor(api:IApi){
    this.api = api;
  }

  async getProducts(){
    return this.api.get<IApiGetResponse>('/product/')
  }

  async postOrder(order:IApiPostOrder){
    return this.api.post('/order/', order)
  }

}
