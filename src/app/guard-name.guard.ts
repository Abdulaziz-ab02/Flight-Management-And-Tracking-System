import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const guardNameGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  let toastr:ToastrService= inject(ToastrService);
  const token = localStorage.getItem('token');
  console.log(state);
  if (token) {
    let user: any = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);  

      if (state.url.indexOf('admin') > 0) {
        if (user.roleid === '1') {
          toastr.success('Welcome to Admin dashboard');
          return true;
        } else {
          toastr.warning('This page is for Admin module');
          router.navigate(['security/login']);
          return false;
        }
      }

      if (state.url.indexOf('user') > 0) {
        if (user.roleid === '2') {
          toastr.success('Welcome to User dashboard');
          return true;
        } else {
          toastr.warning('This page is for User module only');
          router.navigate(['security/login']);
          return false;
        }
      }

      if (state.url.indexOf('airline') > 0) {
        if (user.roleid === '3') {
          toastr.success('Welcome to Airline dashboard');
          return true;
        } else {
          toastr.warning('This page is for Airline module only');
          router.navigate(['security/login']);
          return false;
        }
      }
    }
    return false;
  } else {
    toastr.warning('Please sign up');
    router.navigate(['security/register']);
    return false;
  }
};