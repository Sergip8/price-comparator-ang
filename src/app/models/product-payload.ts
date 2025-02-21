import { StoreType } from "../service/menu-service"
import { TvFilters } from "./tv-filters"

export class ProductPayload{

    search: string = ""
    category: string = ""
    favoriteIds: string[] = []
    categoryFilter: string = ""
    brands: string[] = []
    page: number = 1
    size: number = 35
    priceRange: number[] = [1,30000000]
    sort: any
    filterList: string[] = []
    operator: string
    typeStore: StoreType
}
