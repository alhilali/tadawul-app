import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { StockDetailsModel } from '../stock/details/stock-details.model';
import { StockService } from '../stock/stock.service';

@Component({
  selector: 'app-create-poll',
  templateUrl: './create-poll.page.html',
  styleUrls: ['./styles/create-poll.page.scss'],
})
export class CreatePollPage implements OnInit {
  pollForm: FormGroup;
  redirectLoader: HTMLIonLoadingElement;

  validation_messages = {
    name: [],
    options: [],
  };

  customPopoverOptions: any = {
    cssClass: 'customListPopover',
  };

  @Input('event') event: StockDetailsModel;

  constructor(public loadingController: LoadingController, public router: Router, private modalController: ModalController, private stockService: StockService) {
    this.pollForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      options: new FormArray([new FormControl('', Validators.compose([Validators.required]))]),
    });

    this.options.valueChanges.subscribe((optionsArray) => {
      const lastOption = optionsArray[this.options.length - 1];
      if (lastOption && lastOption.length > 0) {
        this.addOption();
      }
    });
  }

  ngOnInit() {}

  get options() {
    return this.pollForm.get('options') as FormArray;
  }

  addOption() {
    const control = new FormControl('');
    this.options.push(control);
  }

  removeOption(index) {
    this.options.controls.splice(index, 1);
  }

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

  createPoll() {
    console.log(this.event);

    this.presentLoading();
    const { name, options } = this.pollForm.value;
    console.log(options);

    this.stockService.createPoll('this.event.id', name, options).subscribe(
      (data) => {
        console.log(data);
        this.modalController.dismiss({ question: data, success: true });
      },
      (error) => {
        console.log(error);
        this.dismissLoading();
      },
    );
  }
}
