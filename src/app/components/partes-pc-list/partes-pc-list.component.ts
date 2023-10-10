import { Component, Input } from '@angular/core';
import { PartesPc } from 'src/app/models/partes-pc';
import { PartesPcData } from 'src/app/models/partes-pc-data';

@Component({
  selector: 'app-partes-pc-list',
  templateUrl: './partes-pc-list.component.html',
  styleUrls: ['./partes-pc-list.component.css']
})
export class PartesPcListComponent {
  @Input() partesPc: PartesPcData
}
