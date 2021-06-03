import { Component, NgZone, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { HistoryHelperService } from '../../services/utils/history-helper.service';
import { FirebaseAuthService } from '../firebase/auth/firebase-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./styles/login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  submitError: string;
  redirectLoader: HTMLIonLoadingElement;
  authRedirectResult: Subscription;

  validation_messages = {
    email: [{ type: 'pattern', message: 'Enter a valid email.' }],
    password: [{ type: 'minlength', message: 'Password must be at least 5 characters long.' }],
  };
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public authService: FirebaseAuthService,
    private ngZone: NgZone,
    public loadingController: LoadingController,
    public location: Location,
    public historyHelper: HistoryHelperService,
    public menu: MenuController,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])),
      password: new FormControl('', Validators.compose([Validators.minLength(6), Validators.required])),
    });

    // Get firebase authentication redirect result invoken when using signInWithRedirect()
    // signInWithRedirect() is only used when client is in web but not desktop
    this.authRedirectResult = this.authService.getRedirectResult().subscribe((result) => {
      if (result.user) {
        this.redirectLoggedUserToProfilePage();
      } else if (result.error) {
        this.manageAuthWithProvidersErrors(result.error);
      }
    });

    // Check if url contains our custom 'auth-redirect' param, then show a loader while we receive the getRedirectResult notification
    this.route.queryParams.subscribe((params) => {
      const authProvider = params['auth-redirect'];
      if (authProvider) {
        this.presentLoading(authProvider);
      }
    });
  }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  ngOnDestroy(): void {
    this.dismissLoading();
  }

  // Once the auth provider finished the authentication flow, and the auth redirect completes,
  // hide the loader and redirect the user to the profile page
  redirectLoggedUserToProfilePage() {
    this.dismissLoading();
    // As we are calling the Angular router navigation inside a subscribe method, the navigation will be triggered outside Angular zone.
    // That's why we need to wrap the router navigation call inside an ngZone wrapper
    this.ngZone.run(() => {
      // Get previous URL from our custom History Helper
      // If there's no previous page, then redirect to profile
      // const previousUrl = this.historyHelper.previousUrl || 'app';
      const previousUrl = 'app';

      // No need to store in the navigation history the sign-in page with redirect params (it's justa a mandatory mid-step)
      // Navigate to profile and replace current url with profile
      this.router.navigate([previousUrl], { replaceUrl: true });
    });
  }

  async presentLoading(authProvider?: string) {
    // const authProviderCapitalized = authProvider[0].toUpperCase() + authProvider.slice(1);

    this.loadingController
      .create({
        // message: authProvider ? 'Signing in with ' + authProviderCapitalized : 'Signin in ...',
        message: '',
      })
      .then((loader) => {
        const currentUrl = this.router.url;
        if (currentUrl.includes('/auth/login')) {
          this.redirectLoader = loader;
          this.redirectLoader.present();
        }
      });
  }

  async dismissLoading() {
    if (this.redirectLoader) {
      await this.redirectLoader.dismiss();
    }
  }

  // Before invoking auth provider redirect flow, present a loading indicator and add a flag to the path.
  // The precense of the flag in the path indicates we should wait for the auth redirect to complete.
  prepareForAuthWithProvidersRedirection(authProvider: string) {
    this.presentLoading(authProvider);

    this.location.replaceState(this.location.path(), 'auth-redirect=' + authProvider, this.location.getState());
  }

  manageAuthWithProvidersErrors(errorMessage: string) {
    this.submitError = errorMessage;
    // remove auth-redirect param from url
    this.location.replaceState(this.router.url.split('?')[0], '');
    this.dismissLoading();
  }

  resetSubmitError() {
    this.submitError = null;
  }

  signInWithEmail() {
    this.resetSubmitError();
    this.presentLoading();
    this.authService
      .signInWithEmail(this.loginForm.value['email'], this.loginForm.value['password'])
      .then(async (user) => {
        // navigate to user profile
        this.redirectLoggedUserToProfilePage();
      })
      .catch((error) => {
        this.submitError = error.message;
        this.dismissLoading();
      });
  }

  doFacebookLogin(): void {
    this.resetSubmitError();
    this.prepareForAuthWithProvidersRedirection('facebook');

    this.authService.signInWithFacebook().subscribe(
      (result) => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // const token = result.credential.accessToken;
        this.redirectLoggedUserToProfilePage();
      },
      (error) => {
        this.manageAuthWithProvidersErrors(error.message);
      },
    );
  }

  doGoogleLogin(): void {
    this.resetSubmitError();
    this.prepareForAuthWithProvidersRedirection('google');

    this.authService.signInWithGoogle().subscribe(
      (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // var token = result.credential.accessToken;
        this.redirectLoggedUserToProfilePage();
      },
      (error) => {
        console.log(error);
        this.manageAuthWithProvidersErrors(error.message);
      },
    );
  }

  doTwitterLogin(): void {
    this.resetSubmitError();
    this.prepareForAuthWithProvidersRedirection('twitter');

    this.authService.signInWithTwitter().subscribe(
      (result) => {
        // This gives you a Twitter Access Token. You can use it to access the Twitter API.
        // var token = result.credential.accessToken;
        this.redirectLoggedUserToProfilePage();
      },
      (error) => {
        console.log(error);
        this.manageAuthWithProvidersErrors(error.message);
      },
    );
  }
}
