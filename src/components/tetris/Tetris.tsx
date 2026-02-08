"use client";

import React, { useState } from 'react';
import { createStage, checkCollision } from '@/utils/tetris/gameHelpers';
import { useInterval } from '@/hooks/tetris/useInterval';
import { usePlayer } from '@/hooks/tetris/usePlayer';
import { useStage } from '@/hooks/tetris/useStage';
import { useGameStatus } from '@/hooks/tetris/useGameStatus';

import Stage from './Stage';
import Display from './Display';
import StartButton from './StartButton';

const Tetris: React.FC = () => {
    const [dropTime, setDropTime] = useState<number | null>(null);
    const [gameOver, setGameOver] = useState(false);

    const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
    const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
    const { score, setScore, rows, setRows, level, setLevel } = useGameStatus(rowsCleared);

    const movePlayer = (dir: number) => {
        if (!checkCollision(player, stage, { x: dir, y: 0 })) {
            updatePlayerPos({ x: dir, y: 0, collided: false });
        }
    };

    const startGame = () => {
        // Reset everything
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    };

    const drop = () => {
        // Increase level when player has cleared 10 rows
        if (rows > (level + 1) * 10) {
            setLevel((prev) => prev + 1);
            // Also increase speed
            setDropTime(1000 / (level + 1) + 200);
        }

        if (!checkCollision(player, stage, { x: 0, y: 1 })) {
            updatePlayerPos({ x: 0, y: 1, collided: false });
        } else {
            // Game Over
            if (player.pos.y < 1) {
                setGameOver(true);
                setDropTime(null);
            }
            updatePlayerPos({ x: 0, y: 0, collided: true });
        }
    };

    const keyUp = ({ keyCode }: { keyCode: number }) => {
        if (!gameOver) {
            if (keyCode === 40) { // Down arrow
                setDropTime(1000 / (level + 1) + 200);
            }
        }
    };

    const dropPlayer = () => {
        setDropTime(null);
        drop();
    };

    const move = ({ keyCode }: { keyCode: number }) => {
        if (!gameOver) {
            if (keyCode === 37) { // Left
                movePlayer(-1);
            } else if (keyCode === 39) { // Right
                movePlayer(1);
            } else if (keyCode === 40) { // Down
                dropPlayer();
            } else if (keyCode === 38) { // Up
                playerRotate(stage, 1);
            }
        }
    };

    useInterval(() => {
        drop();
    }, dropTime);

    return (
        <div
            className="flex flex-col md:flex-row items-start justify-center gap-8 w-full max-w-4xl mx-auto p-4 outline-none"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => move(e)}
            onKeyUp={keyUp}
            ref={(div) => {
                // Auto-focus on mount so keyboard works immediately
                div?.focus();
            }}
        >
            <div className="flex-1 max-w-[500px] w-full aspect-[12/20]">
                <Stage stage={stage} />
            </div>

            <div className="flex flex-col w-full max-w-[200px] gap-4">
                {gameOver ? (
                    <Display gameOver={gameOver} text="Game Over" />
                ) : (
                    <>
                        <Display text={`Score: ${score}`} />
                        <Display text={`Rows: ${rows}`} />
                        <Display text={`Level: ${level}`} />
                    </>
                )}
                <StartButton callback={startGame} />

                <div className="mt-8 text-white/50 text-sm">
                    <p>Controls:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>⬅️ Move Left</li>
                        <li>➡️ Move Right</li>
                        <li>⬆️ Rotate</li>
                        <li>⬇️ Speed Up</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Tetris;
