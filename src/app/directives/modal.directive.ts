import { HostListener, Directive, OnInit, Input } from '@angular/core';




@Directive({
  selector: '[openModal]'
})

export class ModalDirective {

  @Input('modal') identifier: string;

  constructor() { }

  @HostListener('click', ['$event'])
  clickEvent(event) {
    event.preventDefault();
    event.stopPropagation();
   
  }

}