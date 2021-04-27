import React, { FunctionComponent, useState } from "react";
import useInterval from "../hooks/useInterval";
import { GameManager } from "../lib/core/game-manager";
import { LifeGameManager } from "../lib/models";

type GameControllerProps = {
    game: LifeGameManager;
    setGame: (gameManager: LifeGameManager) => void;
};
const GameController: FunctionComponent<GameControllerProps> = ({ setGame, game }): JSX.Element => {
    const [evolutionDayUnit, setEvolutionDayUnit] = useState(500);
    const [isEvolving, setIsEvolving] = useState(false);

    useInterval(
        () => {
            nextDay();
        },
        isEvolving ? evolutionDayUnit : null,
    );

    function nextDay() {
        game.nextDay();
        setGame({ ...game, grid: game.grid });
    }

    function setAutomaticEvolution() {
        setIsEvolving(!isEvolving);
    }

    function resetGame() {
        setIsEvolving(false);
        setGame(GameManager(15, 30));
    }

    return (
        <div className="game-header">
            <div className="evolution">
                Evolution day : <b>{game.day}</b>
            </div>
            <label htmlFor="unit-selector">
                Time (ms) between days
                    <input
                    defaultValue={evolutionDayUnit}
                    type="number"
                    name="unit-selector"
                    min="150"
                    className="input-unit-selector"
                    onChange={(e) => setEvolutionDayUnit(Number(e.target.value))} />
            </label>
            <button
                type="button"
                onClick={() => setAutomaticEvolution()}>
                {isEvolving ? "Stop" : "Start"} Evolution ⏳
            </button>
            <button
                type="button"
                onClick={() => nextDay()}>
                Next Day ⏭️
            </button>
            <button
                type="button"
                onClick={() => resetGame()}>
                Reset 🔄
            </button>
        </div>
    )
};

export default GameController;