import { ShellModel } from '../../../shell/data-store';

export class EventDetailsModel extends ShellModel {
  id: string;
  name: string;
  code: string;
  questions: Array<{ title: string; createdAt?: Date }> = [
    {
      title: '',
      createdAt: null,
    },
    {
      title: '',
      createdAt: null,
    },
    {
      title: '',
      createdAt: null,
    },
  ];

  constructor() {
    super();
  }
}
