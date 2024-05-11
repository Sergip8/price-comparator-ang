export interface ProductResponse{

    filters: Filters[]
    paginatedResults: Product[]
    parameters: Parameters[]
    totalCount: ProductsCount
}

export interface Filters{
    _id: string
    count: number
}

export interface Product{
    _id: string
    name: string
    link_img: string
    brand: string
    image: string;
    price: number;
    list_price: number;
    category: string;
    store: string
    filters: string[];
    ids: string[]
    url: string
}
export interface Parameters{
    brands: string[]
    categories: string[]
    maxPrice: number
    minPrice: number
}
interface ProductsCount{
    count: number
}