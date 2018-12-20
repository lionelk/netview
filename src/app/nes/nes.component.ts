import { Component, OnInit } from '@angular/core';
import { Ne } from '../ne';
import { NeService } from '../ne.service';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-nes',
  templateUrl: './nes.component.html',
  styleUrls: ['./nes.component.css']
})

export class NesComponent implements OnInit {

  selectedNe: Ne;
  nes: Ne[];

  constructor(private neService: NeService,
              private dashboard: DashboardComponent) {}

  ngOnInit() {
    console.log('ngOnInit() on NesComponent');
    this.getNes();
  }

  onSelect(ne: Ne): void {
    this.selectedNe = ne;
  }

  onMouseEnter(ne: Ne): void {
    console.log('onMouseEnter: ' + ne.name);
    this.dashboard.highlightNe(ne.name, true);
  }

  onMouseLeave(ne: Ne): void {
    console.log('onMouseLeave: ' + ne.name);
    this.dashboard.highlightNe(ne.name, false);
  }

  getNes(): void {
    this.neService.getNes()
        .subscribe(nes => this.nes = nes);
  }
}
