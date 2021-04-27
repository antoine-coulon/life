import { Grid } from "../models";

export function clone2DArray(currentArray: Grid): Grid {
    const clonedArray: number[][] = [];
    currentArray.forEach((_, index) => {
        clonedArray.push(
            Object.assign([], currentArray[index])
        );
    });
    return clonedArray;
}