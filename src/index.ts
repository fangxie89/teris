import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";

const game = new Game(new GamePageViewer());

game.start();

const lBtn = document.querySelector('#moveLeft') as HTMLElement;
const rBtn = document.querySelector('#moveRight') as HTMLElement;
const rotateBtn = document.querySelector('#rotate') as HTMLElement;
const pauseBtn = document.querySelector('#pause') as HTMLElement;
const resumeBtn = document.querySelector('#resume') as HTMLElement;
const dropBtn = document.querySelector('#drop') as HTMLElement;

lBtn.onclick = function () {
    game.moveLeft();
}
rBtn.onclick = function () {
    game.moveRight();
}

rotateBtn.onclick = function () {
    game.rotate();
}

pauseBtn.onclick = function () {
    game.pause();
}

resumeBtn.onclick = function() {
    game.start();
}

dropBtn.onclick = function() {
    game.moveDown();
}