import {AfterViewInit, Component, Input, ViewChild} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { Datatable2DataSource } from './datatable2-datasource';
import {Course} from "../../shared/Interfaces/Course";
import {StoreService} from "../../shared/store.service";
import {BackendService} from "../../shared/backend.service";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-datatable2',
  templateUrl: './datatable2.component.html',
  styleUrl: './datatable2.component.css',
  standalone: true,
    imports: [MatTableModule, MatPaginatorModule, MatSortModule, NgForOf, DatePipe]
})
export class Datatable2Component implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Course>;
  dataSource!: Datatable2DataSource;
  public page: number = 0;

  constructor(public storeService: StoreService, private backendService: BackendService) {
    this.dataSource = new Datatable2DataSource(storeService);
  }


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'eventLocation.name', 'eventLocation.address', 'eventLocation.venueByPublicTansport', 'instructor', 'dates'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
