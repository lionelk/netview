import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Tunnel } from './tunnel';
import { Lsp } from './lsp';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class TunnelService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  private tunnelsUrl = 'http://localhost:5000/enp/tunnels';  // URL to web api

  getTunnels(): Observable<Tunnel[]> {
    // TODO: send the message _after_ fetching the tunnels
    this.messageService.add('TunnelService: fetched tunnels');
    return this.http.get<Tunnel[]>(this.tunnelsUrl)
      .pipe(
        catchError(this.handleError('getTunnels', []))
      );
  }

    /** GET tunnel by id. Return `undefined` when id not found */
    getTunnelNo404<Data>(id: number): Observable<Tunnel> {
      const url = `${this.tunnelsUrl}/?id=${id}`;
      return this.http.get<Tunnel[]>(url)
        .pipe(
          map(tunnels => tunnels[0]), // returns a {0|1} element array
          tap(h => {
            const outcome = h ? `fetched` : `did not find`;
            this.log(`${outcome} tunnel id=${id}`);
          }),
          catchError(this.handleError<Tunnel>(`getTunnel id=${id}`))
        );
    }

  getTunnel(tunnelId: number): Observable<Tunnel> {
    // TODO: send the message _after_ fetching the tunnel
    this.messageService.add(`TunnelService: fetched tunnel tunnelId=${tunnelId}`);
    const url = `${this.tunnelsUrl}/${tunnelId}`;
    return this.http.get<Tunnel>(url).pipe(
      catchError(this.handleError<Tunnel>(`getTunnel tunnelId=${tunnelId}`))
    );
  }

  /* GET tunnels whose name contains search term */
  searchTunnels(term: string): Observable<Tunnel[]> {
    if (!term.trim()) {
      // if not search term, return empty tunnel array.
      return of([]);
    }
    return this.http.get<Tunnel[]>(`${this.tunnelsUrl}?name=${term}`).pipe(
      tap(_ => this.log(`found tunnels matching "${term}"`)),
      catchError(this.handleError<Tunnel[]>('searchTunnels', []))
    );
  }

  getTunnelWorkingLSP(tunnelId: number): Observable<Lsp> {
    // TODO: send the message _after_ fetching the tunnel
    this.log(`TunnelService: fetched tunnel WorkingLSP tunnelId=${tunnelId}`);
    const url = `${this.tunnelsUrl}/${tunnelId}/workingLSP`;
    return this.http.get<Lsp>(url).pipe(
      catchError(this.handleError<Lsp>(`getTunnel workingLSP tunnelId=${tunnelId}`))
    );
  }

  getTunnelProtectingLSP(tunnelId: number): Observable<Lsp> {
    // TODO: send the message _after_ fetching the tunnel
    this.log(`TunnelService: fetched tunnel WorkingLSP tunnelId=${tunnelId}`);
    const url = `${this.tunnelsUrl}/${tunnelId}/protectingLSP`;
    return this.http.get<Lsp>(url).pipe(
      catchError(this.handleError<Lsp>(`getTunnel ProtectingLSP tunnelId=${tunnelId}`))
    );
  }

  private log(message: string) {
    this.messageService.add(`TunnelService: ${message}`);
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
