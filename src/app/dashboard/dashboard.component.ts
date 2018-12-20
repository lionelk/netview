import { Component, OnInit } from '@angular/core';
import { Ne } from '../ne';
import { NeService } from '../ne.service';
import { Link } from '../link';
import { LinkService } from '../link.service';

import { Tunnel } from '../tunnel';
import { TunnelService } from '../tunnel.service';
import { LoginService } from '../login.service';
import * as go from '../../../node_modules/gojs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  nes: Ne[] = [];
  links: Link[] = [];
  tunnels: Tunnel[] = [];
  currentUser: string;
  currentHostname: string;

  showsection: string;
  diagram: go.Diagram;

  constructor(private neService: NeService,
    private linkService: LinkService,
    private tunnelService: TunnelService,
    private loginService: LoginService) { }

  ngOnInit() {
    console.log('dashboard ngoninit start');
    this.currentUser = this.loginService.getCurrentUser();
    this.currentHostname = this.loginService.getCurrentHostname();

    let nodeTemplate: go.Node;
    let text: go.TextBlock;
    let shape: go.Shape;
    let nodeIcon: go.Picture;
    this.diagram = new go.Diagram('diagramNetworkDiv');

    nodeTemplate = new go.Node(go.Panel.Auto);
    nodeIcon = new go.Picture();
    nodeIcon.source = '../../assets/images/ne1.svg';
    nodeIcon.height = 40;
    nodeIcon.width = 60;
    nodeIcon.imageStretch = go.GraphObject.UniformToFill;

    text = new go.TextBlock();
    text.background = 'white';
    text.font = 'bold 14px Verdana';
    text.bind(new go.Binding('text', 'key'));

    shape = new go.Shape();
    shape.stroke = null;
    shape.strokeWidth = 0;
    shape.fill = null;
    shape.name = 'SHAPE';
    shape.bind(new go.Binding('stroke', 'isHighlighted', function(h) { return h ? 'red' : null; }));
    shape.bind(new go.Binding('strokeWidth', 'thick'));

    nodeTemplate.add(shape);
    nodeTemplate.add(nodeIcon);
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

    this.getNes();
    this.getTunnels();
    this.showsection = '';
    console.log('dashboard ngoninit end');
  }

  public showSection(section: string): void {
    this.showsection = section;
  }

  public isShowSection(section: string): boolean {
    return this.showsection === section;
    }

  public getNeName(neid: number): string {
    console.log('dashboard getNeName for ' + neid);
    let neName: string;

    this.nes.forEach( function(ne) {
      console.log('dashboard getNeName test for-lopp ' + ne.neId + ' name = ' + ne.name);
      if (neid === ne.neId) {
        console.log('dashboard FOUND getNeName : ' + ne.name);
        neName = ne.name;
        return;
      }
    }, this);

    return neName;
  }

  getNes(): void {
    this.neService.getNes().subscribe(nes => {
        this.nes = nes;
        this.drawNodesNetwork(this.nes);
        this.getLinks();
      } );
  }

  getLinks(): void {
    this.linkService.getLinks().subscribe(links => { this.links = links;
      this.drawLinksNetwork(this.links);
      } );
  }

  getTunnels(): void {
    this.tunnelService.getTunnels()
      .subscribe(tunnels => {this.tunnels = tunnels; });
  }

  public drawNodesNetwork(nes: Ne[]): void {
    console.log('drawNodesNetwork start ' );
    this.diagram.startTransaction('make new node');
    nes.forEach( function(ne) {
      console.log('adding node: ' + ne.name);
      this.diagram.model.addNodeData({ key: ne.name });
    }, this);  // bind this to the foreach scope !!
    this.diagram.commitTransaction('make new node');
    console.log('drawNodesNetwork end ');
  }

  public drawLinksNetwork(links: Link[]): void {
    console.log('drawLinksNetwork start ' );
    this.diagram.startTransaction('make new link');
    links.forEach( function(link) {
      console.log('adding link: ' + link.name);
      this.diagram.model.addLinkData({ from: link.aend.nename, to: link.zend.nename });
    }, this);
    this.diagram.commitTransaction('make new link');
    console.log('drawLinksNetwork end ');
  }

  public highlightNe(ne: string, highlight: boolean) {
    console.log('highlightNe search for: ' + ne);
    this.diagram.startTransaction('highlight ne');
    let node: go.Node;
    node = this.diagram.model.findNodeDataForKey(ne);
    this.diagram.model.setDataProperty(node, 'thick', 2);
    this.diagram.model.setDataProperty(node, 'isHighlighted', highlight);
    this.diagram.commitTransaction('highlight ne');
  }
}
