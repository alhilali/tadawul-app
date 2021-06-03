import { Component } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { SeoService } from './services/utils/seo/seo.service';
const { SplashScreen } = Plugins;
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HistoryHelperService } from './services/utils/history-helper.service';
import { FirebaseAuthService } from './pages/firebase/auth/firebase-auth.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { FirebaseProfileModel } from './pages/firebase/auth/profile/firebase-profile.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./pages/side-menu/styles/side-menu.scss', './pages/side-menu/styles/side-menu.shell.scss', './pages/side-menu/styles/side-menu.responsive.scss'],
})
export class AppComponent {
  appPages = [
    {
      title: 'Dashboard',
      url: '/app/dashboard',
      translationKey: 'dashboard.title',
      ionicIcon: 'home',
    },
    {
      title: 'Events',
      url: '/app/events',
      translationKey: 'event.title',
      ionicIcon: 'list-outline',
    },
    {
      title: 'Profile',
      url: '/app/account',
      translationKey: 'account.title',
      ionicIcon: 'person-outline',
    },
    {
      title: 'Settings',
      url: '/app/settings',
      translationKey: 'settings.title',
      ionicIcon: 'cog-outline',
    },
  ];
  locationPages = [
    {
      title: 'Customers',
      url: '/app/customers',
      ionicIcon: 'people-outline',
    },
    {
      title: 'Locations',
      url: '/app/location/all',
      ionicIcon: 'map-outline',
    },
    {
      title: 'Request Location',
      url: '/app/location/request',
      ionicIcon: 'map-outline',
    },
  ];

  textDir = 'rtl';
  currentUser: FirebaseProfileModel;

  // Inject HistoryHelperService in the app.components.ts so its available app-wide
  constructor(
    public translate: TranslateService,
    public historyHelper: HistoryHelperService,
    private seoService: SeoService,
    public authService: FirebaseAuthService,
    private router: Router,
    private menu: MenuController,
    private storageService: StorageService,
  ) {
    this.initializeApp();
    this.setLanguage();
    this.authService.getProfileDataSource().subscribe((user) => {
      this.currentUser = user;
    });
  }

  async initializeApp() {
    try {
      await SplashScreen.hide();
    } catch (err) {
      console.log('This is normal in a browser', err);
    }
  }

  async setLanguage() {
    const currentLang = (await this.storageService.get('currentLang')) ?? 'ar';

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(currentLang);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use(currentLang);

    // this is to determine the text direction depending on the selected language
    // for the purpose of this example we determine that only arabic and hebrew are RTL.
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.textDir = event.lang === 'ar' || event.lang === 'iw' ? 'rtl' : 'ltr';
    });
  }

  async signOut() {
    await this.menu.close();
    this.authService.signOut().subscribe(
      () => {
        // Sign-out successful.
        // Replace state as we are no longer authorized to access profile page.
        this.router.navigate(['home'], { replaceUrl: true });
      },
      (error) => {
        console.log('signout error', error);
      },
    );
  }

  async onLangSwitchClick(lang: string) {
    await this.menu.close();
    await this.storageService.set('currentLang', lang);
    window.location.reload();
    this.translate.use(lang);
  }
}
