import { Component, OnInit } from '@angular/core';
import { diagramToCoordinates, getCoordinatePoints, Point } from './diagram-renderer/coordinate-converter';
import { getDiagram } from './diagram-renderer/diagram-algorithm';
import { DiagramOptions } from './diagram-renderer/diagram-options';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  options: DiagramOptions = {
    multiplier: 2,
    modulus: 9,
    showDigits: true
  };

  paths: Point[][] = [];
  coordinates: Point[] = [];

  ngOnInit() {
    this.applyOptions();
  }

  applyOptions(): void {
    console.info('Options applied:', this.options);
    const diagram = getDiagram(this.options);
    this.paths = diagramToCoordinates(diagram, this.options.modulus);
    this.coordinates = getCoordinatePoints(this.options.modulus);
  }
}
