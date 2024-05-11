import { Component, OnInit } from '@angular/core';
import { AuthAltasService } from './service/auth-atlas.service';
import { mongoAtlas } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'comparador_precios';


}