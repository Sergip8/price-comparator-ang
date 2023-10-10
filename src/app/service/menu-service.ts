import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import { SearchTecPayload } from "../models/search-tec-payload"

const baseUrl = 'http://localhost:8080/api/'
@Injectable({
    providedIn: 'root'
  })
  export class MenuService {

    categories = new BehaviorSubject<object>({}) 

    categoryLink = new BehaviorSubject<string>("") 

    constructor(private http: HttpClient){}
    main_menu = {}
    mercado = {
        'despensa':[
        'Arroz, granos y pastas',
        'Aceites y vinagres',
        'Azúcar, panela y endulzante',
        'Enlatados y conservas',
        'Cereales y granolas',
        'Café, chocolates e infusiones',
        'Harinas y mezclas para preparar',
        'Salsas, condimentos y sopas'],

        'leche_huevos_refrigerados':[
        
        'Huevos',
        'Lacteos',
        'Carnes frías y embutidos',
        'Arepas y tortillas'
        ],
        'pollo_carne_pescado':[
        'Res',
        'Cerdo',
        'Pollo',
        'pescados y mariscos',
        ],
        'panaderia_reposteria':[
        'Panadería fresca',
        'Panadería empacada',
        'Repostería',
        'Ingredientes de repostería'
        ],
    }
    tecnologia = {
        'televisores':[
           'Televisores'
        ],
        'Computadores':[

            'Computadores portátiles',
            'Computadores all in one',
            'Computadores de escritorio',
            'Monitores',
            'Accesorios de computador',
        ],
        'audio':[

            'Barras de sonido',
            'Minicomponentes',
            'Teatros en casa',
            'Parlantes',
            'Audífonos',
            'Reproductores y accesorios',
        ],
        'consolas':[

            'Consolas',
            'Videojuegos',
            'Accesorios para videojuegos',
            'Computadores gamer',
        ],
        'smartphones':[

            'Reacondicionados',
            'Samsung',
            'Xiaomi',
            'Iphone',
            'Motorola',
            'Huawei',
            'Tecno Mobile',
            'Vivo',
            'Realme',
            'Oppo',
            'Nokia',
        ],
        'smartwatch':[

            'Samsung',
            'Apple',
            'Xiaomi',
            'Huawei',
        ],
        'accesorios':[

            'Audifonos',
            'Cargadores',
            'Monopod',
            'Protectores y estuches',
        ]
    
    }
    getMenuCategories(){
       return this.http.get<string[]>(baseUrl+"categories").subscribe({
        next: cat => {
            let categoryList = []
            cat.forEach(c => categoryList.push(c.split("/").filter(cf => cf != "")))
            categoryList = categoryList.filter(f => f.length == 3).sort()
            //this.categories.next(categoryList)
  
            console.log(categoryList)
            // const dict = categoryList.reduce((acc, [key1,key2, value]) => {
            //   // If a node with the current key exist in the accumulator, merge the value of that node with current value
            //   // If node with current key doesnot exist, create a new node with that key and value as an array with current value being the element
            //   //acc[key] = acc[key] ? [...acc[key], value] : [value];
              
            //   var vv = acc[key2] ? [...acc[key2], value] : [value];
            //   acc[key1] = acc[key1] ? [...acc[key1], Object.assign({key2: vv})] : [vv];
            //   return acc;
            // }, {});
            // console.log(dict);
         let k = Object.fromEntries(categoryList)
         this.categories.next(this.listaAObjeto(categoryList))
        },
        error: e => console.log(e)
    })
        
    }

    getAllByCategory(cat: string, page: number, size: number){
      return this.http.get<SearchTecPayload>(baseUrl+`categories/cat?cat=${cat}&page=${page}&size=${size}`)
    }

    listaAObjeto(list: string[][]) {
        const res = {};
      
        list.forEach(sublist => {
          let objetoActual = res;
      
          sublist.forEach((el, index) => {
            if (index === sublist.length - 1) {
              objetoActual[el] = el;
            } else {
              objetoActual[el] = objetoActual[el] || {};
              objetoActual = objetoActual[el];
            }
          });
        });
      
        return res;
      }
      
   

    getMainMenu(){
        return this.main_menu ={
            "Mercado": this.mercado,
            "Tecnologia": this.tecnologia,
            "Electrodomesticos": null
           
        }
    }
  }