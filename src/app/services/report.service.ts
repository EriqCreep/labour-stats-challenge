import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {LabourStats} from '../models/labour-stats';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  baseUrl = environment.apiUrl + 'application/';

  constructor(private http: HttpClient) { }

  getLabourStatsReport(): Observable<LabourStats[]> {
    return this.http.get<LabourStats[]>(this.baseUrl + 'labourstats');
  }
}
