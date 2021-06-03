import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IResolvedRouteData, ResolverHelper } from '../../../services/utils/resolver-helper';
import { StockListingModel } from './stock-listing.model';
import { switchMap } from 'rxjs/operators';
import { StockService } from '../stock.service';
import { CreateStockPage } from '../create-stock/create-stock.page';
import { IonRouterOutlet, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-stock-listing',
  templateUrl: './stock-listing.page.html',
  styleUrls: ['./styles/stock-listing.page.scss', './styles/stock-listing.shell.scss'],
})
export class StockListingPage implements OnInit {
  // Gather all component subscription in one place. Can be one Subscription or multiple (chained using the Subscription.add() method)
  subscriptions: Subscription;

  listing: StockListingModel;

  @HostBinding('class.is-shell') get isShell() {
    return this.listing && this.listing.isShell ? true : false;
  }

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.subscriptions = this.route.data
      .pipe(
        // Extract data for this page
        switchMap((resolvedRouteData: IResolvedRouteData<StockListingModel>) => {
          // tslint:disable-next-line:no-string-literal
          return ResolverHelper.extractData<StockListingModel>(resolvedRouteData.data['dataStore'], StockListingModel);
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

  doRefresh(stock) {
    this.stockService.getListingDataSource().subscribe(
      (state) => {
        stock.target.complete();
        this.listing = state;
      },
      (error) => {
        console.log(error);
        stock.target.complete();
      },
    );
  }

  async showCreateStock() {
    const modal = await this.modalController.create({
      component: CreateStockPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      this.router.navigate(['app/stocks', data.stock.id], { replaceUrl: true });
    }
  }
}
