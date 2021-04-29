import { LigaService } from './../services/liga.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Liga } from '../models/liga.model';
import { MatDialog } from '@angular/material/dialog';
import { LigaDialogComponent } from '../dialog/liga-dialog/liga-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css'],
})
export class LigaComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'oznaka', 'actions'];
  //dataSource: Observable<Liga[]>;
  dataSource: MatTableDataSource<Liga>;
  database: LigaService | null;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    public httpClient: HttpClient,
    public ligaService: LigaService,
    public dialog: MatDialog
  ) {}

  public openDialog(flag: number, id: number, naziv: string, oznaka: string) {
    const dialogRef = this.dialog.open(LigaDialogComponent, {
      data: { id: id, naziv: naziv, oznaka: oznaka },
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.ligaService.getAllLiga().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id':
            return data[property];
          default:
            return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
