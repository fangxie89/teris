import { IViewer, Point } from "./types";

export class Square {
  private _viewer?: IViewer;
  private _point: Point = {
    x: 0,
    y: 0
  };
  private _color: string = "red";

  public get point() {
    return this._point;
  }
  public set point(v) {
    this._point = v;
    if (this._viewer) {
        this._viewer.show();
    }
  }
  public get color() {
    return this._color;
  }
  public set color(v) {
    this._color = v;
  }
  public get viewer() {
    return this._viewer;
  }
  public set viewer(v) {
    this._viewer = v;
    this._viewer?.show();
  }
}
