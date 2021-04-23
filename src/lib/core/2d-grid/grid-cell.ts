import { clone2DArray } from "../../util/clone-2d-array";

export type Coords = {
    x: number;
    y: number;
}

export function updateGridCell(grid: number[][], coords: Coords) {
    const { x, y } = coords;
    if (grid[x] !== undefined && grid[x][y] !== undefined) {
        grid[x][y] = grid[x][y] === 0 ? 1 : 0;
    }
    return clone2DArray(grid);
}

export function getCellAt(grid: number[][], coords: Coords): number | null {
    const { x, y } = coords;
    if (grid[x] !== undefined && grid[x][y] !== undefined) {
        return grid[coords.x][coords.y];
    };
    return null;
}