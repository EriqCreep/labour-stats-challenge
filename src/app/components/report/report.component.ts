import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../services/report.service';
import {LabourStats} from '../../models/labour-stats';
import {Stats} from '../../models/stats';
import {UtilsService} from '../../services/utils.service';
import {ColumnDirectionEnum} from '../../models/column-direction-enum';
import {animate, keyframes, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  animations: [
    trigger('rowsAnimation', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),
        query(':enter', stagger('100ms', [
          animate('0.25s ease-in', keyframes([
            style({opacity: 1}),
          ]))]), {optional: true})
      ])
    ])
  ]
})
export class ReportComponent implements OnInit {
  labourStatsReport: LabourStats;
  reportData: Array<Stats>;
  reportTotal: Stats;
  activeColumnSorted;
  activeColumnDirection = ColumnDirectionEnum.DESC;

  constructor(private reportService: ReportService, public utilService: UtilsService) {
  }

  ngOnInit(): void {
    this.getDataReport();
  }

  getDataReport(): void {
    this.reportService.getLabourStatsReport().subscribe(
      (response) => {
        if (Array.isArray(response) && response.length > 0) {
          this.labourStatsReport = response[0];
          this.reportData = this.labourStatsReport.providers.concat(this.labourStatsReport.directContractors);
          this.reportData.forEach(data => data.complianceStatsTotal = data.complianceStats ? data.complianceStats.Total : null);
          this.reportTotal = this.labourStatsReport.total[0];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sortColumn(property: string): void {
    this.reportData = [];
    setTimeout(() => {
      this.reportData = this.labourStatsReport.providers.concat(this.labourStatsReport.directContractors);
      this.reportData.forEach(data => data.complianceStatsTotal = data.complianceStats ? data.complianceStats.Total : null);
      if (this.activeColumnSorted === property) {
        this.activeColumnDirection = this.activeColumnDirection === ColumnDirectionEnum.DESC ? ColumnDirectionEnum.ASC : ColumnDirectionEnum.DESC;
      } else {
        this.activeColumnDirection = ColumnDirectionEnum.DESC;
      }
      this.activeColumnSorted = property;
      this.reportData = this.utilService.sortByProperty(this.reportData, this.activeColumnSorted, this.activeColumnDirection);
      if (property === 'name') {
        this.labourStatsReport.directContractors.forEach(direct => {
          this.reportData = this.utilService.moveToFirst(this.reportData, direct);
        });
      }
    }, 0);
  }

  showColumnDirection(property: string): boolean {
    return property === this.activeColumnSorted;
  }
}
