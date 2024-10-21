import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { GuestModule } from './guest/guest.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => GuestModule
  },
  {
    path: 'guest',
    loadChildren: () => GuestModule
  },
  {
    path: 'user',
    loadChildren: () => UserModule
  },
  {
    path: 'security',
    loadChildren: () => AuthModule
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
