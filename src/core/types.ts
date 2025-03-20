import { Game } from "./Game";
import { SquareGroup } from "./SquareGroup";

export interface Point {
    readonly x: number,
    readonly y: number
}

export interface IViewer {
    show(): void,
    remove(): void
}

export type Shape = Point[];

export enum Direction {
    Down,
    Left,
    Right
}

export enum GameStatus {
    Init,
    Playing,
    Pause,
    End
}

export interface GameViewer {
    /**
     * 
     * @param teris next teris
     */
    showNext(teris: SquareGroup): void,
    /**
     * 
     * @param teris teris to be switched
     */
    switch(teris: SquareGroup): void

    init(game: Game): void

    showScore(score: number): void

    start(): void

    pause(): void

    end(): void
}