import {Component, Input, OnInit} from '@angular/core';
import {DataComponent} from './data/data.component';
import {AddDataComponent} from './add-data/add-data.component';
import {StoreService} from "../shared/store.service";
import {Course} from "../shared/Interfaces/Course";
import {Datatable2Component} from "../datatable2/datatable2.component";
import {AnmeldungenComponent} from "../anmeldungen/anmeldungen.component";

@Component({
  selector: 'app-dashboard',
  imports: [DataComponent, AddDataComponent, Datatable2Component, AnmeldungenComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  public courses: Course[] = [];

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.courses = this.storeService.courses;
  }


}
