import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Observable } from 'rxjs';
import { BrandFilterService } from 'src/app/service/brand-filter.service';

@Component({
  selector: 'app-price-slide',
  templateUrl: './price-slide.component.html',
  styleUrls: ['./price-slide.component.css']
})
export class PriceSlideComponent implements OnInit {
  
  @Output() selectedPriceRange = new EventEmitter<number[]>()
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  minValue = 20;
  maxValue = 50;
  constructor(public filterService: BrandFilterService){
    this.filterService.priceRange.subscribe(pr =>{
    this.minValue = pr[0]
     this.maxValue = pr[1]
    })
    this.filterService.priceRangeState.subscribe(spr =>{
      this.min = spr[0]
      this.max = spr[1]
      })
  }
  
  
  ngOnInit(): void {
    
    this.step = Math.trunc(this.max/this.min*10)
    console.log(this.maxValue)
    console.log(this.minValue)
    console.log(this.filterService.priceRange.value)
    //console.log(this.filterService.setPriceRange.value)

  }
  
  onSliderChanges(){
    
    this.filterService.priceRange.next([this.minValue, this.maxValue])
    this.selectedPriceRange.emit([this.minValue, this.maxValue])
    
  }

}



