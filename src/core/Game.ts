import gameConfig from "./gameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { canIMove, drop, eraseLines, move, rotate } from "./terisRule";
import { Direction, GameStatus, GameViewer } from "./types";

export class Game {
  gameStatus: GameStatus = GameStatus.Init;
  private _curTeris?: SquareGroup;
  private _nextTeris: SquareGroup = createTeris({ x: 0, y: 0 });
  private _timer?: number;
  private _duration: number = 1000;
  private _viewer: GameViewer;
  private _exists: Square[] = [];
  private _score: number = 0;
  public get score() {
    return this._score;
  }
  public set score(v) {
    this._score = v;
    this._viewer.showScore(this._score);
  }
  constructor(viewer: GameViewer) {
    this._viewer = viewer;
    this._viewer.showNext(this._nextTeris);
    this.resetCenterPoint(gameConfig.nextPanelSize.width, this._nextTeris);
    this._viewer.init(this);
    this._viewer.showScore(this._score);
  }

  init() {
    this._exists.forEach(sq=> {
      if(sq.viewer) {
        sq.viewer.remove();
      }
    })
    this._exists = [];
    this._curTeris = undefined;
    this._nextTeris = createTeris({x:0,y:0});
    this._viewer.showNext(this._nextTeris);
    this.resetCenterPoint(gameConfig.nextPanelSize.width, this._nextTeris);
  }

  start() {
    if (this.gameStatus === GameStatus.Playing) {
      return;
    }

    if (this.gameStatus === GameStatus.End) {
      this.init();
    }
    this.gameStatus = GameStatus.Playing;
    if (!this._curTeris) {
      this.switchTeris();
    }
    this.autoDrop();
    this._viewer.start();
  }

  pause() {
    if (this.gameStatus !== GameStatus.Playing) {
      return;
    }
    this.gameStatus = GameStatus.Pause;
    clearInterval(this._timer);
    this._timer = undefined;
    this._viewer.pause();
  }
  private switchTeris() {
    this._curTeris = this._nextTeris;
    this.resetCenterPoint(gameConfig.panelSize.width, this._curTeris);
    if (!canIMove(this._curTeris.shape, this._curTeris.centerPoint, this._exists)){
      this._curTeris.squares.forEach(sq=>{
        if(sq.viewer){
          sq.viewer.remove();
        }
      })
      this.gameStatus = GameStatus.End;
      clearTimeout(this._timer);
      this._timer = undefined;
      return;
    }
    this._nextTeris = createTeris({ x: 0, y: 0 });
    this.resetCenterPoint(gameConfig.nextPanelSize.width, this._nextTeris);
    this._viewer.switch(this._curTeris);
    this._viewer.showNext(this._nextTeris);
  }

  moveLeft() {
    if (this._curTeris && this.gameStatus === GameStatus.Playing) {
      move(this._curTeris, Direction.Left, this._exists);
    }
  }
  moveRight() {
    if (this._curTeris && this.gameStatus === GameStatus.Playing) {
      move(this._curTeris, Direction.Right, this._exists);
    }
  }

  moveDown() {
    if (this._curTeris && this.gameStatus === GameStatus.Playing) {
      drop(this._curTeris, this._exists);
      this.hitBottom();
    }
  }

  rotate() {
    if (this._curTeris && this.gameStatus === GameStatus.Playing){
      rotate(this._curTeris, this._exists);
    }
  }
  private autoDrop() {
    if (this._timer || this.gameStatus !== GameStatus.Playing) {
      return;
    }
    this._timer = setInterval(() => {
        if (this._curTeris) {
           if(!move(this._curTeris, Direction.Down,this._exists)) {
            this.hitBottom();
           };
        }
    }, this._duration);
  }
  private resetCenterPoint(width: number, teris: SquareGroup) {
    const newCenterX = Math.ceil(width / 2) - 1;
    const newCenterY = 0;
    teris.centerPoint = {
      x: newCenterX,
      y: newCenterY
    }
    while(teris.squares.some(square => square.point.y < 0)) {
      teris.centerPoint = {
        x: teris.centerPoint.x,
        y: teris.centerPoint.y+1,
      };
    }
  }

  private hitBottom() {
    this._exists.push(...this._curTeris!.squares);
    const num = eraseLines(this._exists, this._curTeris!);
    this.addScore(num);
    this.switchTeris();
  }
  private addScore(num:number) {
    this.score += gameConfig.scoreMap[num];
  }
}
