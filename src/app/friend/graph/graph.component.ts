import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { Contact } from 'src/app/models/contact/contact.model';
import { Friend } from 'src/app/models/friend/friend.model';
import { selectFriend, selectContacts } from '../store/selector/friend.selectors';
import { FriendState } from '../store/reducer/friend.reducer';
import {select, Store} from '@ngrx/store';
import { Observable, combineLatest } from 'rxjs';
import { mergeMap } from 'rxjs/operators';



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnChanges, OnInit, AfterViewInit {

  @Output() select: EventEmitter<string> = new EventEmitter<string>();
  @Input() nodes: Friend[] = [];
  @Input() selectedNodes: Friend[] = [];
  @Input() edges: Contact[] = [];
  @ViewChild('graphContainer') graphContainer;

  selectedNode: Friend

  constructor(
  ) {
   }

  ngAfterViewInit(): void {
    d3.select(this.graphContainer.nativeElement)
      .call(d3.drag()
        .container(this.graphContainer.nativeElement).subject(this.dragsubject)
        .on("start", this.dragstarted)
        .on("drag", this.dragged)
        .on("end", this.dragended));

    d3.select(this.graphContainer.nativeElement)
    .on('click', this.selectNode)
  }

  private simulation = d3.forceSimulation();

  ngOnInit(): void {

  }

  private selectNode = () => {
    const point = d3.mouse(this.graphContainer.nativeElement);
    const node = this.simulation.find(point[0], point[1], 5) as Friend;
    let node2 = this.simulation.find(d3.event.x, d3.event.y,5)

    if (node) {
      this.selectedNode = node
    } else {
      this.selectedNode = null
    }
    console.log("MOUNSE: ",this.stringify(point))
    console.log("EVENT: ",d3.event.x,d3.event.y)
    console.log("FROM MOUNSE: ",this.stringify(node))
    console.log("FROM EVENT: ",this.stringify(node2))

  }

  private dragsubject = () => {
    return this.simulation.find(d3.event.x, d3.event.y);
  }

  private dragstarted = () => {
    if (!d3.event.active) this.simulation.alphaTarget(1).restart();
    d3.event.subject.fx = d3.event.subject.x;
    d3.event.subject.fy = d3.event.subject.y;
  }

  private dragged = () => {
    d3.event.subject.fx = d3.event.x;
    d3.event.subject.fy = d3.event.y;
  }

  private dragended = () => {
    if (!d3.event.active) this.simulation.alphaTarget(0);
    d3.event.subject.fx = null;
    d3.event.subject.fy = null;
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (!changes.nodes) return;

    const nodes = this.simulation.nodes();

    const nodesToAdd = setMinusSet(this.nodes, nodes).map(node => ({ ...node }));
    const nodesToRemove = [setMinusSet(nodes, this.nodes)];

    const updatedNodes = setMinusSet(nodes, nodesToRemove).concat(nodesToAdd);

    const edges = this.edges.map(edge => {
      const from = updatedNodes.findIndex(node => node.id === edge.fromId)
      const to = updatedNodes.findIndex(node => node.id === edge.toId)

      return {source:updatedNodes[from], target:updatedNodes[to]};
    })
    
    this.simulation.nodes(updatedNodes)
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink(edges))
      .force('center', d3.forceCenter(200, 200))
      .alphaTarget(1)
      .restart()
  }

  get graph() {
    const nodes = this.simulation.nodes().map(n => (<Friend>{...n}));
    const selectedNodes = [];

    const edges = this.edges.map(edge => {
      const from = nodes.findIndex(node => node.id === edge.fromId)
      const to = nodes.findIndex(node => node.id === edge.toId)

      return [nodes[from], nodes[to]];
    })

    return { nodes, edges, selectedNodes }
  }
  stringify = JSON.stringify
}

function setMinusSet(a: any[], b: any[]): any[] {
  return a.filter(ael => !b.map(bel => bel.id).includes(ael.id))
}