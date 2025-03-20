import gameConfig from "./gameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { Direction, Point, Shape } from "./types";

export function canIMove(shape: Shape, targetPoint: Point, exists: Square[]): boolean {
  const targetGroup: Point[] = shape.map((p) => ({
    x: p.x + targetPoint.x,
    y: p.y + targetPoint.y,
  }));
  if (targetGroup.some(p => exists.some(square => (square.point.x === p.x && square.point.y === p.y)))) {
    return false;
  }
  return !targetGroup.some((shape) => {
    return (
      shape.x > gameConfig.panelSize.width - 1 ||
      shape.x < 0 ||
      shape.y > gameConfig.panelSize.height - 1 ||
      shape.y < 0
    );
  });
}

export function moveTo(teris: SquareGroup, targetPoint: Point, exists: Square[]): boolean {
  if (canIMove(teris.shape, targetPoint, exists)) {
    teris.centerPoint = {
      x: targetPoint.x,
      y: targetPoint.y,
    };
    return true;
  }
  return false;
}

export function move(teris: SquareGroup, direction: Direction, exists: Square[]): boolean {
  let target;
  if (direction === Direction.Down) {
    target = {
      x: teris.centerPoint.x,
      y: teris.centerPoint.y + 1,
    };
  } else if (direction === Direction.Left) {
    target = {
      x: teris.centerPoint.x - 1,
      y: teris.centerPoint.y,
    };
  } else if (direction === Direction.Right) {
    target = {
      x: teris.centerPoint.x + 1,
      y: teris.centerPoint.y,
    };
  } else {
    target = teris.centerPoint;
  }

  return moveTo(teris, target, exists);
}

export function drop(teris: SquareGroup, exists: Square[]): void {
    if (canIMove(teris.shape, {
        x: teris.centerPoint.x,
        y: teris.centerPoint.y + 1
    }, exists)) {
        teris.centerPoint = {
            x: teris.centerPoint.x,
            y: teris.centerPoint.y + 1
        }
        drop(teris, exists);
    }
}
export function rotate(teris: SquareGroup, exists: Square[]): boolean {
  const newShape = teris.afterRotateShape();
  if (canIMove(newShape, teris.centerPoint, exists)) {
    teris.rotate();
    return true;
  } else {
    return false;
  }
}

export function eraseLines(exists: Square[], currentSquareGroup: SquareGroup): number {
    const lines = currentSquareGroup.squares.map(square => square.point.y).sort();
    let num = 0;
    lines.forEach(line => {
        if (eraseLine(exists, line)) {
            exists.filter(sq => sq.point.y < line).forEach(sq => {
                sq.point = {
                    x: sq.point.x,
                    y: sq.point.y + 1
                }
            })
            num++;
        }
    })
    return num;
}
function eraseLine(exists: Square[], y: number): boolean {
    const lineSquares = exists.filter(sq => sq.point.y === y);
        if (lineSquares.length === gameConfig.panelSize.width) {
           lineSquares.forEach(sq => {
            sq.viewer?.remove();
            const index = exists.indexOf(sq);
            exists.splice(index, 1);
           })
           return true;
        }
        return false;
}