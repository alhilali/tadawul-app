import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { FirebaseProfileResolver } from '../firebase/auth/profile/firebase-profile.resolver';

import { TabsPage } from './tabs.page';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/auth/login']);

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    // canActivate: [AngularFireAuthGuard],
    // data: { authGuardPipe: redirectUnauthorizedToLogin },
    // resolve: {
    //   data: FirebaseProfileResolver,
    // },
    children: [
      // /app/ redirect
      {
        path: '',
        redirectTo: 'events',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardPageModule),
      },
      {
        path: 'events',
        loadChildren: () => import('../event/listing/event-listing.module').then((m) => m.EventListingPageModule),
      },
      {
        path: 'events/create',
        loadChildren: () => import('../event/create-event/create-event.module').then((m) => m.CreateEventPageModule),
      },
      {
        path: 'events/:id',
        loadChildren: () => import('../event/details/event-details.module').then((m) => m.EventDetailsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [FirebaseProfileResolver],
})
export class TabsPageRoutingModule {}
