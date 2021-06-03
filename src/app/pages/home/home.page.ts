import { Component, OnInit } from '@angular/core';
import { MenuController, PopoverController } from '@ionic/angular';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { CounterInputComponent } from '../../components/counter-input/counter-input.component';
import { MenuDropdownComponent } from '../../components/menu-dropdown/menu-dropdown.component';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  textDir = 'rtl';
  constructor(public menu: MenuController, public translate: TranslateService, private storageService: StorageService, public popoverController: PopoverController) {}

  ngOnInit() {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.textDir = event.lang === 'ar' || event.lang === 'iw' ? 'rtl' : 'ltr';
    });
  }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    // this.menu.enable(true);
  }

  onInterestClick() {}

  async onLangSwitchClick(lang: string) {
    await this.storageService.set('currentLang', lang);
    this.translate.use(lang);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MenuDropdownComponent,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: false
    });
    return await popover.present();
  }
}
