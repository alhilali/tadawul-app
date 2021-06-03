import { ShellModel } from '../../shell/data-store';

export class StockItemModel {
  name: string;
  createdAt: Date;
}

export class StockListingModel extends ShellModel {
  items: Array<StockItemModel> = [new StockItemModel(), new StockItemModel(), new StockItemModel(), new StockItemModel()];

  constructor() {
    super();
  }
}
