import { useState, useCallback } from 'react';
import { TETROMINOS, randomTetromino, TetrominoShape } from '@/utils/tetris/tetrominos';
import { STAGE_WIDTH, checkCollision } from '@/utils/tetris/gameHelpers';
import { Player, StageGrid } from '@/utils/tetris/types';

export const usePlayer = () => {
    const [player, setPlayer] = useState<Player>({
        pos: { x: 0, y: 0 },
        tetromino: TETROMINOS[0] as unknown as { shape: TetrominoShape; color: string },
        collided: false,
    });

    const rotate = (matrix: TetrominoShape, dir: number) => {
        // Transpose rows to cols
        const rotatedTetromino = matrix.map((_, index) =>
            matrix.map((col) => col[index])
        );
        // Reverse each row to get a rotated matrix
        if (dir > 0) return rotatedTetromino.map((row) => row.reverse());
        return rotatedTetromino.reverse();
    };

    const playerRotate = (stage: StageGrid, dir: number) => {
        const clonedPlayer = JSON.parse(JSON.stringify(player));
        clonedPlayer.tetromino.shape = rotate(clonedPlayer.tetromino.shape, dir);

        const pos = clonedPlayer.pos.x;
        let offset = 1;

        while (checkCollision(clonedPlayer, stage, { x: 0, y: 0 })) {
            clonedPlayer.pos.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > clonedPlayer.tetromino.shape[0].length) {
                rotate(clonedPlayer.tetromino.shape, -dir);
                clonedPlayer.pos.x = pos;
                return;
            }
        }
        setPlayer(clonedPlayer);
    };

    const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided: boolean }) => {
        setPlayer((prev) => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
            collided,
        }));
    };

    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: randomTetromino() as unknown as { shape: TetrominoShape; color: string },
            collided: false,
        });
    }, []);

    return { player, updatePlayerPos, resetPlayer, playerRotate, setPlayer };
};
