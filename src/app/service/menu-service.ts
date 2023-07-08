import { Injectable } from "@angular/core"


@Injectable({
    providedIn: 'root'
  })
  export class MenuService {


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
        'Leche',
        'Huevos',
        'Derivados Lácteos',
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

        'televisores':[
            '24"',
            '32"',
            '39"',
            '40"',
            '42"',
            '43"',
            '48"',
            '50"',
            '55"',
            '58"',
            '60"',
            '65"',
            '70"',
            '75"',
            '82"',
            '86"',
        ],
        'Computadores y accesorios':[

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
        'consolas y videojuegos':[

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
        'accesorios para celular':[

            'Audifonos',
            'Cargadores',
            'Monopod',
            'Protectores y estuches',
        ]
    }
    
   

    getMainMenu(){
        return this.main_menu ={
            "Mercado": this.mercado,
            "Tecnologia": null,
            "Electrodomesticos": null
           
        }
    }
  }