import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  toggleColor(event: Event) {
    let target = event.target as HTMLElement | SVGElement;

    if (target.tagName === 'path') {
      const parentSvg = target.closest('svg');
      if (parentSvg) {
        target = parentSvg as SVGElement;
      }
    }
    if (target instanceof SVGElement) {
      target.style.fill = target.style.fill === 'none' ? 'black' : 'none';
    }
  }
}
