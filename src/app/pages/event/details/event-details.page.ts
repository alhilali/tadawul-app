import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';

import { IResolvedRouteData, ResolverHelper } from '../../../services/utils/resolver-helper';
import { EventDetailsModel } from './event-details.model';
import { catchError, switchMap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { EventService } from '../event.service';
import { Order } from '../../../models/constants/order';
import { PageOptionsDto } from '../../../models/dto/PageOptionsDto';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { CreatePollPage } from '../../create-poll/create-poll.page';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./styles/event-details.page.scss', './styles/event-details.shell.scss'],
})
export class EventDetailsPage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  subscriptions: Subscription;

  details: EventDetailsModel;

  currentSegment = 'polls';
  notFound = false;

  @HostBinding('class.is-shell') get isShell() {
    return this.details && this.details.isShell ? true : false;
  }

  constructor(
    private route: ActivatedRoute,
    private socket: Socket,
    private eventService: EventService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
  ) {}

  ngOnInit(): void {
    this.subscriptions = this.route.data
      .pipe(
        // Extract data for this page
        switchMap((resolvedRouteData: IResolvedRouteData<EventDetailsModel>) => {
          // tslint:disable-next-line:no-string-literal
          return ResolverHelper.extractData<EventDetailsModel | any>(resolvedRouteData.data['dataStore'], EventDetailsModel);
        }),
      )
      .subscribe(
        (state) => {
          // if (state.error) {
          //   this.notFound = true;
          //   return;
          // } else if (!state.isShell) {
          //   this.details = state;
          //   this.loadQuestions();
          //   this.initSocket();
          // }
          // this.details = state;
					this.details = {
						code: '8887',
						name: 'الراجحي',
						price: 500,
						change: 0.189,
						isShell: false,
					};
        },
        (error) => console.log(error),
      );
  }

  initSocket() {
    // this.socket.connect();

    // this.socket.emit('joinRoom', this.details.id);

    // this.socket.fromEvent('newQuestion').subscribe((message: { title: string; createdAt: Date }) => {
    //   console.log(`newQuestion event ${JSON.stringify(message)}`);
    //   this.details.questions.unshift(message);
    // });
  }

  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {
    // this.subscriptions.unsubscribe();
    // this.socket.emit('leaveRoom', this.details.id);
  }

  ngOnDestroy() {
    // this.socket.emit('leaveRoom', this.details.id);
  }

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.currentSegment = ev.detail.value;
  }

  // loadQuestions() {
  //   const pageOpts = new PageOptionsDto();
  //   pageOpts.order = Order.DESC;
  //   this.eventService.getQuestions(this.details.id, pageOpts).subscribe((data) => {
  //     this.details.questions = data.data;
  //   });
  // }

  async showCreatePoll() {
    const modal = await this.modalController.create({
      component: CreatePollPage,
      componentProps: { event: this.details },
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);

    if (data?.success) {
      // this.router.navigate(['app/events', data.event.id], { replaceUrl: true });
    }
  }
}
