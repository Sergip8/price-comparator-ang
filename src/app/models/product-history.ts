export interface ProductHistory{
    price:string
    scrap_date: string
}
export interface HistoryChart{
    name: string
    data: HistoryData[]
}
export interface HistoryData{
    y: string
    x: string
}
