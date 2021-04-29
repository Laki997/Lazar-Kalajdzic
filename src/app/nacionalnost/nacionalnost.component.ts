import { NacionalnostService } from './../services/nacionalnost.service';
import { Nacionalnost } from './../models/nacionalnost.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { NacionalnostDialogComponent } from '../dialog/nacionalnost-dialog/nacionalnost-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-nacionalnost',
  templateUrl: './nacionalnost.component.html',
  styleUrls: ['./nacionalnost.component.css'],
})
export class NacionalnostComponent implements OnInit {
  displayedColumns = ['id', 'naziv', 'skracenica', 'actions'];
  //dataSource: Observable<Nacionalnost[]>;
  dataSource: MatTableDataSource<Nacionalnost>;
  database: NacionalnostService | null;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    public httpClient: HttpClient,
    public nacionalnostService: NacionalnostService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  public loadData() {
    this.nacionalnostService.getAllNacionalnost().subscribe((data) => {
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

  public openDialog(
    flag: number,
    id: number,
    naziv: string,
    skracenica: string
  ) {
    const dialogRef = this.dialog.open(NacionalnostDialogComponent, {
      data: { id: id, naziv: naziv, skracenica: skracenica },
    });
    dialogRef.componentInstance.flag = flag;
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.loadData();
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }
}
