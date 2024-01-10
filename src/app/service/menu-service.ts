import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject, filter } from "rxjs"
import { SearchTecPayload } from "../models/search-tec-payload"

const baseUrl = 'http://localhost:8080/api/'

export interface LinkTree{
  type: string
  value: string

}
export enum StoreType{
  GRANDES_SUPERFICIES,
  PARTES_PC
}
@Injectable({
    providedIn: 'root'
  })
  export class MenuService {

    mainCat = [
      "tecnologia",
      "electrodomesticos",
      "mercado",
      "cocina",
      "moda-y-accesorios",
      "hombre",
      "mujer",
      "muebles",
      "hogar",
      "deportes-y-ejercicio",
      "salud-y-belleza",
      "construccion",
      "ferreteria",
      "partes-pc"
    ]

    categories = new BehaviorSubject<object>({}) 

    categoryLink = new BehaviorSubject<string>("") 
    
    private linkTreeState = new BehaviorSubject<LinkTree[]>([]) 
    linkTreeState$ = this.linkTreeState.asObservable()
   
    private storeTypeState = new BehaviorSubject<StoreType>(StoreType.GRANDES_SUPERFICIES) 
    storeTypeState$ = this.storeTypeState.asObservable()

    accent = {
      tecnologia: "tecnología",
      audifonos: "audífonos",
      telefonos: "teléfonos",
    }
   
    updateStoreTypeState(type: StoreType){
      this.storeTypeState.next(type)
    }
    resetLinkTree(){
      this.linkTreeState.next([])
    }
    addLinkTree(item: LinkTree){
      const linkTree = this.linkTreeState.value
      linkTree.push(item)
      this.linkTreeState.next(linkTree)
    }
    removeLinkTree(index: number){
      let linkTree = this.linkTreeState.value
      linkTree = linkTree.slice(0, index+1)
      this.linkTreeState.next(linkTree)
    }

    constructor(private http: HttpClient){}
  

    getMenuCategories(){
       return this.http.get<any[]>(baseUrl+"categories")
        
    }
    // getPartesPcCategories(){
    //   this.http.get<string[]>(baseUrl+"partes-pc/categories").subscribe({
    //     next: cat =>{
    //       console.log(cat)
    //       let menuCategory = this.listaAObjeto(cat)
    //     this.setMenuCategories(Object.assign(this.categories.value, menuCategory))
    //       this.categories.next(Object.assign(this.categories.value, menuCategory))
    //     }
    //   })
    // }
   

    getAllByCategory(cat: string, page: number, size: number){
      return this.http.get<SearchTecPayload>(baseUrl+`categories/cat?cat=${cat}&page=${page}&size=${size}`)
    }

    listaAObjeto(cat: string[]) {
      let categoryList = []
      cat.forEach(c => categoryList.push(c.split("/").filter(cf => cf != "" && !cf.startsWith("/"))))
        const res = {};
        categoryList.forEach(sublist => {
          let objetoActual = res;
      
          sublist.forEach((el, index) => {
            if (index === sublist.length - 1) {
              objetoActual[el] =el; 
            } else {
              objetoActual[el] = objetoActual[el] || {};
              objetoActual = objetoActual[el];
            }
          });
        });
      
        return res;
      }
      
      setMenuCategories(cat: object){
        sessionStorage.setItem("menu", JSON.stringify(cat))
      }
      getLocalMenuCategories(): object{
          
        try {
           const menu = sessionStorage.getItem("menu")
          return JSON.parse(menu)
            
          } catch (error) {
            return null
            
          }
      }
  
    convertAccentString(value: string) {
   
      const splitStr = value.split("-")
      splitStr.forEach((el, i) =>{
  
        if(this.accent[el])
           splitStr[i] = this.accent[el]
      })
      return splitStr.join(" ")
     
      
      
    }
  }