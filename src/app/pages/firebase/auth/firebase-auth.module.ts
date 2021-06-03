import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../components/components.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../../../../environments/environment';
import { FirebaseAuthService } from './firebase-auth.service';

@NgModule({
  imports: [CommonModule, IonicModule, ComponentsModule, AngularFireModule.initializeApp(environment.firebase), AngularFireAuthModule],
  providers: [FirebaseAuthService],
})
export class FirebaseAuthModule {}
