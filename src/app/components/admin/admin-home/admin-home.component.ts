import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GenralService } from '../../../services/genral.service';


@Component({
  selector: 'app-admin-home',
  imports: [RouterModule],
  providers: [GenralService],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})

export class AdminHomeComponent {

  storeList: string[] = []
  authList: string[] = []
  modelCatList: string[] = []

  constructor(private genralService: GenralService) {
    this.storeList = this.genralService.storeModels;
    this.authList = this.genralService.authModels;
    this.modelCatList = this.genralService.modelCategories;
  }
}
