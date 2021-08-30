import {Injectable} from '@angular/core';
import {ColumnDirectionEnum} from '../models/column-direction-enum';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  getPercentDecimal(quantity: number, total: number): number {
    return ((quantity / total));
  }

  sortByProperty(data: any[], property: string, direction: ColumnDirectionEnum): any[] {
    return (data || []).sort((a, b) => {
      if (a[property] > b[property]) {
        return (direction === ColumnDirectionEnum.DESC) ? 1 : -1;
      }
      if (a[property] < b[property]) {
        return (direction === ColumnDirectionEnum.DESC) ? -1 : 1;
      }
      return 0;
    });
  }

  moveElement(data: any[], oldIndex: number, newIndex: number): any[] {
    return data.splice(newIndex, 0, data.splice(oldIndex, 1)[0]);
  }

  moveToFirst(data: any[], element: any): any[] {
    return data.sort((a, b) => {
      return a == element ? -1 : b == element ? 1 : 0;
    });
  }
}
