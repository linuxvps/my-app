import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Constants} from '../../constants/constants';



export interface CashPrediction {
  actualCash: number;
  predictedCash: number;
}

@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  constructor(private http:  HttpClient) {}

  getPredictions(id: number)
  {
    const url = `${environment.API_BASE_URL}${Constants.PREDICTIONS_API_URL}/${id}`;
    console.log(url);
    return this.http.get(url, {observe: 'response'});
  }
}
