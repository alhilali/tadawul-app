import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-create-stock',
  templateUrl: './create-stock.page.html',
  styleUrls: ['./styles/create-stock.page.scss'],
})
export class CreateStockPage implements OnInit {
  stockForm: FormGroup;
  redirectLoader: HTMLIonLoadingElement;

  validation_messages = {
    name: [],
    code: [{ type: 'minlength', message: 'Code must be at least 5 characters long.' }],
  };

  constructor(public loadingController: LoadingController, public router: Router, private modalController: ModalController, private stocksService: StockService) {
    this.stockForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      code: new FormControl(Math.floor(100000 + Math.random() * 900000), Validators.compose([Validators.minLength(6), Validators.required])),
    });
  }

  ngOnInit() {}

  async presentLoading() {
    this.loadingController
      .create({
        message: '',
      })
      .then((loader) => {
        this.redirectLoader = loader;
        this.redirectLoader.present();
      });
  }

  ngOnDestroy(): void {
    this.dismissLoading();
  }

  async dismissLoading() {
    if (this.redirectLoader) {
      await this.redirectLoader.dismiss();
    }
  }

  createStock() {
    this.presentLoading();
    const { name, code } = this.stockForm.value;

    this.stocksService.createStock(name, `${code}`, new Date().toISOString(), new Date().toISOString()).subscribe(
      (data) => {
        console.log(data);
        this.modalController.dismiss({ stock: data, success: true });
      },
      (error) => {
        console.log(error);
        this.dismissLoading();
      },
    );
  }
}
