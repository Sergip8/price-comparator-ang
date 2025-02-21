import { MercadoData } from "./mercado-data"

export interface MercadoRequest{
    brands: string[]
    categories: string[]
    count: number
    priceRange: number[]
    results: MercadoData[]
}
