import React, { FunctionComponent, useState } from "react";
import { GameManager } from "../lib/core/game-manager";
import { Row } from "./Row";


export const Game: FunctionComponent = () => {

    const [game, setGame] = useState(GameManager(15, 10));

    function updateGrid(grid: number[][]) {
        setGame({ ...game, grid });
    }

    return (
        <div className="game-container">
            <div>
                Game Header
        </div>

            <div className="grid-container">
                {
                    game && game.grid &&
                    game.grid.map((columns: number[], xAxis) => <Row grid={game.grid} xAxis={xAxis} updateGrid={updateGrid} key={Math.random() * 100} columns={columns} />)
                }
            </div>
        </div>
    );
}