import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, throwError } from 'rxjs';

import { IResolvedRouteData, ResolverHelper } from '../../../../services/utils/resolver-helper';
import { EventDetailsModel } from './event-details.model';
import { catchError, switchMap } from 'rxjs/operators';
import { Socket } from 'ngx-socket-io';
import { EventService } from '../../event/event.service';
import { LoadingController } from '@ionic/angular';
import { PageOptionsDto } from '../../../../models/dto/PageOptionsDto';
import { Order } from '../../../../models/constants/order';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./styles/event-details.page.scss', './styles/event-details.shell.scss'],
})
export class EventDetailsPage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  subscriptions: Subscription;

  details: EventDetailsModel;

  currentSegment = 'qas';
  notFound = false;
  question: string;

  loader: HTMLIonLoadingElement;

  @HostBinding('class.is-shell') get isShell() {
    return this.details && this.details.isShell ? true : false;
  }

  constructor(public loadingController: LoadingController, private route: ActivatedRoute, private socket: Socket, private eventsService: EventService) {}

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
          if (state.error) {
            this.notFound = true;
            return;
          } else if (!state.isShell) {
            this.details = state;
            this.loadQuestions();
            this.initSocket();
          }
          this.details = state;
        },
        (error) => console.log(error),
      );
  }

  initSocket() {
    this.socket.connect();

    this.socket.emit('joinRoom', this.details.id);

    this.socket.fromEvent('newQuestion').subscribe((message: { title: string; createdAt: Date }) => {
      console.log(`newQuestion event ${JSON.stringify(message)}`);
      this.details.questions.unshift(message);
    });
  }

  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {
    this.subscriptions.unsubscribe();
    this.socket.emit('leaveRoom', this.details.id);
  }

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    this.currentSegment = ev.detail.value;
  }
  sendQuestion(question) {
    this.presentLoading();
    this.eventsService.addQuestion(this.details.id, question).subscribe(
      (data) => {
        this.dismissLoading();
      },
      (error) => {
        console.log(error);
        this.dismissLoading();
      },
    );
    this.question = '';
  }

  async presentLoading() {
    this.loadingController
      .create({
        message: '',
      })
      .then((loader) => {
        this.loader = loader;
        this.loader.present();
      });
  }

  ngOnDestroy(): void {
    this.dismissLoading();
  }

  async dismissLoading() {
    if (this.loader) {
      await this.loader.dismiss();
    }
  }

  loadQuestions() {
    const pageOpts = new PageOptionsDto();
    pageOpts.order = Order.DESC;
    this.eventsService.getQuestions(this.details.id, pageOpts).subscribe((data) => {
      this.details.questions = data.data;
    });
  }
}
