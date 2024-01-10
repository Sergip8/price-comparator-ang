import { BasicData } from "./basic-data"
import { SearchTec } from "./search-tec"
import { TecDataResponse, TecDataResponseUnified } from "./tec-data-response"

export class SearchTecPayload{
    
    brands: string[]
    categories: string[]
    count: number
    priceRange: number[]
    results: TecDataResponse[] = []
}
   
export class SearchTecPayloadUnified{
    
    filterGroup: FilterData[]
    payload: ProductData[]
    response: TecDataResponseUnified[] = []
}
export interface FilterData{

    filterName: string[]
    count: number
}
export interface ProductData{
    categories: string[]
    brands: string[]
    maxPrice: number
    minPrice: number
    count: number
}