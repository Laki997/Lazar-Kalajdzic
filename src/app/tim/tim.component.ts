import { TimService } from './../services/tim.service';
import { Tim } from './../models/tim.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Liga } from '../models/liga.model';
import { TimDialogComponent } from '../dialog/tim-dialog/tim-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-tim',
  templateUrl: './tim.component.html',
  styleUrls: ['./tim.component.css'],
})
export class TimComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'osnovan', 'sediste', 'liga', 'actions'];
  //dataSource: Observable<Tim[]>;
  dataSource: MatTableDataSource<Tim>;
  database: TimService | null;
  currentDate = new Date();

  selektovanTim: Tim;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    public httpClient: HttpClient,
    public timService: TimService,
    public dialog: MatDialog
  ) {}

  public openDialog(
    flag: number,
    id: number,
    naziv: string,
    osnovan: Date,
    sediste: string,
    liga: Liga
  ) {
    const dialogRef = this.dialog.open(TimDialogComponent, {
      data: {
        id: id,
        naziv: naziv,
        osnovan: new Date(osnovan),
        sediste: sediste,
        liga: liga,
      },
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
    this.timService.getAllTim().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'id':
            return data[property];
          case 'liga':
            return data[property];
          default:
            return data[property].toLocaleLowerCase();
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  public selectRow(row) {
    this.selektovanTim = row;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
