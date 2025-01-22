import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
    selector: 'app-header',
  imports: [RouterModule, MatButton, MatTooltip],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {
  public title: string = 'Stay Active, Stay Together';
  public imagePath: string = "./../assets/images/sport.jpeg";
}
