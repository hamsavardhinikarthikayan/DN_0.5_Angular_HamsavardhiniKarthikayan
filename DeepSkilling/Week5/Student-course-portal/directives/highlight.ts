import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
  Input
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class Highlight {

  @Input() appHighlight = 'yellow';

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {}

  @HostListener('mouseenter')
  onMouseEnter() {

    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      this.appHighlight
    );

  }

  @HostListener('mouseleave')
  onMouseLeave() {

    this.renderer.removeStyle(
      this.element.nativeElement,
      'background-color'
    );

  }

}