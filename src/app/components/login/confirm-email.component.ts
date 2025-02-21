import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthAltasService } from "src/app/service/auth-atlas.service";


@Component({
    selector: 'confirm-email',
    template: `
  <div class="confirm-email">
   

  </div>
    `,
    styles: [`
 
    .sort-select > select{
      padding: 8px;
   
      
    }
    select{
      border:none;
      background-color: transparent;
    }
    option{
      gap: 8px;
      padding-top:5px;
    }
    select:active{
      border:none;
    }
    select::selection{
      padding:8px;
    }
    svg{
        width: 2rem ;
        height: auto ;
    }
    .social-buttons{
        width: 100%;
}
    `]
  })

export class ConfirmEmail implements OnInit {


    constructor(private router: Router, private activatedRoute: ActivatedRoute, private auth: AuthAltasService){

    }
    
    async ngOnInit() {
        
        try {
            this.activatedRoute.queryParams.subscribe((params) => {
               this.auth.confirmEmail(params["token"], params["tokenId"])
            })
            await this.sleep(1000);
            this.router.navigate(["/"])
            
            
        } catch (error) {
            
        }
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

    
    
}

