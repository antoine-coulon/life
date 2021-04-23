import { InvalidGridError } from "../lib/errors";
import { GameManager } from "../lib/core/game-manager";
import { getCellAt, updateGridCell } from "../lib/core/2d-grid";

describe('Life Game Manager', () => {
    describe('Grid initialization with 2D array representing the game grid', () => {
        it('should create a 2D array with X and Y dimensions as empty arrays', () => {
            const gameManager = GameManager(0, 0)
            expect(gameManager.grid).toEqual([]);

            const gameManager2 = GameManager(1, 0)
            expect(gameManager2.grid).toEqual([]);
        });

        it('should create a 2D array with X dimension filled with 1 zero and Y dimension filled with 2 zeros', () => {
            const gameManager = GameManager(1, 2);
            expect(gameManager.grid).toEqual(
                [
                    [0],
                    [0]
                ]
            );
        });

        it('should create a 2D array with X dimension filled with 5 zero and Y dimension filled with 6 zeros', () => {
            const gameManager = GameManager(5, 6);
            expect(gameManager.grid).toEqual(
                [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0],
                ]
            );
        });

        it('should create a [[x], [y]] 2D game grid given x and y', () => {
            const gameManager = GameManager(1, 2);
            expect(gameManager.grid).toEqual(
                [
                    [0],
                    [0]
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

    describe('Empty grid evolution with "Day" as unit of time', () => {
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
            updateGridCell(gridStateDay0, { x: 1, y: 3 });
            expect(getCellAt(gridStateDay1, { x: 1, y: 3 })).toEqual(0);

            gameManager.nextDay();
            const gridStateDay2 = gameManager.grid;
            updateGridCell(gridStateDay0, { x: 10, y: 5 });
            expect(getCellAt(gridStateDay2, { x: 10, y: 5 })).toBeNull();
            expect(Object.is(gridStateDay1, gridStateDay2)).toBeFalsy();
        });
    });

    describe('Populated grid evolution', () => {
        xit('should create a one living Cell and check evolution', () => {
            const gameManager = GameManager(7, 5);

            const gridStateDay0 = gameManager.grid;
            updateGridCell(gridStateDay0, { x: 3, y: 2 });
            expect(getCellAt(gridStateDay0, { x: 3, y: 2 })).toEqual(1);

            gameManager.nextDay();
            expect(getCellAt(gridStateDay0, { x: 3, y: 2 })).toEqual(0);
        });
    });

    describe('Grid cell update whether 0 (dead) or 1 (alive)', () => {
        it('should make one cell alive at position (2,3)', () => {
            const gameManager = GameManager(5, 5);
            const gridStateDay0 = gameManager.grid;
            const coords = { x: 2, y: 3 };
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
