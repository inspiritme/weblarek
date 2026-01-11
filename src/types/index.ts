export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export interface IApi {
    get<T extends object>(uri: string): Promise<T>;
    post<T extends object>(uri: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TPayment = "card" | "cash" | "";

export interface IProduct {
    id:string;
    title:string;
    image:string;
    category:string;
    price:number|null;
    description:string;
}

export interface IBuyer {
    payment:TPayment;
    address:string;
    email:string;
    phone:string;
}

export interface IApiGetResponse {
  items: IProduct[];
}

export interface IApiPostOrder extends IBuyer{
  total: number;
  items: string[];
}

export interface GalleryData{
  catalog: HTMLElement[];
}

export interface IActions{
  modalClose():void;
  cardToggle():void;
  removeCard():void;
}

export interface ICardActions{
  onClick(event: MouseEvent): void;
}

export interface IOrderActions {
  onClick(data: Partial<IBuyer>): void;
  onInput(data: Partial<IBuyer>): void;
  onSubmit(): void;
}