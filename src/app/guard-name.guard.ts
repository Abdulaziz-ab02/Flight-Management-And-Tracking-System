import { CanActivateFn, Router } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const guardNameGuard: CanActivateFn = (route, state) => {
  const router = new Router();
  let toastr:ToastrService= inject(ToastrService);
  const token = localStorage.getItem('token');
  console.log(state);
  if(token){
if(state.url.indexOf('admin')>0){
let user: any = localStorage.getItem('user'); 
user = JSON.parse(user);
if(user.roleid=='1'){
  toastr.success('Welcome to Admin dashboard');
  return true;
}
else{
  toastr.warning('This page for Admin module')
  router.navigate(['security/login']);
  return false;
}

}
return false;
  }
  else{
    toastr.warning('Please sign up')
    router.navigate(['security/register']);
    return false;
  }
};
