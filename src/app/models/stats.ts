import {ComplianceStats} from './compliance-stats';

export interface Stats {
  rebatesTotal: number;
  grossPayTotal: number;
  workerCount: number;
  complianceStats?: ComplianceStats;
  complianceStatsTotal?: number;
  payrollAdminTotal: number;
  labourCostTotal: number;
  providerId: number;
  name: string;
}
