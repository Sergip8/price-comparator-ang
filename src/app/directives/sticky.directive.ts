import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSticky]'
})
export class StickyDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const offset = 10; // Ajusta la distancia desde la parte superior según tus necesidades
    
    if (scrollPosition > offset) {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'fixed');
      this.renderer.setStyle(this.el.nativeElement, 'top', offset + 'px');
    } else {
      this.renderer.setStyle(this.el.nativeElement, 'position', 'absolute');
      this.renderer.setStyle(this.el.nativeElement, 'top', '10px'); // Restablece la posición original
    }
  }
}