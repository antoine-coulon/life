import { Coords, Grid } from "../../models";
import { clone2DArray } from "../../util/clone-2d-array";

export function updateGridCell(grid: Grid, coords: Coords): Grid {
    const { row, column } = coords;
    if (grid[row] !== undefined && grid[row][column] !== undefined) {
        grid[row][column] = grid[row][column] === 0 ? 1 : 0;
    }
    return clone2DArray(grid);
}

export function getCellAt(grid: Grid, coords: Coords): number | null {
    const { row, column } = coords;
    if (grid[row] !== undefined && grid[row][column] !== undefined) {
        return grid[coords.row][coords.column];
    };
    return null;
}

export const cellPositionsToCheck: { x: number; y: number }[] = [
    {
        x: 1, y: 0,
    },
    {
        x: 0, y: 1,
    },
    {
        x: -1, y: 0,
    },
    {
        x: 0, y: -1,
    },
    {
        x: -1, y: 1,
    },
    {
        x: 1, y: -1,
    },
    {
        x: -1, y: -1,
    },
    {
        x: 1, y: 1,
    },
];