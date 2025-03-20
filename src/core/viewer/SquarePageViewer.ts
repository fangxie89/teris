import { Square } from "../Square";
import { IViewer } from "../types";
import SquareConfig from './PageViewerConfig';
export class SquarePageViewer implements IViewer{
    private _square: Square;
    private _container: HTMLElement;
    private _dom?: HTMLElement;
    private _isRemoved: boolean = false;

    constructor(square: Square, container: HTMLElement) {
        this._square = square;
        this._container = container;
    }
    show(): void {
        if (!this._isRemoved){
            if (!this._dom) {
                this._dom = document.createElement("div");
                Object.assign(this._dom.style, {
                    position: "absolute",
                    width: `${SquareConfig.SquareSize.width}px`,
                    height: `${SquareConfig.SquareSize.height}px`,
                    border: '1px solid #ccc',
                    boxSizing: 'border-box'
                })
                this._container.appendChild(this._dom);
            }
            Object.assign(this._dom.style, {
                left: `${this._square.point.x * SquareConfig.SquareSize.width}px`,
                top: `${this._square.point.y * SquareConfig.SquareSize.height}px`,
                background: this._square.color
            })
        }
    }
    remove(): void {
        if (this._dom && !this._isRemoved) {
            this._dom.remove();
            this._isRemoved = true;
        }
    }
}