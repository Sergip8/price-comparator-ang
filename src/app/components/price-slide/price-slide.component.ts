import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { BrandFilterService } from 'src/app/service/brand-filter.service';

@Component({
  selector: 'app-price-slide',
  templateUrl: './price-slide.component.html',
  styleUrls: ['./price-slide.component.css']
})
export class PriceSlideComponent implements OnInit {
  
  setPriceRange: number[]
  @Output() selectedPriceRange = new EventEmitter<number[]>()
  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  minValue = 20;
  maxValue = 50;
  constructor(private filterService: BrandFilterService){
    filterService.priceRange.subscribe(pr => this.setPriceRange = pr)
  }
  
  
  ngOnInit(): void {
    this.min = this.minValue = this.setPriceRange[0]
    this.max = this.maxValue = this.setPriceRange[1]
    this.step = Math.trunc(this.max/this.min*10)
  }

onSliderChanges(){
  //console.log(this.setPriceRange)
  this.filterService.priceRange.next([this.minValue, this.maxValue])
  this.selectedPriceRange.emit()
}
ngOnChanges(changes: SimpleChanges) {
//console.log(changes["setPriceRange"])
this.setPriceRange = changes["setPriceRange"].currentValue;
this.min = this.minValue = this.setPriceRange[0]
this.max = this.maxValue = this.setPriceRange[1]
this.step = Math.trunc(this.maxValue/this.minValue*5)
    
}

}
