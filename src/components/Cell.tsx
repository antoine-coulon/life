/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { FunctionComponent } from "react";
import { updateGridCell } from "../lib/core/2d-grid";
import { Grid } from "../lib/models";

type RowProps = {
    grid: Grid;
    updateGrid: (grid: Grid) => void;
    xAxis: number;
    yAxis: number;
    row: number;
}
export const Cell: FunctionComponent<RowProps> = ({ row, grid, updateGrid, xAxis, yAxis }): JSX.Element => {
    const updateCell = () => {
        updateGrid(updateGridCell(grid, { row: yAxis, column: xAxis }))
    }

    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
            onClick={() => updateCell()}
            id="cell"
            className={row === 1 ? "alive-cell" : "dead-cell"}
        />
    );
}