import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {

  @Input() loading: boolean

  ngOnChanges(changes: SimpleChanges) {
   
    this.loading = changes["loading"].currentValue
  }
}
