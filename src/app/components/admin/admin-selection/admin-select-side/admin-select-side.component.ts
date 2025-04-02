import { Component } from '@angular/core';
import { GenralService } from '../../../../services/genral.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-select-side',
  imports: [RouterModule],
  providers: [GenralService],
  templateUrl: './admin-select-side.component.html',
  styleUrl: './admin-select-side.component.css'
})
export class AdminSelectSideComponent {

  storeList: string[] = []
  authList: string[] = []
  modelCatList: string[] = []

  constructor(private genralService: GenralService) {
    this.storeList = this.genralService.storeModels;
    this.authList = this.genralService.authModels;
    this.modelCatList = this.genralService.modelCategories;
  }

}
