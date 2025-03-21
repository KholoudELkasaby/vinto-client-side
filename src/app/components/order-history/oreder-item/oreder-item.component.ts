import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-oreder-item',
  imports: [],
  templateUrl: './oreder-item.component.html',
  styleUrl: './oreder-item.component.css'
})
export class OrederItemComponent {
  @Input() cart: any;
}
