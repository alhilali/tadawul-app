import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IResolvedRouteData, ResolverHelper } from '../../../services/utils/resolver-helper';
import { EventListingModel } from './event-listing.model';
import { switchMap } from 'rxjs/operators';
import { EventService } from '../event.service';
import { CreateEventPage } from '../create-event/create-event.page';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-event-listing',
  templateUrl: './event-listing.page.html',
  styleUrls: ['./styles/event-listing.page.scss', './styles/event-listing.shell.scss'],
})
export class EventListingPage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  subscriptions: Subscription;

  listing: EventListingModel;

  @HostBinding('class.is-shell') get isShell() {
    return this.listing && this.listing.isShell ? true : false;
  }

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions = this.route.data
      .pipe(
        // Extract data for this page
        switchMap((resolvedRouteData: IResolvedRouteData<EventListingModel>) => {
          // tslint:disable-next-line:no-string-literal
          return ResolverHelper.extractData<EventListingModel>(resolvedRouteData.data['dataStore'], EventListingModel);
        }),
      )
      .subscribe(
        (state) => {
          console.log(state);

          this.listing = state;
        },
        (error) => console.log(error),
      );
  }

  // NOTE: Ionic only calls ngOnDestroy if the page was popped (ex: when navigating back)
  // Since ngOnDestroy might not fire when you navigate from the current page, use ionViewWillLeave to cleanup Subscriptions
  ionViewWillLeave(): void {
    this.subscriptions.unsubscribe();
  }

  doRefresh(event) {
    this.eventService.getListingDataSource().subscribe(
      (state) => {
        event.target.complete();
        this.listing = state;
      },
      (error) => {
        console.log(error);
        event.target.complete();
      },
    );
  }

  async showCreateEvent() {
    const modal = await this.modalController.create({
      component: CreateEventPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      this.router.navigate(['app/events', data.event.id], { replaceUrl: true });
    }
  }
}
