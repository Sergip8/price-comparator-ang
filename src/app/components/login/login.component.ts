import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  auth2: any;
  
  constructor(private authService: AuthService, private router: Router, private ngZone: NgZone){}




  ngOnInit() {
 this.authService.login()
 //this.authService.socialGoogleLogin()
  }


  // onGoogleLogin(){
  //   this.authService.login()
  // }


  // setGoogle(){
  //   //@ts-ignore
  //   window.onGoogleLibraryLoad = () =>{
  //   //@ts-ignore
  //   google.accounts.id.initialize({
  //     client_id: '',
  //     callback: this.handleCredentialsResponse.bind(this),
  //     auto_select:false,
  //     cancel_on_tap_outside: true,
  //   })
  //   //@ts-ignore
  //   google.accounts.id.renderButton(
  //     //@ts-ignore
  //     document.getElementById("btn-google"), 
  //     {theme: "outline", size: 'large', width: 200}
  //   )
  //   //@ts-ignore
  //   google.accounts.id.prompt((notification: PromptMomentNotification) => {

  //   })
  //   }
  // }

  // async handleCredentialsResponse(response: CredentialResponse){
  //   await this.authService.loginWithGoogle(response.credential).subscribe({
  //     next: (data:any) => {
  //       this.authService.saveToken(data?.token)
  //     }
  //   })
  // }
  // logout(){
  //   this.authService.signOutExternal()

  // }
}
