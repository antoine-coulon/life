import React, { FunctionComponent } from "react";
import { updateGridCell } from "../lib/core/2d-grid";

type RowProps = {
    grid: number[][];
    updateGrid: (grid: number[][]) => void;
    xAxis: number;
    yAxis: number;
    column: number;
}
export const Cell: FunctionComponent<RowProps> = ({ column, grid, updateGrid, xAxis, yAxis }) => {

    const updateCell = (xAxis: number, yAxis: number) => {
        updateGrid(updateGridCell(grid, { x: xAxis, y: yAxis }))
    }

    return (
        <div
            onClick={() => updateCell(xAxis, yAxis)}
            key={Math.random() * 100}
            id="cell"
            className={column === 1 ? "alive-cell" : "dead-cell"}>
        </div>
    );

}