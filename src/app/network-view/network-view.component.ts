import { Component, OnInit } from '@angular/core';
import { Ne } from '../ne';
import { Link } from '../link';
import * as go from '../../../node_modules/gojs';

@Component({
  selector: 'app-network-view',
  templateUrl: './network-view.component.html',
  styleUrls: ['./network-view.component.css']
})

export class NetworkViewComponent implements OnInit {

  private diagram: go.Diagram;

  constructor() {
   }

  ngOnInit() {
    console.log('NetworkViewComponent ngOnInit start ' );
    let nodeTemplate: go.Node;
    let text: go.TextBlock;
    let shape: go.Shape;
    let nodeIcon: go.Picture;
    // this.diagram = new go.Diagram('diagramNetworkDiv');

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
    console.log('NetworkViewComponent ngOnInit done ' );
  }

  public getDiagram(): go.Diagram {
    return this.diagram;
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
