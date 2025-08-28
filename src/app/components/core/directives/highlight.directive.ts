import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = '';
  @Input() highlightColor: string = '#ffeb3b';
  @Input() highlightText: string = '';

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.highlightText && this.appHighlight) {
      this.highlightTextInElement();
    }
  }

  private highlightTextInElement(): void {
    const element = this.el.nativeElement;
    const text = element.textContent;
    
    if (!text || !this.highlightText) {
      return;
    }

    const regex = new RegExp(`(${this.escapeRegExp(this.highlightText)})`, 'gi');
    const highlightedText = text.replace(regex, `<mark style="background-color: ${this.highlightColor}">$1</mark>`);
    
    this.renderer.setProperty(element, 'innerHTML', highlightedText);
  }

  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}