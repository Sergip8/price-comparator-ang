import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthAltasService, SignInUp } from 'src/app/service/auth-atlas.service';


interface SignUpForm {
  name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  @Output() Signin = new EventEmitter()
  @Output() signinOK = new EventEmitter<SignInUp>()

  hidePass = true
  form: FormGroup<SignUpForm> = this.formBuilder.group({
    name: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });
  constructor(private formBuilder: FormBuilder, private auth: AuthAltasService){
    
  }
  ngOnInit(): void {
    console.log(this.form.controls.name.hasError('email'))
  }
  
  
  
 async register() {
try {
 await this.auth.signUpWithEmailAndPassword(this.form.value.email, this.form.value.password)
  this.signinOK.emit(SignInUp.SIGNUP)
} catch (error) {
  console.log(error.message)
}
   

  }
  get emailErrors():string | boolean {
    const control = this.form.controls.email

    const isInvalid = control.invalid && control.touched

    if(isInvalid){
      return control.hasError('required') ? 'El email es requerido': 'El email no es valido'
    }
    return false
  }
 
}
