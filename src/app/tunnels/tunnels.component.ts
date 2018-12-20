import { Component, OnInit } from '@angular/core';
import { Tunnel } from '../tunnel';
import { TunnelService } from '../tunnel.service';

@Component({
  selector: 'app-tunnels',
  templateUrl: './tunnels.component.html',
  styleUrls: ['./tunnels.component.css']
})

export class TunnelsComponent implements OnInit {

  selectedTunnel: Tunnel;
  tunnels: Tunnel[];

  constructor(private tunnelService: TunnelService) { }

  ngOnInit() {
    this.getTunnels();
  }

  onSelect(tunnel: Tunnel): void {
    this.selectedTunnel = tunnel;
  }

  getTunnels(): void {
    this.tunnelService.getTunnels()
        .subscribe(tunnels => this.tunnels = tunnels);
  }
}
