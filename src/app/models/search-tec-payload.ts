import { BasicData } from "./basic-data"
import { SearchTec } from "./search-tec"
import { TecDataResponse } from "./tec-data-response"

export class SearchTecPayload{
    
    brands: string[]
    categories: string[]
    results: TecDataResponse[] = []
    count: number
    priceRange: number[]
}
   