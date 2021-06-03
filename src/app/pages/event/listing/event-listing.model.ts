import { ShellModel } from '../../shell/data-store';

export class EventItemModel {
  name: string;
  createdAt: Date;
}

export class EventListingModel extends ShellModel {
  items: Array<EventItemModel> = [new EventItemModel(), new EventItemModel(), new EventItemModel(), new EventItemModel()];

  constructor() {
    super();
  }
}
