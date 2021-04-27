import { Grid } from "../../models";

export function build2DGrid(rows: number, columns: number): Grid {
    if (rows === 0 || columns === 0) {
        return [];
    }
    return Array(rows).fill(null).map(() => Array(columns).fill(0));
}