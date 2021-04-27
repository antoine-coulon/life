import { InvalidGridError } from "../errors";
import { LifeGameManager } from "../models";
import { isPositiveFiniteInteger } from "../util/is-positive-finite-integer";
import { build2DGrid, updateGrid } from "./2d-grid/index";

export function GameManager(rows: number, columns: number): LifeGameManager {
    if (!(isPositiveFiniteInteger(columns) && isPositiveFiniteInteger(rows))) {
        throw new InvalidGridError();
    }
    return {
        day: 0,
        grid: build2DGrid(rows, columns),
        nextDay() {
            this.day += 1;
            this.grid = updateGrid(this.grid);
        }
    }
}



