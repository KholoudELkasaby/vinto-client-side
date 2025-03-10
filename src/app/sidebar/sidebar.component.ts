import { Component } from '@angular/core';
import { SliderRangeComponent } from '../slider-range/slider-range.component';

@Component({
  selector: 'app-sidebar',
  imports: [SliderRangeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isDropdownVisible = false;
  isDropdownVisible2 = false;
  x:string= "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
  x2:string= "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
  

  // SG:any;
  constructor(){
    // this.SG = document.getElementById("SG")  as HTMLDivElement;
  }
press(){
  this.isDropdownVisible = !this.isDropdownVisible;
  const dropdownHelper = document.getElementById("dropdownHelper") as HTMLDivElement | null;
  if (dropdownHelper) {
    dropdownHelper.style.display = this.isDropdownVisible ? "block" : "none";
    
    this.x= this.x== "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" ?  "m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1": "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7";
    // console.log(this.SG) ;
      // this.SG.tra = "transform 0.3s ease-in-out";
      // this.SG.style.transform = this.isDropdownVisible ? "rotate(180deg)" : "rotate(0deg)"; 
   
    }
  console.log(",,,,,,,,,,,,,,,,");
}


press2(){
  

  this.isDropdownVisible2 = !this.isDropdownVisible2;
  const dropdownHelperp = document.getElementById("dropdownHelperp") as HTMLDivElement | null;
  if (dropdownHelperp) {
    dropdownHelperp.style.display = this.isDropdownVisible2 ? "block" : "none";
    this.x2= this.x2== "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" ?  "m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1": "M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7";

  }
  console.log(",,,,,,,,,,,,,,,,");
}


state:boolean=false;
onHovers(state:boolean){
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

// ////////////////////////



}
