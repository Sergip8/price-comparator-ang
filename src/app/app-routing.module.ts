import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewResultListComponent } from './components/view-result-list/view-result-list.component';
import { PartesPcViewComponent } from './components/partes-pc-view/partes-pc-view.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ViewResultsMercadoListComponent } from './components/view-results-mercado-list/view-results-mercado-list.component';

const routes: Routes = [
  
    {path: "tecnologia", component: ViewResultListComponent},
    {path: "partes_pc/:search", component: PartesPcViewComponent},
    {path: "mercado/:search", component: ViewResultsMercadoListComponent},
    {path: "mercado/categoria/:category", component: ViewResultsMercadoListComponent},
    {path: "tecnologia/categoria/:category0", component: ViewResultListComponent},
    {path: "tecnologia/categoria/:category0/:category1", component: ViewResultListComponent},
    {path: "tecnologia/categoria/:category0/:category1/:category2", component: ViewResultListComponent},




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
