import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormsModule} from '@angular/forms'; // Add this import
import {CommonModule} from '@angular/common';
import {PredictionService} from '../../service/prediction/prediction.service';

@Component({
  selector: 'app-prediction-view',
  templateUrl: './prediction-view.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule], // Add FormsModule to imports
  styleUrl: './prediction-view.component.scss'
})
export class PredictionViewComponent implements OnInit, AfterViewInit {

  constructor(private predictionService: PredictionService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

  }


}


