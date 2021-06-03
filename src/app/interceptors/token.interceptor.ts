import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, take, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { FirebaseAuthService } from '../pages/firebase/auth/firebase-auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, public toastController: ToastController, public authService: FirebaseAuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.angularFire.user.pipe(
      take(1),
      switchMap((user) => {
        const token = this.authService.currentToken;

        if (user && token) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
        }

        // if (!request.headers.has('Content-Type')) {
        //   request = request.clone({
        //     setHeaders: {
        //       'content-type': 'application/json',
        //     },
        //   });
        // }

        // request = request.clone({
        //   headers: request.headers.set('Accept', 'application/json'),
        // });

        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            // console.log(event);

            if (event instanceof HttpResponse) {
              // console.log('event--->>>', event);
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            // console.log(error);
            if (error.status === 401) {
              if (error.error.success === false) {
                // this.presentToast('Login failed');
              } else {
                // this.router.navigate(['login']);
              }
            }
            return throwError(error);
          }),
        );
      }),
    );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
}
