import React, { FunctionComponent } from "react";
import { Cell } from "./Cell";

type RowProps = {
    grid: number[][];
    updateGrid: (grid: number[][]) => void;
    yAxis: number;
    rows: number[];
}
export const Row: FunctionComponent<RowProps> = ({ rows, grid, updateGrid, yAxis }): JSX.Element => {
    return <div className="game-row-container">
        {
            rows && rows.map((row, xAxis) => {
                return <Cell
                    key={xAxis}
                    yAxis={yAxis}
                    row={row}
                    xAxis={xAxis}
                    grid={grid}
                    updateGrid={updateGrid} />
            })
        }
    </div >
}