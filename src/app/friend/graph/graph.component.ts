import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { Contact } from 'src/app/models/contact/contact.model';
import { Friend } from 'src/app/models/friend/friend.model';
import { selectFriend, selectContacts } from '../store/selector/friend.selectors';
import { FriendState } from '../store/reducer/friend.reducer';
import {select, Store} from '@ngrx/store';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnChanges, OnInit {

  // event for toggling a selection of a node
  @Output() select: EventEmitter<string> = new EventEmitter<string>();
  @Input() friends: Friend[] = [];
  @Input() selectedFriends: Friend[] = [];
  @Input() contacts: Contact[] = [];
  @ViewChild('graphContainer') graphContainer;

  friends$: Observable<Friend[]>;
  contacts$: Observable<Contact[]>;

  constructor(
    private store: Store<FriendState>
  ) {
    this.friends$ = this.store.pipe(select(selectFriend));
    this.contacts$ = this.store.pipe(select(selectContacts));
   }

  private simulation = d3.forceSimulation();

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const nodes = this.simulation.nodes();

    const nodesToAdd = setMinusSet(this.friends, nodes).map(node => ({ ...node }));
    const nodesToRemove = setMinusSet(nodes, this.friends);

    const updatedNodes = setMinusSet(nodes, nodesToRemove).concat(nodesToAdd);

    const edges = this.contacts.map(edge => ({ source: updatedNodes[edge.fromId], target: updatedNodes[edge.toId] }))

    this.simulation.nodes(updatedNodes)
      .force('charge', d3.forceManyBody())
      .force('link', d3.forceLink(edges))
      .force('center', d3.forceCenter(200, 200))
      .alphaTarget(1)
      .restart()
  }

  get graph() {
    const nodes = this.simulation.nodes();
    const selectedNodes = nodes.filter(node => this.selectedFriends.map(selectedNode => selectedNode.id).includes(node['id']))

    const edges = this.contacts.map(edge => ([nodes[edge.fromId], nodes[edge.toId]]))
    return { nodes, edges, selectedNodes }
  }
  stringify = JSON.stringify
}

function setMinusSet(a: any[], b: any[]): any[] {
  return a.filter(ael => !b.map(bel => bel.id).includes(ael.id))
}