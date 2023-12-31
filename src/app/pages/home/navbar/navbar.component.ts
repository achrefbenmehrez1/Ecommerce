import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { User } from 'src/app/services/user/model/user';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isCollapsed=false;
  constructor(private userService:UserServiceService, private router:Router) { }

  //drawer

  visible = false;
  placement: NzDrawerPlacement = 'left';
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  userLoggedIn:boolean=false;

  user:User=new User();
  ngOnInit(): void {
    this.userLoggedIn=this.userService.isLoggedIn();


    /*
    this.userService.getUserInfo().subscribe(r => {
      console.log('user info', r);
      this.user = r as User;
    },
      (error:HttpErrorResponse)=>{
        if(error.status===403){
          localStorage.removeItem('token');

        }
    });
    */

    //check screen size at initialization
    this.checkScreenSize();
  }

  logout(){
    console.log("logout works!");
    this.userService.logout().subscribe(()=>{
      console.log('logout api works!');
      localStorage.removeItem('token');
      this.userLoggedIn=false;
      this.router.navigate(['']);

    });
  }

  visibleCart = false;


  openCart():void{
    this.visibleCart = true;

  }

  closecart():void{
    this.visibleCart = false;

  }

  //test data
  data = [
    {
      title: 'Ant Design Title 1'
    },
    {
      title: 'Ant Design Title 2'
    },
    {
      title: 'Ant Design Title 3'
    },
    {
      title: 'Ant Design Title 4'
    }
  ];

  //screen size:
  isSmallScreen = false;
 
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.checkScreenSize();
  }

  //check screen size
  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth <= 768;
  }

}
