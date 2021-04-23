import { clone2DArray } from "../../util/clone-2d-array";

export function updateGrid(currentGrid: number[][]): number[][] {
    const currentDayState = clone2DArray(currentGrid);
    // here bring modifications according to what changed
    return currentDayState;
}