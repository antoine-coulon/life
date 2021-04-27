import React, { FunctionComponent, useState } from "react";
import { GameManager } from "../lib/core/game-manager";
import { Grid } from "../lib/models";
import GameController from "./GameController";
import { Row } from "./Row";


export const Game: FunctionComponent = (): JSX.Element => {
    const [game, setGame] = useState(GameManager(15, 30));

    function updateGrid(grid: Grid) {
        setGame({ ...game, grid });
    }

    return (
        <div className="game-container">
            <GameController
                game={game}
                setGame={setGame}
            />
            <div className="grid-container">
                {
                    game && game.grid &&
                    game.grid.map((rows: number[], yAxis) => {
                        return <Row
                            key={yAxis}
                            grid={game.grid}
                            yAxis={yAxis}
                            updateGrid={updateGrid}
                            rows={rows} />
                    })
                }
            </div>
        </div>
    );
}