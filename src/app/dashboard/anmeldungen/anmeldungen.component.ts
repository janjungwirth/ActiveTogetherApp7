import {AfterViewInit, ChangeDetectorRef, Component, numberAttribute, ViewChild} from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import {StoreService} from "../../shared/store.service";
import {BackendService} from "../../shared/backend.service";
import {AnmeldungenDataSource} from "./anmeldungen-datasource";
import {Registration} from "../../shared/Interfaces/Registration";
import {DatePipe, NgIf} from "@angular/common";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-anmeldungen',
  templateUrl: './anmeldungen.component.html',
  styleUrl: './anmeldungen.component.css',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, MatProgressSpinner, NgIf]
})
export class AnmeldungenComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Registration>;
  dataSource!: AnmeldungenDataSource;
  public page: number = 0;
  deletingRows: string[] = [];

  constructor(public storeService: StoreService, private backendService: BackendService, private cdr: ChangeDetectorRef) {
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


  isDeleting(id: string): boolean {
    return this.deletingRows.includes(id);
  }

  confirmDeletion(id: string) {
    const confirmation = confirm('Möchten Sie die Anmeldung wirklich löschen?');

    if (confirmation) {
      // ID der Zeile zur aktiv löschenden Liste hinzufügen
      this.deletingRows.push(id);
      this.cdr.detectChanges();
      // Backend-Löschaufruf
      this.backendService.delete(id).subscribe({
        next: () => {
          // Erfolgreich gelöscht: Zeile aus der Datenquelle entfernen
          this.dataSource.data = this.dataSource.data.filter(row => row.id !== id);
        },
        error: (err) => {
          console.error('Fehler beim Löschen:', err);
        },
        complete: () => {
          // ID aus der löschenden Liste entfernen
          this.deletingRows = this.deletingRows.filter(deletingId => deletingId !== id);
          this.cdr.detectChanges();
        }
      });
    }
  }
}
