import { Game } from "../Game";
import gameConfig from "../gameConfig";
import { SquareGroup } from "../SquareGroup";
import { GameStatus, GameViewer } from "../types";
import { SquarePageViewer } from "./SquarePageViewer";
import PageViewerConfig from "./PageViewerConfig";

export class GamePageViewer implements GameViewer {
    private _nextDom = document.querySelector('#next') as HTMLElement;
    private _panelDom = document.querySelector('#panel') as HTMLElement;
    private _scoreDom = document.querySelector('#score') as HTMLElement;
    private _notification = document.querySelector('#notification') as HTMLElement;

    showNext(teris: SquareGroup): void {
        teris.squares.forEach(square => {
            square.viewer = new SquarePageViewer(square, this._nextDom);
        })
    }
    switch(teris: SquareGroup): void {
        teris.squares.forEach(square => {
            square.viewer!.remove();
            square.viewer = new SquarePageViewer(square, this._panelDom);
        })
    }
    init(game: Game): void {
        const panelWidth = PageViewerConfig.SquareSize.width * gameConfig.panelSize.width;
        const panelHeight = PageViewerConfig.SquareSize.height * gameConfig.panelSize.height;
        this._panelDom.style.setProperty('--width', `${panelWidth}px`);
        this._panelDom.style.setProperty('--height', `${panelHeight}px`);

        document.onkeydown = function (e) {
            console.log(e.key)
            if (e.key === 'ArrowLeft') {
                game.moveLeft();
            } else if (e.key === "ArrowRight") {
                game.moveRight();
            } else if (e.key === 'ArrowDown') {
                game.moveDown();
            } else if (e.key === 'ArrowUp') {
                game.rotate();
            } else if (e.key === ' ') {
                if(game.gameStatus === GameStatus.Playing) {
                    game.pause();
                } else if (game.gameStatus === GameStatus.End || game.gameStatus === GameStatus.Pause) {
                    game.start();
                }
            }
        }
    }
    showScore(score:number) {
        this._scoreDom.innerHTML = score.toString();
    }
    pause() {
        this._notification.innerHTML = 'pause';
        this._notification.style.display = 'flex';
    }
    start() {
        this._notification.innerHTML = '';
        this._notification.style.display = 'none';
    }
    end() {
        this._notification.innerHTML = 'game over';
        this._notification.style.display = 'flex';
    }
}