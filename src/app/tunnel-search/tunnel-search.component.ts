import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Tunnel } from '../tunnel';
import { TunnelService } from '../tunnel.service';

@Component({
  selector: 'app-tunnel-search',
  templateUrl: './tunnel-search.component.html',
  styleUrls: ['./tunnel-search.component.css']
})
export class TunnelSearchComponent implements OnInit {

  tunnels$: Observable<Tunnel[]>;
  private searchTerms = new Subject<string>();

  constructor(private tunnelService: TunnelService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.tunnels$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.tunnelService.searchTunnels(term)),
    );
  }

}
