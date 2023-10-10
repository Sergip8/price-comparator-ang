import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartesPc } from 'src/app/models/partes-pc';
import { SearchService } from 'src/app/service/search.service';

@Component({
  selector: 'app-partes-pc-view',
  templateUrl: './partes-pc-view.component.html',
  styleUrls: ['./partes-pc-view.component.css']
})
export class PartesPcViewComponent {

  query = ""
  partesPcRes: PartesPc[]
  page = 0
  size = 10

  constructor(private service: SearchService, private activatedRoute: ActivatedRoute){

    this.activatedRoute.params.subscribe(params => {
      this.query = params['search'];
      
      this.getPartesPc()
  });
   
  }


  // search(value: string){
  //   this.getPartesPc(value)
  // }
  getPartesPc(){
    this.service.getPartesPc(this.query, this.page, this.size).subscribe({
      next: data => this.partesPcRes = data,
      error: e => console.log(e)
    })
  }
  nextPage(mercado: PartesPc, index: number){
 
  
    mercado.page +=1
    
     this.service.getPartesPcNext(this.query, mercado.page, mercado.store).subscribe({
       next: data => 
       {
        console.log(data)
       this.partesPcRes[index].data.push(...data)
       
       }
     
     })
   
   
 
 
 }
}
