import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { Point } from '../diagram-renderer/coordinate-converter';
import { DiagramOptions } from '../diagram-renderer/diagram-options';

@Directive({
  selector: '[appDiagramCanvas]'
})
export class DiagramCanvasDirective implements OnChanges {
  @Input() paths: Point[][] = [];
  @Input() points: Point[] = [];
  @Input() options?: DiagramOptions;

  private context: CanvasRenderingContext2D | null = null;

  constructor(
    private readonly element: ElementRef
  ) { }

  ngAfterViewInit(): void {
    const canvas = this.element.nativeElement as HTMLCanvasElement;
    canvas.width = 600;
    canvas.height = 600;
    this.context = canvas.getContext('2d');
    this.render();
  }

  ngOnChanges() {
    this.render();
  }

  render(): void {
    if (!this.context) {
      return;
    }

    this.context.setTransform(1, 0, 0, 1, 300, 300);
    this.context.strokeStyle = 'white';
    this.context.fillStyle = 'white';
    this.context.clearRect(-300, -300, 600, 600);

    // Draw a circle that the points will appear on.
    this.context.strokeStyle = '#ddd';
    this.context.fillStyle = '#ddd';
    this.context.lineWidth = 3;
    
    this.context.beginPath();
    this.context.ellipse(0, 0, 250, 250, 0, 0, 360);
    this.context.stroke();

    this.context.strokeStyle = '#555';
    this.context.lineWidth = 1;
    for (const path of this.paths) {
      if (path.length <= 1) {
        continue;
      }

      this.context.beginPath();
      this.context.moveTo(path[0].x * 250, path[0].y * 250);
      for (let i = 1; i < path.length; i++) {
        const x = path[i].x * 250;
        const y = path[i].y * 250;
        this.context.lineTo(x, y);
      }

      this.context.stroke();
    }

    if (this.options?.showDigits) {
      this.context.strokeStyle = '#f00';
      this.context.fillStyle = '#f00';
      for (const point of this.points) {
        this.context.beginPath();
        this.context.ellipse(point.x * 250, point.y * 250, 4, 4, 0, 0, 360);
        this.context.fill();
      }

      this.context.strokeStyle = '#000';
      let value = 0;
      for (const point of this.points) {
        this.context.strokeText(value.toString(), point.x * 270, point.y * 270);
        value++;
      }
    }
  }
}
