import { InvalidGridError } from "../lib/errors";
import { GameManager } from "../lib/core/game-manager";
import { getCellAt, updateGridCell } from "../lib/core/2d-grid";

describe('Life Game Manager', () => {
    describe('Grid initialization with 2D array representing the 2D game grid', () => {
        it('should create a 2D grid an empty grid because rows and columns arent greather than 1', () => {
            const gameManager = GameManager(0, 0)
            expect(gameManager.grid).toEqual([]);
            const gameManager2 = GameManager(1, 0)
            expect(gameManager2.grid).toEqual([]);
        });

        it('should create a 2D grid with one row and 2 columns', () => {
            const gameManager = GameManager(1, 2);
            expect(gameManager.grid).toEqual(
                [
                    [0, 0],
                ]
            );
        });

        it('should create a 2D grid with 5 rows and 6 columns', () => {
            const gameManager = GameManager(5, 6);
            expect(gameManager.grid).toEqual(
                [
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0],
                ]
            );
        });

        it('should throw an exception when creating at least one negative grid size', () => {
            expect(
                () => GameManager(20, -10)
            ).toThrow(new InvalidGridError());
            expect(
                () => GameManager(-10, -10)
            ).toThrow(new InvalidGridError());
        });

        it('should throw an exception when creating game grid with non positive numbers', () => {
            expect(
                () => GameManager(20.5, 10)
            ).toThrow(new InvalidGridError());
            expect(
                () => GameManager(20, 10.7)
            ).toThrow(new InvalidGridError());
        });

        it('should throw an exception when creating an infinite game grid', () => {
            const positiveInfinite = Number.POSITIVE_INFINITY;
            expect(
                () => GameManager(positiveInfinite, positiveInfinite)
            ).toThrow(new InvalidGridError());
        });
    });

    describe('Empty grid evolution over time as "Day" the time unit', () => {
        it('should pass the next day and check no cell mutation because there are only dead cells', () => {
            const gameManager = GameManager(5, 5);
            const gridStateDay0 = gameManager.grid;
            expect(gameManager.day).toEqual(0);
            gameManager.nextDay();
            const gridStateDay1 = gameManager.grid;
            expect(gameManager.day).toEqual(1);
            expect(Object.is(gridStateDay1, gridStateDay0)).toBeFalsy();
        });

        it('should pass the next day and check immutable state between two days of evolution', () => {
            const gameManager = GameManager(5, 5);
            const gridStateDay0 = gameManager.grid;
            gameManager.nextDay();
            const gridStateDay1 = gameManager.grid;
            expect(Object.is(gridStateDay0, gridStateDay1)).toBeFalsy();
            // voluntarly mutates the gridState at day 0 and assert that
            // it wasnt reflected in the day 2 state
            updateGridCell(gridStateDay0, { row: 1, column: 3 });
            expect(getCellAt(gridStateDay0, { row: 1, column: 3 })).toEqual(1);
            expect(getCellAt(gridStateDay1, { row: 1, column: 3 })).toEqual(0);
            gameManager.nextDay();
            const gridStateDay2 = gameManager.grid;
            updateGridCell(gridStateDay0, { row: 10, column: 5 });
            expect(getCellAt(gridStateDay2, { row: 10, column: 5 })).toBeNull();
            expect(Object.is(gridStateDay1, gridStateDay2)).toBeFalsy();
        });
    });

    describe('Populated grid evolution over time', () => {
        it('should create a one living Cell and check for its death day after', () => {
            const gameManager = GameManager(7, 5);
            const gridStateDay0 = gameManager.grid;
            updateGridCell(gridStateDay0, { row: 6, column: 4 });
            expect(getCellAt(gridStateDay0, { row: 6, column: 4 })).toEqual(1);
            gameManager.nextDay();
            expect(getCellAt(gameManager.grid, { row: 6, column: 4 })).toEqual(0);
        });

        it('should create a "Blinking" or "Triplet" of alive Cells and observe its evolution', () => {
            const gameManager = GameManager(8, 6);
            const gridStateDay0 = gameManager.grid;
            updateGridCell(gridStateDay0, { row: 6, column: 3 });
            updateGridCell(gridStateDay0, { row: 6, column: 4 });
            updateGridCell(gridStateDay0, { row: 6, column: 5 });

            gameManager.nextDay();
            expect(getCellAt(gameManager.grid, { row: 6, column: 3 })).toEqual(0);
            expect(getCellAt(gameManager.grid, { row: 6, column: 4 })).toEqual(1);
            expect(getCellAt(gameManager.grid, { row: 6, column: 5 })).toEqual(0);
            expect(getCellAt(gameManager.grid, { row: 7, column: 4 })).toEqual(1);
            expect(getCellAt(gameManager.grid, { row: 5, column: 4 })).toEqual(1);

            gameManager.nextDay();
            expect(getCellAt(gameManager.grid, { row: 6, column: 3 })).toEqual(1);
            expect(getCellAt(gameManager.grid, { row: 6, column: 4 })).toEqual(1);
            expect(getCellAt(gameManager.grid, { row: 6, column: 5 })).toEqual(1);
            expect(getCellAt(gameManager.grid, { row: 7, column: 4 })).toEqual(0);
            expect(getCellAt(gameManager.grid, { row: 5, column: 4 })).toEqual(0);
        });
    });

    describe('Grid cell update whether 0 (dead) or 1 (alive) when requested position is valid', () => {
        it('should not make an update because coords are out of grid', () => {
            const gameManager = GameManager(5, 5);
            const gridStateDay0 = gameManager.grid;
            const coords = { row: 5, column: 5 };
            const firstGridUpdate = updateGridCell(gridStateDay0, coords);
            expect(Object.is(gridStateDay0, firstGridUpdate)).toBeFalsy();
            expect(
                getCellAt(gridStateDay0, coords)
            ).toBeNull();
        });

        it('should make one cell alive at position (2,3)', () => {
            const gameManager = GameManager(5, 5);
            const gridStateDay0 = gameManager.grid;
            const coords = { row: 2, column: 3 };
            const firstGridUpdate = updateGridCell(gridStateDay0, coords);
            expect(
                getCellAt(gridStateDay0, coords)
            ).toEqual(1);
            const secondGridUpdate = updateGridCell(gridStateDay0, coords);
            expect(
                getCellAt(gridStateDay0, coords)
            ).toEqual(0);
            expect(Object.is(firstGridUpdate, secondGridUpdate)).toBeFalsy();
        });
    });
});
