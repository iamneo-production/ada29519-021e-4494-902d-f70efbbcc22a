import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  
  constructor(private admin:AuthService,private route:Router){}
  canActivate(route:ActivatedRouteSnapshot,sate:RouterStateSnapshot): boolean{
    if(this.admin.isadminloggedin()){
      return true;
    }
    else{
      this.route.navigate(['/login'])
      return false;
    }
    
  }
  
}
