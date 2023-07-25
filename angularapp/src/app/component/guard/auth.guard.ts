import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../login/login.component';
import { UserComponent } from '../user/user.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  
  constructor(private user:AuthService,private route:Router){}
 
  canActivate():boolean  {
    if(this.user.isuserloggedin()){
      return true
    }
    else{
      this.route.navigate(['/login'])
      return false
    }
    
  }
  
}
