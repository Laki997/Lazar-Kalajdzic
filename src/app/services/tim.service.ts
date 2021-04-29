import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Tim } from './../models/tim.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable()
export class TimService {
  private readonly API_URL = 'http://localhost:8083/tim/';

  dataChange: BehaviorSubject<Tim[]> = new BehaviorSubject<Tim[]>([]);

  constructor(private httpClient: HttpClient) {}

  public getAllTim(): Observable<Tim[]> {
    this.httpClient.get<Tim[]>(this.API_URL).subscribe(
      (data) => {
        this.dataChange.next(data);
      },
      (error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
      }
    );
    return this.dataChange.asObservable();
  }

  public addTim(tim: Tim): void {
    this.httpClient.post(this.API_URL, tim).subscribe();
  }

  public updateTim(tim: Tim): void {
    this.httpClient.put(this.API_URL + tim.id, tim).subscribe();
  }

  public deleteTim(id: number): void {
    this.httpClient.delete(this.API_URL + id).subscribe();
  }
}
