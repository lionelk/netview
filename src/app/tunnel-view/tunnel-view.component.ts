
import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
export class TunnelViewComponent implements OnInit, OnChanges {

  @Input() tunnel: Tunnel;

  workingLSP: Lsp;
  protectingLSP: Lsp;

  diagram: go.Diagram;

  constructor(private tunnelService: TunnelService,
              private dashboard: DashboardComponent,
              private neService: NeService) { }

  ngOnInit() {
    console.log('tunnelView ngOnInit');
    this.initDiagram();
  }

  initDiagram(): void {
    let nodeTemplate: go.Node;
    let text: go.TextBlock;
    let shape: go.Shape;

    this.diagram = new go.Diagram('diagramTunnelDiv');

    nodeTemplate = new go.Node(go.Panel.Position);
    nodeTemplate.fromSpot = go.Spot.RightSide;  // coming out from right side
    nodeTemplate.toSpot = go.Spot.LeftSide;

    shape = new go.Shape();
    shape.figure = 'RoundedRectangle';
    shape.bind(new go.Binding('loc', 'location'));
    shape.bind(new go.Binding('fill', 'color'));
    shape.bind(new go.Binding('scale', 'scale'));

    text = new go.TextBlock();
    text.background = 'white';
    text.font = 'bold 10px Verdana';
    text.bind(new go.Binding('text', 'key'));

    nodeTemplate.add(shape);
    nodeTemplate.add(text);

    nodeTemplate.defaultAlignment = go.Spot.MiddleLeft;
    // nodeTemplate.alignment = go.Panel.Horizontal;

    let linkTemplate: go.Link;
    linkTemplate = new go.Link();
    linkTemplate.routing = go.Link.Orthogonal;  // Orthogonal routing
    linkTemplate.corner = 10; // with rounded corners
    shape = new go.Shape();
    linkTemplate.add(shape);

    text = new go.TextBlock();
    text.segmentIndex = 0;
    text.segmentOffset = new go.Point(NaN, NaN);
    text.segmentOrientation = go.Link.OrientUpright;
    text.bind(new go.Binding('text', 'fromLabel'));
    linkTemplate.add(text);

    text = new go.TextBlock();
    text.segmentIndex = -1;
    text.segmentOffset = new go.Point(NaN, NaN);
    text.segmentOrientation = go.Link.OrientUpright;
    text.bind(new go.Binding('text', 'toLabel'));
    linkTemplate.add(text);

   

    this.diagram.linkTemplate = linkTemplate;
    this.diagram.nodeTemplate = nodeTemplate;

    this.diagram.model = new go.GraphLinksModel( [ ], [ ]);
    this.diagram.initialAutoScale = go.Diagram.UniformToFill;
    this.diagram.initialContentAlignment = go.Spot.MiddleLeft;
    this.diagram.layout = new go.TreeLayout;
    // this.diagram.autoScale = go.Diagram.UniformToFill;

    // enable Ctrl-Z to undo and Ctrl-Y to redo
    this.diagram.undoManager.isEnabled = true;
  }

  ngOnChanges(): void {
    console.log('noOnchanges ' + this.tunnel.name);
    if (this.diagram) {
      this.diagram.model = new go.GraphLinksModel( [ ], [ ]);
    }

    this.redrawTunnelDetails();
  }

  redrawTunnelDetails(): void {
    this.getTunnelWorkingLSP();
  }

  getTunnelWorkingLSP(): void {
    this.tunnelService.getTunnelWorkingLSP(this.tunnel.id)
        .subscribe(lsp => { this.workingLSP = lsp;
                            this.drawWorkingLsp(lsp);
                            if (this.tunnel.protection) {
                              this.getTunnelProtectingLSP();
                            }
                          } );
  }

  getTunnelProtectingLSP(): void {
    this.tunnelService.getTunnelProtectingLSP(this.tunnel.id)
        .subscribe(lsp => { this.protectingLSP = lsp;
                            this.drawWorkingLsp(lsp);
                          } );
  }

  public drawWorkingLsp(lsp: Lsp): void {
    console.log('drawWorkingLsp start ' );
    this.diagram.startTransaction('make new node');
    let prevNode: Lspnode;
    let prevName: string;

    lsp.lspNodes.forEach( function(node) {
      console.log('adding node: ' + node.position);
      let nodeName: string;
      nodeName = this.dashboard.getNeName(node.neId);
      if (lsp.lspId === 1 || node.role === 'Transit') {
        // do not draw HeadTail from Protecting Lsp
        // already inserted from working path
        this.diagram.model.addNodeData({ key: nodeName, color: 'lightblue' });
      }
      if (prevNode) {
        console.log('fromLabel = ' + prevNode.fwPath.labelOut + ' toLabel: ' + node.fwPath.labelIn);
        this.diagram.model.addLinkData({ from: prevName, to: nodeName,
                                         fromLabel: prevNode.fwPath.labelOut , toLabel: node.fwPath.labelIn});
      }
      prevNode = node;
      prevName = nodeName;
    }, this);  // bind this to the foreach scope !!

    // this.diagram.nodeTemplate.scale = 3.0 / lspnodes.length;
    this.diagram.zoomToFit();

    this.diagram.commitTransaction('make new node');
    console.log('drawWorkingLsp end ');
  }

}
