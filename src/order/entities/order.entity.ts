export class Order {
  id_order?: number;
  client_name: string;
  estimation: Date;
  date: Date;
  address: string;
  cellphone: string;
  city: string;
  is_ordered: boolean;
  items: any[];
  total_price: number;
  total_products: number;
  cod_user: number;
  total: number;
}
