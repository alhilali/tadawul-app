import { Order } from '../constants/order';

export class PageOptionsDto {
  order: Order = Order.ASC;

  page: number = 1;

  take: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  q?: string;
}
