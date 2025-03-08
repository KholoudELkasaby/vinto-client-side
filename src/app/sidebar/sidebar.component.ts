import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  isDropdownVisible = false;
  isDropdownVisible2 = false;

press(){
  this.isDropdownVisible = !this.isDropdownVisible;
  const dropdownHelper = document.getElementById("dropdownHelper") as HTMLDivElement | null;
  if (dropdownHelper) {
    dropdownHelper.style.display = this.isDropdownVisible ? "block" : "none";
  }
  console.log(",,,,,,,,,,,,,,,,");
}


press2(){
  

  this.isDropdownVisible2 = !this.isDropdownVisible2;
  const dropdownHelperp = document.getElementById("dropdownHelperp") as HTMLDivElement | null;
  if (dropdownHelperp) {
    dropdownHelperp.style.display = this.isDropdownVisible2 ? "block" : "none";
  }
  console.log(",,,,,,,,,,,,,,,,");
}

}
