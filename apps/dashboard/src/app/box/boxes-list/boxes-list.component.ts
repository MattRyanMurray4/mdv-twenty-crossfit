import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Box } from '@crossfit/api-interfaces';

@Component({
  selector: 'crossfit-boxes-list',
  templateUrl: './boxes-list.component.html',
  styleUrls: ['./boxes-list.component.scss'],
})
export class BoxesListComponent {
  @Input() boxes: Box[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Output() viewedBox = new EventEmitter();
}
