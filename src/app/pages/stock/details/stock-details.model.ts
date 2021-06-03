import { ShellModel } from '../../shell/data-store';

export class StockDetailsModel extends ShellModel {
  code: string;
  company: string;
	lastPrice: number;
	change: number;
	percentChange?: number;

  constructor() {
    super();
  }
}
