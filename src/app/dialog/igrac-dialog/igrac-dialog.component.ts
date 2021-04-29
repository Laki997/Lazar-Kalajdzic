import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IgracService } from 'src/app/services/igrac.service';
import { Nacionalnost } from 'src/app/models/nacionalnost.model';
import { Tim } from 'src/app/models/tim.model';
import { NacionalnostService } from 'src/app/services/nacionalnost.service';
import { TimService } from 'src/app/services/tim.service';

@Component({
  selector: 'app-igrac-dialog',
  templateUrl: './igrac-dialog.component.html',
  styleUrls: ['./igrac-dialog.component.css'],
})
export class IgracDialogComponent implements OnInit {
  nacionalnosti: Nacionalnost[];
  timovi: Tim[];

  public flag: number;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<IgracDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public igracService: IgracService,
    public nacionalnostService: NacionalnostService,
    public timService: TimService
  ) {}

  public add(): void {
    this.igracService.addIgrac(this.data);
    this.snackBar.open('Uspesno dodat igrac: ' + this.data.id, 'U redu', {
      duration: 3000,
    });
  }

  public update(): void {
    this.igracService.updateIgrac(this.data);
    this.snackBar.open('Uspesno azuriran igrac: ' + this.data.id, 'U redu', {
      duration: 3000,
    });
  }

  public delete(): void {
    this.igracService.deleteIgrac(this.data.id);
    this.snackBar.open('Uspesno obrisan igrac: ' + this.data.id, 'U redu', {
      duration: 3000,
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', {
      duration: 1000,
    });
  }

  ngOnInit(): void {
    this.nacionalnostService
      .getAllNacionalnost()
      .subscribe((nacionalnosti) => (this.nacionalnosti = nacionalnosti));
    this.timService.getAllTim().subscribe((timovi) => (this.timovi = timovi));
  }

  compareTo(a, b) {
    return a.id === b.id;
  }
}
