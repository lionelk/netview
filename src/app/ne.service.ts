import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Ne } from './ne';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class NeService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private nesUrl = 'http://localhost:5000/enp/nes';  // URL to web api

  getNes(): Observable<Ne[]> {
    // TODO: send the message _after_ fetching the nes
    this.messageService.add('NeService: fetched nes');
    return this.http.get<Ne[]>(this.nesUrl)
      .pipe(
        catchError(this.handleError('getNes', []))
      );
  }

  getNe(neId: number): Observable<Ne> {
    // TODO: send the message _after_ fetching the ne
    this.messageService.add(`NeService: fetched ne neId=${neId}`);
    const url = `${this.nesUrl}/${neId}`;
    return this.http.get<Ne>(url).pipe(
      catchError(this.handleError<Ne>(`getNe neId=${neId}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`NeService: ${message}`);
  }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */

  private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
  }
}
