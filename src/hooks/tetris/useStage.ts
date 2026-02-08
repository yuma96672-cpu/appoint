import { useState, useEffect } from 'react';
import { createStage } from '@/utils/tetris/gameHelpers';
import { Player, StageGrid } from '@/utils/tetris/types';

export const useStage = (player: Player, resetPlayer: () => void) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const updateStage = (prevStage: StageGrid) => {
            // First flush the stage from the previous render
            const newStage = prevStage.map((row) =>
                row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
            ) as StageGrid;

            // Then draw the simplified tetromino
            player.tetromino.shape.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        if (
                            newStage[y + player.pos.y] &&
                            newStage[y + player.pos.y][x + player.pos.x]
                        ) {
                            newStage[y + player.pos.y][x + player.pos.x] = [
                                value,
                                `${player.collided ? 'merged' : 'clear'}`,
                            ];
                        }
                    }
                });
            });

            // Then check if it collided
            if (player.collided) {
                resetPlayer();
                const sweepRows = (newStage: any[]) =>
                    newStage.reduce((ack, row) => {
                        if (row.findIndex((cell: any[]) => cell[0] === 0) === -1) {
                            setRowsCleared((prev) => prev + 1);
                            ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                            return ack;
                        }
                        ack.push(row);
                        return ack;
                    }, []);
                return sweepRows(newStage);
            }

            return newStage;
        };

        setStage((prev) => updateStage(prev));
    }, [player, resetPlayer]);

    return { stage, setStage, rowsCleared };
};
