import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { GuestModule } from './guest/guest.module';
import { AirlineModule } from './airline/airline.module';

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
  },
  {
    path: 'airline',
    loadChildren: () => AirlineModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
