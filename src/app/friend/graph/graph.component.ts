import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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
export class GraphComponent implements OnChanges, OnInit {

  // event for toggling a selection of a node
  @Output() select: EventEmitter<string> = new EventEmitter<string>();
  @Input() nodes: Friend[] = [];
  @Input() selectedNodes: Friend[] = [];
  @Input() edges: Contact[] = [];
  @ViewChild('graphContainer') graphContainer;


  constructor(
  ) {
   }

  private simulation = d3.forceSimulation();

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges): void {

    // run this only when nodes changed
    if (!changes.nodes) return;

    const nodes = this.simulation.nodes();

    const nodesToAdd = setMinusSet(this.nodes, nodes).map(node => ({ ...node }));
    const nodesToRemove = [setMinusSet(nodes, this.nodes)];

    const updatedNodes = setMinusSet(nodes, nodesToRemove).concat(nodesToAdd);

    const edges = this.edges.map(edge => ({ source: edge.fromId, target: edge.toId }))

    this.simulation.nodes(updatedNodes)
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink(edges))
      .force('center', d3.forceCenter(200, 200))
      .alphaTarget(1)
      .restart()
  }

  get graph() {
    const nodes = this.simulation.nodes();
    const selectedNodes = [];

    const edges = this.edges.map(edge => ([edge.fromId, edge.toId]))

    return { nodes, edges, selectedNodes }
  }
  stringify = JSON.stringify
}

// todo
function setMinusSet(a: any[], b: any[]): any[] {
  return a.filter(ael => !b.map(bel => bel.id).includes(ael.id))
}