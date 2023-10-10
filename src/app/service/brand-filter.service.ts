import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class BrandFilterService{
    isBrandChecked: boolean = false

 
    
    brandState: Map<string, boolean>
    brandsSelected = new BehaviorSubject<string[]>([]) 
    brands = new BehaviorSubject<string[]>([]) 
    categories = new BehaviorSubject<string[]>([]) 
    priceRange = new BehaviorSubject<number[]>([1, 20000000]) 
}