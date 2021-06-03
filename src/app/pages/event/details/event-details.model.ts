import { ShellModel } from '../../shell/data-store';

export class EventDetailsModel extends ShellModel {
  name: string;
  code: string;
	price: number;
	change: number;

  constructor() {
    super();
  }
}
