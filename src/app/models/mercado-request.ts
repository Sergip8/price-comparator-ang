import { MercadoData } from "./mercado-data"

export interface MercadoRequest{
    store: string
    url: string
    page: number
    data: MercadoData[]
}
