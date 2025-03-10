import { Component  } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FilteredImageComponent } from '../filtered-image/filtered-image.component';
import { Ng5SliderModule } from 'ng5-slider';
import { SliderRangeComponent } from '../slider-range/slider-range.component';



@Component({
  selector: 'app-products',
  imports: [SidebarComponent ,FilteredImageComponent , SliderRangeComponent ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  state:boolean=false;
  onHover(state:boolean){
    var slider= document.getElementById("slider")  as HTMLElement ||null;
    console.log(slider);
    if(state==true &&  state!=null){
      slider.style.visibility="visible";
      
    }
    else if(state==false){
      slider.style.visibility="hidden";

    }
    console.log(state);
  }




  // ///////////////////
 
  
  
}
