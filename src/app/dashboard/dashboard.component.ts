import {Component, Input, OnInit, signal} from '@angular/core';
import {AddDataComponent} from './add-data/add-data.component';
import {StoreService} from "../shared/store.service";
import {Course} from "../shared/Interfaces/Course";
import {Datatable2Component} from "./datatable2/datatable2.component";
import {AnmeldungenComponent} from "./anmeldungen/anmeldungen.component";
import {
  MatAccordion, MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelTitle
} from "@angular/material/expansion";

@Component({
  selector: 'app-dashboard',
  imports: [
    AddDataComponent,
    Datatable2Component,
    AnmeldungenComponent,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatExpansionModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  readonly panelOpenState = signal(false);
  public courses: Course[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.courses = this.storeService.courses;
  }


}
