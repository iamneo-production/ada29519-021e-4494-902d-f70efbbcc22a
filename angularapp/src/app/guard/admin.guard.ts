import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private admin:AuthService,private route:Router){}
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean  {
    if(this.admin.isadminloggedin()){
      return true;
    }
    else{
      localStorage.clear()
      this.route.navigate(['login'])
      return false
    }
    
  }
  
}
