import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search.service';
import { SearchPayload } from '../../models/search-payload';
import { SearchTec } from '../../models/search-tec';
import { SearchTecPayload } from '../../models/search-tec-payload';

@Component({
  selector: 'app-view-result-list',
  templateUrl: './view-result-list.component.html',
  styleUrls: ['./view-result-list.component.css']
})
export class ViewResultListComponent implements OnInit {
  
  page_d1 = 0
  page_exito = 0
  page_olimpica = 0
  page_jumbo = 0
  page_carulla = 0
  size = 10
  page = 0
  search_value = ""
  res!: SearchPayload
  searchMethod = ""
  searchCategory = "tec"
  tecRes: SearchTecPayload
  constructor(private service: SearchService) { }

  ngOnInit(): void {
  }

  getSearchResult(){
    this.service.getSearchResults(this.search_value, this.page, this.size, this.searchCategory).subscribe({
      next: data => {
        if (data["resCat"] == "tecnologia"){
          this.tecRes = data  
          
          console.log(this.tecRes)
        }
        }
    })
  }

  search(value: string){
    this.search_value = value
    this.searchMethod = "search"
    this.getSearchResult()
  }
  nextPage(value: string){
   
    if(value == "d1"){
      this.page_d1 +=1
      this.service.nextPage(value, this.page_d1, this.search_value, this.searchMethod).subscribe({
        next: data => 
        {
         console.log(data)
          for (let d of data){
          this.res.d1.push(d)
        }
        
        console.log(this.res.d1)
        }
      
      })
    
    }
    if(value == "exito"){
      this.page_exito +=1
      this.service.nextPage(value, this.page_exito, this.search_value, this.searchMethod).subscribe({
        next: data => 
        {
         console.log(data)
          for (let d of data){
          this.res.exito.push(d)
        }
        
        
        }
      
      })
      

    }
    if(value == "olimpica"){
      this.page_olimpica +=1
      this.service.nextPage(value, this.page_olimpica, this.search_value, this.searchMethod).subscribe({
        next: data => 
        {
         console.log(data)
          for (let d of data){
          this.res.olimpica.push(d)
        }
        
       
        }
      
      })
      

    }
    if(value == "jumbo"){
      this.page_jumbo +=1
      this.service.nextPage(value, this.page_jumbo, this.search_value, this.searchMethod).subscribe({
        next: data => 
        {
         console.log(data)
          for (let d of data){
          this.res.jumbo.push(d)
        }
        
       
        }
      
      })
      

    }
    if(value == "carulla"){
      this.page_carulla +=1
      this.service.nextPage(value, this.page_carulla, this.search_value, this.searchMethod).subscribe({
        next: data => 
        {
         console.log(data)
          for (let d of data){
          this.res.carulla.push(d)
        }
 
        }
      
      })
      

    }
  }
  getCategory(value: string){
    this.search_value = value 
    this.searchMethod = "category"
    this.getCategoryResult()
  }

  getCategoryResult(){
    this.service.getCategoryRes(this.search_value, this.page, this.size).subscribe({
      next: data => {data
        console.log(data)}
    })
  }

}

