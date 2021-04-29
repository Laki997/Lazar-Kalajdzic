import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Igrac } from './../models/igrac.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class IgracService {
  tima: Igrac[];

  private readonly API_URL = 'http://localhost:8083/igrac/';
  private readonly API_URL_I = 'http://localhost:8083/igraciTimova/';

  dataChange: BehaviorSubject<Igrac[]> = new BehaviorSubject<Igrac[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllIgrac(): Observable<Igrac[]> {
    this.httpClient.get<Igrac[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public getIgraciTimova(idTima): Observable<Igrac[]> {
    this.httpClient.get<Igrac[]>(this.API_URL_I + idTima).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public addIgrac(igrac: Igrac): void {
    this.httpClient.post(this.API_URL, igrac).subscribe();
  }

  public updateIgrac(igrac: Igrac): void {
    this.httpClient.put(this.API_URL + igrac.id, igrac).subscribe();
  }

  public deleteIgrac(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
