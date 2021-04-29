import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TimService } from './../../services/tim.service';
import { Liga } from 'src/app/models/liga.model';
import { LigaService } from 'src/app/services/liga.service';

@Component({
  selector: 'app-tim-dialog',
  templateUrl: './tim-dialog.component.html',
  styleUrls: ['./tim-dialog.component.css'],
})
export class TimDialogComponent implements OnInit {
  lige: Liga[];
  public flag: number;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<TimDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public timService: TimService,
    public ligaService: LigaService
  ) {}

  public add(): void {
    this.timService.addTim(this.data);
    this.snackBar.open('Uspesno dodat tim: ' + this.data.naziv, 'U redu', {
      duration: 3000,
    });
  }

  public update(): void {
    this.timService.updateTim(this.data);
    this.snackBar.open('Uspesno azuriran tim: ' + this.data.naziv, 'U redu', {
      duration: 3000,
    });
  }

  public delete(): void {
    this.timService.deleteTim(this.data.id);
    this.snackBar.open('Uspesno obrisan tim: ' + this.data.id, 'U redu', {
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
    this.ligaService.getAllLiga().subscribe((lige) => (this.lige = lige));
  }

  compareTo(a, b) {
    return a.id === b.id;
  }
}
