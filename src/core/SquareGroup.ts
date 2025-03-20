import { Square } from "./Square";
import { Point, Shape } from "./types";

export class SquareGroup {
  private _shape: Shape;
  private _centerPoint: Point;
  private _color: string;
  private _square: readonly Square[];
  protected isClock: boolean = true;
  public get squares() {
    return this._square;
  }
  public get centerPoint() {
    return this._centerPoint;
  }
  public get shape() {
    return this._shape;
  }
  public set centerPoint(point) {
    this._centerPoint = point;
    this._setSquarePoint();
  }
  private _setSquarePoint(): void {
    this._shape.forEach((shape, index) => {
      this._square[index].point = {
        x: shape.x + this._centerPoint.x,
        y: shape.y + this._centerPoint.y,
      };
    });
  }

afterRotateShape(): Shape {
    if (this.isClock) {
      return this._shape.map((shape) => ({
        x: -shape.y,
        y: shape.x,
      }));
    } else {
      return this._shape.map((shape) => ({
        x: shape.y,
        y: -shape.x,
      }));
    }
  }

  rotate(): void {
    this._shape = this.afterRotateShape();
    this._setSquarePoint();
  }
  constructor(shape: Shape, centerPoint: Point, color: string) {
    this._shape = shape;
    this._centerPoint = centerPoint;
    this._color = color;

    const squareGroups: Square[] = [];
    for (let { x, y } of shape) {
      const square = new Square();
      square.point = {
        x: x + centerPoint.x,
        y: y + centerPoint.y,
      };
      square.color = this._color;
      squareGroups.push(square);
    }
    this._square = squareGroups;
  }
}
