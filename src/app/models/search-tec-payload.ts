import { BasicData } from "./basic-data"
import { SearchTec } from "./search-tec"

export interface SearchTecPayload{
    response_count: number
    store_name: string
    resultRes: SearchTec[]
}
   