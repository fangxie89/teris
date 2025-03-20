import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRandomNumber } from "./utils";

export class TShape extends SquareGroup {
  constructor(centerPoint: Point, color: string) {
    super([
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: -1 },
    ], centerPoint, color)
  }
};

export class LShape extends SquareGroup {
  constructor(centerPoint: Point, color: string) {
    super([
      { x: -2, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: -1 },
    ], centerPoint, color)
  }
};
export class LMirrorShape extends SquareGroup {
  constructor(centerPoint: Point, color: string) {
    super([
      { x: 2, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: -1 },
    ], centerPoint, color)
  }
};
export class SShape extends SquareGroup {
  constructor(centerPoint: Point, color: string) {
    super([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: -1, y: 1 },
    ], centerPoint, color)
  }

  rotate(): void {
      super.rotate();
      this.isClock = !this.isClock;
  }
};
export class SMirrorShape extends SquareGroup {
  constructor(centerPoint: Point, color: string) {
    super([
      { x: 0, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ], centerPoint, color)
  }
  rotate(): void {
    super.rotate();
    this.isClock = !this.isClock;
}
};
export class SquareShape extends SquareGroup {
  constructor(centerPoint: Point, color: string) {
    super([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ], centerPoint, color)
  }
  rotate(): void {}
};
export class LineShape extends SquareGroup {
  constructor(centerPoint: Point, color: string) {
    super([
      { x: -1, y: 0 },
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ], centerPoint, color)
  }
  rotate(): void {
    super.rotate();
    this.isClock = !this.isClock;
}
};

export const terisShaps = [
  TShape,
  LShape,
  LMirrorShape,
  SShape,
  SMirrorShape,
  SquareShape,
  LineShape
]

export function createTeris(centerPoint: Point): SquareGroup {
  let index = getRandomNumber(0, terisShaps.length);
  const shape = terisShaps[index];
  return new shape(centerPoint, 'red');
}
