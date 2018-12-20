import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Link } from './link';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class LinkService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private LinksUrl = 'http://localhost:5000/enp/links';  // URL to web api

  getLinks(): Observable<Link[]> {
    // TODO: send the message _after_ fetching the Links
    this.messageService.add('LinkService: fetched Links');
    return this.http.get<Link[]>(this.LinksUrl)
      .pipe(
        catchError(this.handleError('getLinks', []))
      );
  }

  getLink(LinkId: number): Observable<Link> {
    // TODO: send the message _after_ fetching the Link
    this.messageService.add(`LinkService: fetched Link LinkId=${LinkId}`);
    const url = `${this.LinksUrl}/${LinkId}`;
    return this.http.get<Link>(url).pipe(
      catchError(this.handleError<Link>(`getLink LinkId=${LinkId}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`LinkService: ${message}`);
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
