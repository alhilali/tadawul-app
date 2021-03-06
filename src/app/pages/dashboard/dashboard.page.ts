import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { CreateStockPage } from '../stock/create-stock/create-stock.page';
import { StockDetailsModel } from '../stock/details/stock-details.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./styles/dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
	topTickersSlideOpts = {
    initialSlide: 0,
    speed: 400,
		slidesPerView: 4.2,
  };
	topTickers: StockDetailsModel[] = [
		{
			code: '2010',
			company: 'سابك',
			lastPrice: 500,
			change: 0.015
		},
		{
			code: '2222',
			company: 'ارامكو',
			lastPrice: 500,
			change: -0.08
		},
		{
			code: '1120',
			company: 'الراجحي',
			lastPrice: 500,
			change: 0.189
		},
		{
			code: '7010',
			company: 'الاتصالات',
			lastPrice: 500,
			change: 0.24
		},
		{
			code: '8230',
			company: 'تكافل',
			lastPrice: 500,
			change: -0.1
		}
	]

	news = [
		{
			title: 'إعلان شركة التأمين العربية التعاونية عن نتائج اجتماع الجمعية العامة العادية ( الاجتماع الأول ) ',
			date: '2/6/2020 1:00:00',
			tickers: [
				{
					name: 'سابك',
					price: 500,
					change: 0.015
				},
			]
		},
		{
			title: 'تدعو شركة بوبا العربية للتأمين التعاوني مساهميها إلى حضور اجتماع الجمعية العامة غير العادية (الاجتماع الأول) عن طريق وسائل التقنية الحديثة',
			date: '2/6/2020 1:00:00',
			tickers: [
				{
					name: 'الاتصالات',
					price: 500,
					change: 0.24
				},
				{
					name: 'تكافل',
					price: 500,
					change: -0.1
				}
			]
		},
		{
			title: 'إعلان الشركة الخليجية العامة للتأمين التعاوني عن نشر نشرة إصدار أسهم حقوق الأولوية',
			date: '2/6/2020 1:00:00',
			tickers: [
				{
					name: 'الاتصالات',
					price: 500,
					change: 0.24
				},
			]
		},
		{
			title: 'إعلان شركة المملكة القابضة عن نتائج اجتماع الجمعية العامة العادية ( الاجتماع الأول )',
			date: '2/6/2020 1:00:00',
			tickers: [
				{
					name: 'ارامكو',
					price: 500,
					change: -0.08
				},
			]
		},
	]
  constructor(public modalController: ModalController, private routerOutlet: IonRouterOutlet, private route: Router) {}

  ngOnInit() {}

  async showCreateEvent() {
    const modal = await this.modalController.create({
      component: CreateStockPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if (data?.success) {
      this.route.navigate(['app/events', data.event.id], { replaceUrl: true });
    }
  }

	doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
}
