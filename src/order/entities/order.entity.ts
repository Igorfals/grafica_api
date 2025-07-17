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
  cod_user: number;
  total: number;
}
