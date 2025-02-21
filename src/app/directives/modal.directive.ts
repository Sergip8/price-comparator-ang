import { HostListener, Directive, OnInit, Input, ElementRef, Renderer2, RendererStyleFlags2, SimpleChanges } from '@angular/core';




@Directive({
  selector: '[openModal]'
})

export class ModalDirective {

  private overlay: HTMLDivElement;

  @Input() set appOscurecerPagina(activo: boolean) {
  
    this.action(activo)
  }


  action(activo: boolean){
    if (activo) {
  
      this.mostrarOverlay();
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } if(!activo) {
      
   
        this.ocultarOverlay();

      
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    //this.crearOverlay();
  }

  private crearOverlay() {
    this.overlay = this.renderer.createElement('div');
    this.renderer.setProperty(this.overlay, 'id', 'overlay')
    this.renderer.setStyle(this.overlay, 'position', 'fixed');
    this.renderer.setStyle(this.overlay, 'top', '0');
    this.renderer.setStyle(this.overlay, 'left', '0');
    this.renderer.setStyle(this.overlay, 'width', '100%');
    this.renderer.setStyle(this.overlay, 'height', '100%');
    this.renderer.setStyle(this.overlay, 'background-color', 'rgba(0, 0, 0, 0.3)');
    this.renderer.setStyle(this.overlay, 'z-index', '800');
    this.renderer.setStyle(this.overlay, 'display', 'block');
    this.renderer.appendChild(document.body, this.overlay);
  }

  private mostrarOverlay() {
    this.crearOverlay()
  }

  private ocultarOverlay() {
  
    const overlay = document.getElementById('overlay')
    if(overlay){
      this.renderer.removeChild(document.body, overlay)

    }
   
  }
}