import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { LigaService } from './services/liga.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NacionalnostService } from './services/nacionalnost.service';
import { TimService } from './services/tim.service';
import { IgracService } from './services/igrac.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';

import { AppComponent } from './app.component';
import { LigaComponent } from './liga/liga.component';
import { NacionalnostComponent } from './nacionalnost/nacionalnost.component';
import { TimComponent } from './tim/tim.component';
import { IgracComponent } from './igrac/igrac.component';
import { HomeComponent } from './home/home.component';
import { LigaDialogComponent } from './dialog/liga-dialog/liga-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NacionalnostDialogComponent } from './dialog/nacionalnost-dialog/nacionalnost-dialog.component';
import { TimDialogComponent } from './dialog/tim-dialog/tim-dialog.component';
import { IgracDialogComponent } from './dialog/igrac-dialog/igrac-dialog.component';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AuthorComponent } from './author/author.component';
import { MentorComponent } from './mentor/mentor.component';

const Routes = [
  { path: 'liga', component: LigaComponent },
  { path: 'nacionalnost', component: NacionalnostComponent },
  { path: 'tim', component: TimComponent },
  { path: 'igrac', component: IgracComponent },
  { path: 'home', component: HomeComponent },
  { path: 'mentor', component: MentorComponent },
  { path: 'author', component: AuthorComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    LigaComponent,
    NacionalnostComponent,
    TimComponent,
    IgracComponent,
    HomeComponent,
    LigaDialogComponent,
    NacionalnostDialogComponent,
    TimDialogComponent,
    IgracDialogComponent,
    AuthorComponent,
    MentorComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    RouterModule.forRoot(Routes),
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    LigaService,
    NacionalnostService,
    TimService,
    IgracService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
