import { InvalidGridError } from "../errors";
import { isPositiveFiniteInteger } from "../util/is-positive-finite-integer";
import { build2DGrid, updateGrid, updateGridCell } from "./2d-grid/index";

export function GameManager(x: number, y: number) {
    if (!(isPositiveFiniteInteger(x) && isPositiveFiniteInteger(y))) {
        throw new InvalidGridError();
    }
    return {
        grid: build2DGrid(x, y),
        updateGridCell,
        day: 0,
        nextDay() {
            this.day += 1;
            this.grid = updateGrid(this.grid);
        }
    }
}



