import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormsModule} from '@angular/forms'; // Add this import
import {CommonModule} from '@angular/common';
import {CashPrediction,PredictionService} from '../../service/prediction/prediction.service';
import {Chart, registerables} from 'chart.js/auto';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-prediction-view',
  templateUrl: './prediction-view.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  styleUrl: './prediction-view.component.scss'
})
export class PredictionViewComponent implements OnInit, AfterViewInit {
  predictions: CashPrediction[] = [];
  chart!: Chart;
  inputValue: number | undefined;

  constructor(private predictionService: PredictionService) {
    // Registering chart.js components globally
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.predictionService.getPredictions(3).pipe(
      catchError(error => {
        this.handleError(error);
        throw error;
      })
    ).subscribe((response: any) => {
      this.handleResponse(response);
      this.setupChart();
    });
  }

  ngAfterViewInit(): void {
    // Ensure the chart is drawn after the view has initialized
    this.setupChart();
  }

  private handleResponse(response: any): void {
    this.predictions = response.body;
  }

  private handleError(error: any): void {
    console.log('error in predictionService');
    console.log(error);
  }

  private setupChart(): void {
    const actualCash = this.predictions.map(p => p.actualCash);
    const predictedCash = this.predictions.map(p => p.predictedCash);
    const labels = this.predictions.map((_, index) => `Prediction ${index + 1}`);

    const ctx = (document.getElementById('cashPredictionChart') as HTMLCanvasElement).getContext('2d');

    if (ctx && !this.chart) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Actual Cash',
              data: actualCash,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
              tension: 0.4
            },
            {
              label: 'Predicted Cash',
              data: predictedCash,
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              fill: true,
              tension: 0.4
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
        }
      });
    } else if (this.chart) {
      // Update chart data if it's already initialized
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = actualCash;
      this.chart.data.datasets[1].data = predictedCash;
      this.chart.update();
    }
  }

  onSubmit() {
    console.log(this.inputValue);
    this.predictionService.getPredictions(<number>this.inputValue).pipe(
      catchError(error => {
        this.handleError(error);
        throw error;
      })
    ).subscribe((response: any) => {
      this.handleResponse(response);
      this.setupChart();
    });
  }
}


