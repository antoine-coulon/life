import { CellStatus, Grid } from "../../models";
import { clone2DArray } from "../../util/clone-2d-array";
import { NEIGHBORING_CELLS_POSITIONS } from "./grid-cell";

export function updateGrid(currentGrid: Grid): Grid {
    const currentDayState = clone2DArray(currentGrid);
    const newDayState = watchEvolution(currentDayState);
    return newDayState;
}

function watchEvolution(currentGrid: Grid) {
    const evolvedGrid: Grid = [];
    currentGrid.forEach((row, rowIdx) => {
        const evolvedRow: number[] = [];
        row.forEach((column, columnIdx) => {
            const cellStatus: number = currentGrid[rowIdx][columnIdx];
            const aliveNeighborCells: number = getNumberOfAliveNeighborCells(currentGrid, rowIdx, columnIdx);
            evolvedRow.push(getCellEvolution(cellStatus, aliveNeighborCells));
        });
        evolvedGrid.push(evolvedRow);
    });
    return evolvedGrid;
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
    return NEIGHBORING_CELLS_POSITIONS.reduce((aliveNeighbors, position) => {
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

function getCellEvolution(cellStatus: CellStatus, aliveNeighborCells: number): number {
    if (cellStatus === CellStatus.ALIVE) {
        return getAliveCellEvolution(aliveNeighborCells);
    }
    return getDeadCellEvolution(aliveNeighborCells);
}

function getDeadCellEvolution(aliveNeighborCells: number): number {
    if (aliveNeighborCells === 3) {
        return 1;
    }
    return 0;
}

function getAliveCellEvolution(aliveNeighborCells: number): number {
    if (aliveNeighborCells === 2 || aliveNeighborCells === 3) {
        return 1;
    }
    return 0;
}