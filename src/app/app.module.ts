import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewResultCardComponent } from './components/view-result-card/view-result-card.component';
import { ViewResultListComponent } from './components/view-result-list/view-result-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchBarResultComponent } from './components/search-bar/search-bar_results.component';
import { MenuFilterComponent } from './components/menu-filter/menu-filter.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import { PriceSlideComponent } from './components/price-slide/price-slide.component';
import { PartesPcViewComponent } from './components/partes-pc-view/partes-pc-view.component';
import { PartesPcListComponent } from './components/partes-pc-list/partes-pc-list.component';
import { ViewResultsMercadoListComponent } from './components/view-results-mercado-list/view-results-mercado-list.component';
import { RouteReuseStrategy } from '@angular/router';
import { ReuseRouteStrategyService } from './service/reuse-route-strategy.service';
import { CategoriesMenuListComponent } from './components/categories-menu-list/categories-menu-list.component';
import { BrandsMenuListComponent } from './components/brands-menu-list/brands-menu-list.component';
import { LoadingComponent } from './components/loading/loading.component';
import { FallbackImgDirective } from './directives/fallback-img.directive';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { InfiniteScrollDirective } from './directives/infinite-scroll.directive';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductCarouselComponent } from './components/home/product-carousel.component';




@NgModule({
  declarations: [
    AppComponent,
    ViewResultCardComponent,
    ViewResultListComponent,
    SearchBarComponent,
    MenuFilterComponent,
    SearchBarResultComponent,
    MenuFilterComponent,
    MenuComponent,
    PriceSlideComponent,
    PartesPcViewComponent,
    PartesPcListComponent,
    ViewResultsMercadoListComponent,
    CategoriesMenuListComponent,
    BrandsMenuListComponent,
    LoadingComponent,
    FallbackImgDirective,
    NavbarComponent,
    HomeComponent,
    InfiniteScrollDirective,
    ProductCarouselComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatIconModule,
    CarouselModule 
 
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: ReuseRouteStrategyService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
