import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService, Credentials } from 'src/app/service/auth.service';

interface SignUpForm {
  email: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  auth2: any;
  hidePass = true
  @Output() signup = new EventEmitter()
  @Output() loginOK = new EventEmitter<boolean>(false)

  form: FormGroup<SignUpForm> = this.formBuilder.group({

    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder){}


  get emailErrors():string | boolean {
    const control = this.form.controls.email
    const isInvalid = control.invalid && control.touched

    if(isInvalid){
      return control.hasError('required') ? 'El email es requerido': 'El email no es valido'
    }
    return false
  }


  ngOnInit() {
 //this.authService.login()
 //this.authService.socialGoogleLogin()
  }
  async login(){
    try {
     await this.authService.LogInWithEmailAndPassword(<Credentials>this.form.value)
      this.loginOK.emit()
    } catch (error) {
      console.log(error.message)
    }
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
