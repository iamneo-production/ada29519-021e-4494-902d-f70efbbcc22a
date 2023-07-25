import { Component, OnInit } from '@angular/core';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  username=localStorage.getItem('username')
  
  constructor(private share:ShareService){}
  ngOnInit(): void {
    // console.log(this.share.getMessage())
  }
  logout(){
    localStorage.clear();
  }

}
