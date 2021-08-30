import {Stats} from './stats';

export interface LabourStats {
  providers: Array<Stats>;
  directContractors: Array<Stats>;
  total: Array<Stats>;
}
