import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '.appHighlight'
})
export class HighlightDirective {

  constructor(private el: ElementRef) { }

  @HostListener('mouseenter') onmouseenter(){
    this.hover('80px','40px');
  }

  @HostListener('mouseleave') onmouseleave(){
    this.hover('60px','30px');
  }

  private hover(height: string, radius: string){
    this.el.nativeElement.style.maxHeight = height;
    this.el.nativeElement.style.borderRadius = radius;
  }

}
