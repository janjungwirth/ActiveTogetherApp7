import {AfterViewInit, Component, numberAttribute, ViewChild} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {StoreService} from "../../shared/store.service";
import {BackendService} from "../../shared/backend.service";
import {AnmeldungenDataSource} from "./anmeldungen-datasource";
import {Registration} from "../../shared/Interfaces/Registration";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-anmeldungen',
  templateUrl: './anmeldungen.component.html',
  styleUrl: './anmeldungen.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe]
})
export class AnmeldungenComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Registration>;
  dataSource!: AnmeldungenDataSource;
  public page: number = 0;

  constructor(public storeService: StoreService, private backendService: BackendService) {
    this.dataSource = new AnmeldungenDataSource(storeService);
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'birthdate', 'courseId', 'email', 'notifications', 'registrationdate', 'abmelden'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }


  translateKurs(courseId: string): string {
    const course = this.storeService.courses.find(x => x.id === courseId);
    return course?.name || 'Unbekannter Kurs';
  }

  confirmDeletion(id: number) {
    const confirmation = confirm('Möchten Sie die Anmeldung wirklich löschen?');
    if (confirmation) {
      this.backendService.delete(id);
    }
  }
}
