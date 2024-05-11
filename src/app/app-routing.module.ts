import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PartesPcViewComponent } from './components/partes-pc-view/partes-pc-view.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ViewResultsMercadoListComponent } from './components/view-results-mercado-list/view-results-mercado-list.component';
import { HomeComponent } from './components/home/home.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ViewResultListUComponent } from './components/view-result-list/view-result-listU.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ConfirmEmail } from './components/login/confirm-email.component';

const routes: Routes = [
    {path: "", component: HomeComponent},
  
    {path: "product-details/:id", component: ProductDetailComponent},
    
    {path: "partes_pc/:search", component: PartesPcViewComponent},
  
    //{path: "favoritos", component: FavoritesComponent},
    
    // {path: "search", component: ViewResultListComponent},
    // {path: "mercado/categoria/:category", component: ViewResultsMercadoListComponent},
    // {path: "categoria/:category0", component: ViewResultListComponent},
    // {path: "categoria/:category0/:category1", component: ViewResultListComponent},
    // {path: "categoria/:category0/:category1/:category2", component: ViewResultListComponent},

    {path: "search", component: ViewResultListUComponent},
    {path: "emailConfirm", component: ConfirmEmail},
    {path: "favoritos", component: ViewResultListUComponent},
    {path: "categoria/:category0", component: ViewResultListUComponent},
    {path: "categoria/:category0/:category1", component: ViewResultListUComponent},
    {path: "categoria/:category0/:category1/:category2", component: ViewResultListUComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
