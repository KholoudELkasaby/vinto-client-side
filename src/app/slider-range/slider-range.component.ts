import { Component ,ViewEncapsulation , Output , EventEmitter } from '@angular/core';
import { NgModule } from '@angular/core';

import { Ng5SliderModule, Options } from 'ng5-slider';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-slider-range',
  imports: [MatSliderModule,FormsModule ],
  templateUrl: './slider-range.component.html',
  styleUrl: './slider-range.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class SliderRangeComponent {
  minvalue=200;
  maxvalue=50000;
  resetSliderValues(){
    this.minvalue= 200 ;
    this.maxvalue=50000;

  }

  @Output() saveSliderEvent = new EventEmitter<{ min: number; max: number }>();

  SaveSliderValues() {
    this.saveSliderEvent.emit({ min: this.minvalue, max: this.maxvalue });
  }
 
}
