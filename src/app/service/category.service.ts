import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CategoryService {
  mercado: string[] = [
    "/Supermercado/Aseo De Hogar/Alfombras/",
    "/Supermercado/Aseo De Hogar/Ambientadores/",
    "/Supermercado/Aseo De Hogar/Blanqueadores/",
    "/Supermercado/Aseo De Hogar/Cera/",
    "/Supermercado/Aseo De Hogar/Desinfectantes/",
    "/Supermercado/Aseo De Hogar/Insecticidas/",
    "/Supermercado/Aseo De Hogar/Limpieza De Superficies/",
    "/Supermercado/Aseo De Hogar/Multiusos/",
    "/Supermercado/Bebidas/Agua/",
    "/Supermercado/Bebidas/Energizantes/",
    "/Supermercado/Bebidas/Gaseosas/",
    "/Supermercado/Bebidas/Hidratantes/",
    "/Supermercado/Bebidas/Jugos, Refrescos Y Maltas/",
    "/Supermercado/Bebidas/Té Líquido/",
    "/Supermercado/Belleza/Accesorios De Belleza/",
    "/Supermercado/Belleza/Coloración/",
    "/Supermercado/Belleza/Cremas Corporales/",
    "/Supermercado/Belleza/Cuidado Facial/",
    "/Supermercado/Belleza/Depilación/",
    "/Supermercado/Belleza/Fragancias/",
    "/Supermercado/Belleza/Maquillaje/",
    "/Supermercado/Belleza/Protección Solar/",
    "/Supermercado/Belleza/Repelentes/",
    "/Supermercado/Carne Y Pollo/Carne Cerdo/",
    "/Supermercado/Carne Y Pollo/Carne Res otras/",
    "/Supermercado/Carne Y Pollo/Elaborados Para Parrilla/",
    "/Supermercado/Carne Y Pollo/Pollos aves pavo/",
    "/Supermercado/Charcutería/Carnes Frías, encurtidos",
    "/Supermercado/Charcutería/Queso Especializados Delicatessen",
    "/Supermercado/Cuidado De Ropa Y Calzado/Betún betunes/",
    "/Supermercado/Cuidado De Ropa Y Calzado/Desmanchadores/",
    "/Supermercado/Cuidado De Ropa Y Calzado/Detergentes/",
    "/Supermercado/Cuidado De Ropa Y Calzado/Suavizantes/",
    "/Supermercado/Cuidado Del Bebé/Alimentación/",
  ];
  products = [
    "manzana",
    "plátano",
    "naranja",
    "uva",
    "fresa",
    "sandía",
    "melón",
    "limón",
    "piña",
    "mango",
    "pera",
    "cereza",
    "kiwi",
    "papaya",
    "frambuesa",
    "arándano",
    "aguacate",
    "granada",
    "higo",
    "ciruela",
    "albaricoque",
    "meloncillo",
    "mora",
    "pomelo",
    "calabaza",
    "chirimoya",
    "mandarina",
    "guayaba",
    "guanábana",
    "mamey",
    "zapote",
    "zarzamora",
    
    "uvaespina",
    "fruta pasión",
    "mangostán",
    "durazno",
    "manzana verde",
    "manzana roja",
    "piña",
    "papa",
    "zanahoria",
    "cebolla",
    "ajo",
    "brócoli",
    "coliflor",
    "milanesa",
    "calabacín",
    "berenjena",
    "tomate",
    "lechuga",
    "espinaca",
    "pepino",
    "pimiento",
    "remolacha",
    "repollo",
    "judías verdes",
    "guisantes",
    "champiñón",
    "patata",
    "batata",
    "rábano",
    "calabaza",
    "maíz",
    "arroz",
    "trigo",
    "cebada",
    "avena",
    "centeno",
    "quinoa",
    "lentejas",
    "garbanzos",
    "nuez",
    "almendra",
    "avellana",
    "cacahuete",
    "castaña",
    "pistacho",
    "sésamo",
    "aceite oliva",
    "aceite girasol",
    "aceite coco",
    "aceite maíz",
    "aceite canola",
    "aceite soja",
    "mantequilla",
    "queso cheddar",
    "queso mozzarella",
    "queso parmesano",
    "queso azul",
    "yogur",
    
    "crema",
    "huevo",
    "pollo",
    "carne res",
    "costilla res",
    "cerdo",
    "ternera",
    "cordero",
    "pavo",
    "jamón",
    "salchicha",
    "tocino",
    "salami",
    "atún",
    "salmón",
    "bacalao",
    "merluza",
    "camarones",
    "langosta",
    "mejillones",
    "ostras",
    "almejas",
    "hamburguesa",
    "pizza",
    "pasta",
    "galleta",
    "cereal",
    "chocolate",
    "helado",
    "donut",
    "palomitas maíz",
    "chips",
    "aceite oliva",
    "aceite girasol",
    "aceite coco",
    "aceite maíz",
    "aceite canola",
    "aceite soja",
    "azúcar",
    "harina",
    "sal",
    "vinagre",
    "mayonesa",
    "mostaza",
    "ketchup",
    "salsa soja",
    "salsa barbacoa",
    "salsa picante",
    "cafe",
    "te",
    "mojarra",
    "pargo",
    "bagre",
    "robalo",
    "salmon",
    "chocolate en polvo",
    "azúcar moreno",
    "miel",
    "salsa tomate",
    "puré tomate",
    "harina trigo",
    "levadura",
    "pan rallado",
    "galletas saladas",
    "galletas dulces",
    "cereales",
    "soda",
    "lomo res",
    "lomo cerdo",
    "lasaña",
    "lavaplatos",
    "lavaloza",
    "noodles",
    "sopa enlatada",
    "tomate enlatado",
    "atún enlatado",
    "sardinas enlatadas",
    "maíz enlatado",
    "judías enlatadas",
    "guisantes enlatados",
    "champiñones enlatados",
    "caldo pollo",
    "caldo verduras",
    "consomé",
    "leche",
    "yogur",
    "queso",
    "mantequilla",
    "crema",
    "nata",
    "huevos",
    "carne pollo",
    "carne cerdo",
    "carne ternera",
    "carne cordero",
    "salchichas",
    "tocino",
    "jamón",
    "pavo",
    "salchichón",
    "pernil pollo",
    "pechuga pollo",
    "chorizo",
    "mortadela",
    "queso cheddar",
    "queso mozzarella",
    "queso parmesano",
    "queso gouda",
    "queso suizo",
    "queso azul",
    "queso brie",
    "queso camembert",
    "queso cabra",
    "queso feta",
    "queso crema",
    "pescado fresco",
    "pescado congelado",
    "mariscos",
    "langostinos",
    "camarones",
    "mejillones",
    "ostras",
    "pan",
    "baguette",
    "pan molde",
    "pan integral",
    "panecillos",
    "bollería",
    "croissants",
    "magdalenas",
    "donuts",
    "pasteles",
    "gaseosa",
    "snacks",
    "patatas fritas",
    "pretzels",
    "frutos secos",
    "bebidas",
    "refrescos",
    "agua mineral",
    "zumos",
    "cerveza",
    "vino",
    "vino blanco",
    "vino tinto",
    "vino rosado",
    "vino espumoso",
    "sidra",
    "aperitivos",
    "aceitunas",
    "pepinillos",
    "salsa ranch",
    "salsa queso",
    "salsa yogur",
    "salsa ajo",
    "salsa tártara",
    "salsa curry",
    "salsa maní",
    "aceitunas",
    "aderezos para ensaladas",
    "aguacate enlatado",
    "albahaca",
    "alcaparras",
    "anchoas",
    "avena",
    "azúcar moreno",
    "bacalao",
    "batata",
    "bebidas energéticas",
    "bebidas isotónicas",
    "bizcochos",
    "brotes soja",
    "cacahuetes",
    "cacao en polvo",
    "café instantáneo",
    "calamares",
    "caldo carne",
    "caldo pescado",
    "caldo pollo",
    "caldo verduras",
    "camarones",
    "cebada",
    "cebolla en polvo",
    "cebolla enlatada",
    "cereales para el desayuno",
    "cerveza",
    "chiles",
    "chiles enlatados",
    "chocolate en polvo",
    "chocolate negro",
    "chocolate con leche",
    "cigalas",
    "ciruelas",
    "clara huevo",
    "coco rallado",
    "comino",
    "concentrado frutas",
    "concentrado tomate",
    "confituras",
    "crema agria",
    "labial",
    "crema cacahuete",
    "crema cacao y avellanas",
    "crema champiñones",
    "crema espárragos",
    "crema marisco",
    "crema pollo",
    "crema tomate",
    "dátiles",
    "especias",
    "espinacas",
    "estragón",
    "fideos arroz",
    "fideos huevo",
    "fideos soba",
    "flanes",
    "fresas enlatadas",
    "galletas avena",
    "galletas chocolate",
    "galletas mantequilla",
    "galletas saladas",
    "galletas dulces",
    "garbanzos",
    "gelatina",
    "gelatina en polvo",
    "germen trigo",
    "ghee",
    "glaseado azúcar",
    "glucosa",
    "gomitas",
    "granola",
    "guisantes",
    "whisky",
    "harina maíz",
    "helado vainilla",
    "hielos",
    "higos",
    "hojas laurel",
    "huevos codorniz",
    "infusiones",
    "jengibre polvo",
    "jugo frutas",
    "kale",
    "ketchup",
    "kiwi enlatado",
    "leche almendra",
    "levadura",
    "lima enlatada",
    "limón enlatado",
    "limonada",
    "maíz",
    "maíz enlatado",
    "malvaviscos",
    "mandarinas enlatadas",
    "mango enlatado",
    "manteca cerdo",
    "manteca vegetal",
    "maracuyá",
    "margarina",
    "mermelada",
    "mayonesa",
    "merengue",
    "mermelada",
    "mezcla especias",
    "mezcla panqueques",
    
  ];
}