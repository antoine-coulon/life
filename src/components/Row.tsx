import React, { FunctionComponent } from "react";
import { Cell } from "./Cell";

type RowProps = {
    grid: number[][];
    updateGrid: (grid: number[][]) => void;
    xAxis: number;
    columns: number[];
}
export const Row: FunctionComponent<RowProps> = ({ columns, grid, updateGrid, xAxis }) => {

    return <div className="game-row-container">
        {
            columns &&
            columns.map((column, yAxis) => {
                return <Cell
                    xAxis={xAxis}
                    column={column}
                    yAxis={yAxis}
                    grid={grid}
                    updateGrid={updateGrid} />
            })
        }
    </div >
}