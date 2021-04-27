export interface LifeGameManager {
    day: number;
    grid: Grid;
    nextDay: () => void;
}

export interface Coords {
    row: number;
    column: number;
}

export type Grid = number[][];

export enum CellStatus {
    DEAD = 0,
    ALIVE = 1,
}