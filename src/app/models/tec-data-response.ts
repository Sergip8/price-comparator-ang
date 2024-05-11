export class TecDataResponse{
    id: number
    name: string
    link_img: string
    brand: string
    image: string;
    price: number;
    list_price: number;
    category: string;
    store: string;
    url: string
}

export class TecDataResponseUnified{
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

export interface SuggestedProducts{
    id: number
    name: string
    brand: string
    ids: string[]
    price: number;
    link_img: string
    category: string
}