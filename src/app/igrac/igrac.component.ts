import { IgracService } from './../services/igrac.service';
import { Igrac } from './../models/igrac.model';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { Nacionalnost } from '../models/nacionalnost.model';
import { Tim } from '../models/tim.model';
import { IgracDialogComponent } from '../dialog/igrac-dialog/igrac-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-igrac',
  templateUrl: './igrac.component.html',
  styleUrls: ['./igrac.component.css'],
})
export class IgracComponent implements OnInit {
  displayedColumns = [
    'id',
    'ime',
    'prezime',
    'brojReg',
    'datumRodjenja',
    'nacionalnost',
    'tim',
    'actions',
  ];
  //dataSource: Observable<Igrac[]>;
  dataSource: MatTableDataSource<Igrac>;
  database: IgracService | null;
  currentDate = new Date();

  @Input()
  selektovanTim: Tim;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;

  constructor(
    public httpClient: HttpClient,
    public igracService: IgracService,
    public dialog: MatDialog
  ) {}

  public openDialog(
    flag: number,
    id: number,
    ime: string,
    prezime: string,
    brojReg: string,
    datumRodjenja: Date,
    nacionalnost: Nacionalnost,
    tim: Tim
  ) {
    const dialogRef = this.dialog.open(IgracDialogComponent, {
      data: {
        id: id,
        ime: ime,
        prezime: prezime,
        brojReg: brojReg,
        datumRodenja: new Date(datumRodjenja),
        nacionalnost: nacionalnost,
        tim: tim,
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

  ngOnChanges() {
    if (this.selektovanTim.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.igracService
      .getIgraciTimova(this.selektovanTim.id)
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sortingDataAccessor = (data, property) => {
          switch (property) {
            case 'id':
              return data[property];
            case 'datumRodjenja':
              return data[property];
            case 'nacionalnost':
              return data[property];
            case 'tim':
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
