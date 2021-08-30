import {Component, Input, OnInit} from '@angular/core';
import {ColumnDirectionEnum} from '../../../models/column-direction-enum';

@Component({
  selector: 'app-direction-indicator',
  templateUrl: './direction-indicator.component.html',
  styleUrls: ['./direction-indicator.component.css']
})
export class DirectionIndicatorComponent implements OnInit {
  @Input() direction: ColumnDirectionEnum;
  @Input() active: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
