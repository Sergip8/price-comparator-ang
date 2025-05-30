import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from "@angular/core";


@Directive({
    selector: '[ScrollNearEnd]',
    //standalone: true,
  })
  export class InfiniteScrollDirective implements OnInit {
    @Output() nearEnd: EventEmitter<void> = new EventEmitter<void>();
  
    /**
     * threshold in PX when to emit before page end scroll
     */
    @Input() threshold = 50;
  
    private window!: Window;
  
    constructor(private el: ElementRef) {}
  
    ngOnInit(): void {
      // save window object for type safety
      this.window = window;
    }
  
    @HostListener('window:scroll', ['$event.target'])
    windowScrollEvent(event: KeyboardEvent) {
      // height of whole window page
      const heightOfWholePage = this.window.document.documentElement.scrollHeight;
  
      // how big in pixels the element is
      const heightOfElement = this.el.nativeElement.scrollHeight;
  
      // currently scrolled Y position
      const currentScrolledY = this.window.scrollY;
  
      // height of opened window - shrinks if console is opened
      const innerHeight = this.window.innerHeight;
  
      const spaceOfElementAndPage = heightOfWholePage - heightOfElement;
  
      const scrollToBottom =
        heightOfElement - innerHeight - currentScrolledY + spaceOfElementAndPage;
  
      if (scrollToBottom < this.threshold) {
        
        this.nearEnd.emit();
        //console.log("######EMIT#######")
      }
    }
  }