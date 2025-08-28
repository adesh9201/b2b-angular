import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = '#ffeb3b';
  @Input() defaultColor: string = 'transparent';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setBackground(this.defaultColor);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBackground(this.appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBackground(this.defaultColor);
  }

  private setBackground(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}