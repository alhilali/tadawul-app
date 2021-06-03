import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../../components/components.module';

import { LoginPage } from './login.page';

import { map } from 'rxjs/operators';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const redirectLoggedInToProfile = (next) =>
  map((user) => {
    // when queryParams['auth-redirect'] don't redirect because we want
    // the component to handle the redirection
    if (user !== null && !next.queryParams['auth-redirect']) {
      return ['app'];
    } else {
      return true;
    }
  });

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfile },
  },
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, RouterModule.forChild(routes), ComponentsModule],
  declarations: [LoginPage],
})
export class LoginPageModule {}
