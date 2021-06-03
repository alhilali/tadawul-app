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
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then((m) => m.DashboardPageModule),
      },
      {
        path: 'stock',
        loadChildren: () => import('../stock/listing/stock-listing.module').then((m) => m.StockListingPageModule),
      },
      {
        path: 'stock/create',
        loadChildren: () => import('../stock/create-stock/create-stock.module').then((m) => m.CreateStockPageModule),
      },
      {
        path: 'stock/:id',
        loadChildren: () => import('../stock/details/stock-details.module').then((m) => m.StockDetailsPageModule),
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
