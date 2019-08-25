import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '.appHighlight'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onmouseenter(){
    this.hover('#C46D5E');
  }

  @HostListener('mouseleave') onmouseleave(){
    this.hover('#DAA588');
  }

  private hover(color: string){
    this.el.nativeElement.style.borderColor = color;
  }

}
