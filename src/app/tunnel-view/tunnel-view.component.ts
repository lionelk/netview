
import { Component, OnInit, Input } from '@angular/core';
import { Tunnel } from '../tunnel';
import { TunnelService } from '../tunnel.service';
import { Ne } from '../ne';
import { NeService } from '../ne.service';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Lsp } from '../lsp';
import { Lspnode } from '../lspnode';
import * as go from '../../../node_modules/gojs';

@Component({
  selector: 'app-tunnel-view',
  templateUrl: './tunnel-view.component.html',
  styleUrls: ['./tunnel-view.component.css']
})
export class TunnelViewComponent implements OnInit {

  @Input() tunnel: Tunnel;

  workingLSP: Lsp;
  protectingLSP: Lsp;

  diagram: go.Diagram;

  constructor(private tunnelService: TunnelService,
              private dashboard: DashboardComponent,
              private neService: NeService) { }

  ngOnInit() {
    console.log('tunnelView tunnel id = ' + this.tunnel.id);
    let nodeTemplate: go.Node;
    let text: go.TextBlock;
    let shape: go.Shape;

    this.diagram = new go.Diagram('diagramTunnelDiv');

    nodeTemplate = new go.Node(go.Panel.Auto);

    text = new go.TextBlock();
    text.background = 'white';
    text.font = 'bold 10px Verdana';
    text.bind(new go.Binding('text', 'key'));

    nodeTemplate.add(text);

    let linkTemplate: go.Link;
    linkTemplate = new go.Link();
    shape = new go.Shape();
    linkTemplate.add(shape);

    this.diagram.linkTemplate = linkTemplate;
    this.diagram.nodeTemplate = nodeTemplate;

    this.diagram.model = new go.GraphLinksModel( [ ], [ ]);
    this.diagram.initialContentAlignment = go.Spot.Center;
    // enable Ctrl-Z to undo and Ctrl-Y to redo
    this.diagram.undoManager.isEnabled = true;

    this.getTunnelWorkingLSP();
  }

  getTunnelWorkingLSP(): void {
    this.tunnelService.getTunnelWorkingLSP(this.tunnel.id)
        .subscribe(lsp => { this.workingLSP = lsp; this.drawWorkingLsp(lsp); } );
  }

  public drawWorkingLsp(lsp: Lsp): void {
    console.log('drawWorkingLsp start ' );
    this.diagram.startTransaction('make new node');
    console.log('drawWorkingLsp lsp.lspNodes.length: ' + lsp.lspNodes.length);
    let lspnodes: Lspnode[];
    lspnodes = lsp.lspNodes;
    lspnodes.forEach( function(node) {
      console.log('adding node: ' + node.position);
      let nodeName: string;
      nodeName = this.dashboard.getNeName(node.neId);
      console.log('drawWorkingLsp nodeName = ' + nodeName);
      this.diagram.model.addNodeData({ key: nodeName });
    }, this);  // bind this to the foreach scope !!

    this.diagram.commitTransaction('make new node');
    console.log('drawWorkingLsp end ');
  }

}
