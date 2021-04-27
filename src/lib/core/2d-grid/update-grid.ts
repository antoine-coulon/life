import { CellStatus, Grid } from "../../models";
import { clone2DArray } from "../../util/clone-2d-array";
import { cellPositionsToCheck } from "./grid-cell";

export function updateGrid(currentGrid: Grid): Grid {
    const currentDayState = clone2DArray(currentGrid);
    const newDayState = watchEvolution(currentDayState);
    return newDayState;
}

function watchEvolution(currentGrid: Grid) {
    const evolutedGrid: Grid = [];

    currentGrid.forEach((row, rowIdx) => {
        const newRow: number[] = [];
        row.forEach((column, columnIdx) => {
            const cellStatus: number = currentGrid[rowIdx][columnIdx];
            const aliveNeighborCells = getNumberOfAliveNeighborCells(currentGrid, rowIdx, columnIdx);

            if (cellStatus === 1) {
                if (aliveNeighborCells === 2 || aliveNeighborCells === 3) {
                    newRow.push(1);
                } else {
                    newRow.push(0);
                }
            } else if (aliveNeighborCells === 3) {
                newRow.push(1);
            } else {
                newRow.push(0);
            }
        });
        evolutedGrid.push(newRow);
    });
    return evolutedGrid;
}

function isCellAlive(grid: Grid, gridPosition: { rowIdx: number, columnIdx: number }): boolean {
    const { rowIdx, columnIdx } = gridPosition;
    try {
        return grid[rowIdx][columnIdx] !== undefined && grid[rowIdx][columnIdx] === CellStatus.ALIVE;
    } catch {
        return false;
    }
}

function getNumberOfAliveNeighborCells(grid: Grid, row: number, column: number): number {
    return cellPositionsToCheck.reduce((aliveNeighbors, position) => {
        const gridPosition = {
            columnIdx: column + position.x,
            rowIdx: row + position.y
        };
        if (isCellAlive(grid, gridPosition)) {
            return aliveNeighbors + 1;
        }
        return aliveNeighbors;
    }, 0);
}