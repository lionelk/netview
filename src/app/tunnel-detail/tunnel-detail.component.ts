import { Component, OnInit, Input } from '@angular/core';
import { Tunnel } from '../tunnel';
import { TunnelService } from '../tunnel.service';
import { Lsp } from '../lsp';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-tunnel-detail',
  templateUrl: './tunnel-detail.component.html',
  styleUrls: ['./tunnel-detail.component.css']
})
export class TunnelDetailComponent implements OnInit {

  @Input() tunnel: Tunnel;

  workingLSP: Lsp;
  protectingLSP: Lsp;

  constructor(private tunnelService: TunnelService, private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.add('ngOnInit TunnelDetailComponent ');
  }
}
