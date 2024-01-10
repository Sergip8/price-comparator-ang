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
import { DragScrollModule } from 'ngx-drag-scroll';
import { PriceHistoryChartComponent } from './components/price-history-chart/price-history-chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { LoginComponent } from './components/login/login.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ModalDirective } from './directives/modal.directive';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';

import {GoogleLoginProvider,FacebookLoginProvider} from '@abacritt/angularx-social-login';
import {  GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { environment, firebaseConfig } from 'src/environments/environment';
import {CookieService} from 'ngx-cookie-service';
import { ProductFavoritesComponent } from './components/navbar/favorite-view';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { RegisterComponent } from './components/register/register.component';
import { SocialButtoms } from './components/navbar/social-buttons';
import { MenuMobileComponent } from './components/menu-mobile/menu-mobile.component';
import { SortSelect } from './components/view-result-list copy/sort-select';
import { FilterView } from './components/menu-filter/filter-view';
import { ViewResultListUComponent } from './components/view-result-list copy/view-result-listU.component';
import { TreeLinks } from './components/view-result-list copy/tree-link';
import { UserButtoms } from './components/navbar/user-buttoms';
import { SuggestedResults } from './components/search-bar/suggested-results';

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
    NavbarComponent,
    HomeComponent,
    ProductCarouselComponent,
    PriceHistoryChartComponent,
    ProductDetailComponent,
    LoginComponent,
    ProductFavoritesComponent,
    SocialButtoms,
    SortSelect,
    FilterView,
    TreeLinks,
    UserButtoms,
    SuggestedResults,

    ViewResultListUComponent,
    
    ClickOutsideDirective,
    FallbackImgDirective,
    InfiniteScrollDirective,
    ModalDirective,
    RegisterComponent,
    MenuMobileComponent
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
    CarouselModule,
    DragScrollModule,
    NgApexchartsModule,
    SocialLoginModule ,
    GoogleSigninButtonModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
 
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.clientId)
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
   
  
    },
    { provide: RouteReuseStrategy,
     useClass: ReuseRouteStrategyService,},
     CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
