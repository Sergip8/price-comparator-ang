import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewResultCardComponent } from './components/view-result-card/view-result-card.component';
import { ViewResultListComponent } from './components/view-result-list/view-result-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchBarResultComponent } from './components/search-bar/search-bar_results.component';
import { MenuFilterComponent } from './components/menu-filter/menu-filter.component';


@NgModule({
  declarations: [
    AppComponent,
    ViewResultCardComponent,
    ViewResultListComponent,
    SearchBarComponent,
    MenuComponent,
    SearchBarResultComponent,
    MenuFilterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
