import { ShellModel } from '../../../shell/data-store';

export class EventItemModel {
  image: string;
  icon: string;
  name: string;
  description: string;
  category: string;
  address: string;
  rating: number;
  reviewsCount: number;
}

export class EventListingModel extends ShellModel {
  items: Array<EventItemModel> = [new EventItemModel(), new EventItemModel(), new EventItemModel(), new EventItemModel()];

  constructor() {
    super();
  }
}
