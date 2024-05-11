import { DOCUMENT } from "@angular/common";
import { AfterViewInit, Component, EventEmitter, Inject, NgZone, OnInit, Output, Renderer2 } from "@angular/core";


import { AuthAltasService, SignInUp } from "src/app/service/auth-atlas.service";
import { environment} from "src/environments/environment";

declare global {
  const google: typeof import('google-one-tap');
}
declare var FB: any;

@Component({
    selector: 'social-buttons',
    template: `
  <div class="social-buttons">
    <!-- <div class="google" (click)="signUpWithGoogle()">
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 48 48" width="50px" height="50px"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/></defs><clipPath id="b"><use xlink:href="#a" overflow="visible"/></clipPath><path clip-path="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"/><path clip-path="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z"/><path clip-path="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z"/><path clip-path="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z"/></svg>
      <span>Entrar con google</span> 
    </div> -->
    <div id="loginBtn" > </div>
    
    <!-- <div class="facebook" (click)="loginWithFacebook()">
      <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="50px" height="50px"><path fill="#3F51B5" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"/><path fill="#FFF" d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"/></svg>
      <span>Entrar con Facebook</span> 
    </div> -->

  <!-- Log in with Realm and Google Authentication -->


  </div>
    `,
    styles: [`
    #loginBtn{
      display: flex;
      margin-bottom: 16px;
      margin-top: 8px;
      justify-content: center;
    }
    #loginBtn > div{
      width: 100%;
    }

    .google, .facebook{
        width: 300px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0.3rem;
        background: white;
        border: 1px solid #eee;
        border-radius: 5px;
    }
    .google{
      margin-top: 8px;
      margin-bottom: 16px;
    }
    svg{
        width: 2rem ;
        height: auto ;
    }
    .social-buttons{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
   
}

    `]
  })
  export class SocialButtoms implements OnInit, AfterViewInit{

    
    @Output() loginOK = new EventEmitter<SignInUp>()

    constructor(private ngZone: NgZone, private auth: AuthAltasService){}
  ngOnInit(): void {
   
  
  }
  loginWithFacebook() {
    FB.login((response: any) => {
      if (response.authResponse) {
        const accessToken = response.authResponse.accessToken;
        console.log('Token de acceso:', accessToken);
        // Puedes hacer algo con el token de acceso aquí
      } else {
        console.log('Inicio de sesión con Facebook cancelado o fallido.');
      }
    }, { scope: 'public_profile,email' });
  }

  
  ngAfterViewInit() {
    
    const gAccount = google.accounts;

    gAccount.id.initialize({
      client_id: environment.clientId,
      ux_mode: 'popup',
      cancel_on_tap_outside: true,
      callback: ({ credential }) => {
        this.ngZone.run(() => {
          this._loginWithGoogle(credential);
        });
      },
    });

    gAccount.id.renderButton(document.getElementById('loginBtn') as HTMLElement, {
      size: 'large',
      width: 300,
    });
  }

  private _loginWithGoogle(token: string) {
    this.auth.loginWithGoogle(token)
    //console.log(token)
  }
  signUpWithFacebook(){
    this.auth.loginWithFacebook()
  }
}



    //   async signUpWithGoogle(): Promise<void> {
    //     try {
    //       const result = await this.authService.signInWithGoogleProvider();
    //       console.log(result);
    //       this.loginOK.emit()
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //  async signUpWithFacebook(){
    //   try {
    //     const result = await this.authService.signInWithFacebookProvider()
    //     this.loginOK.emit()
    //   } catch (error) {
    //     console.log(error);
    //   }

    //  }
  