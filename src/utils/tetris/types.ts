import { TetrominoShape } from './tetrominos';

export type Player = {
    pos: { x: number; y: number };
    tetromino: { shape: TetrominoShape; color: string };
    collided: boolean;
};

export type StageGrid = [string | 0, string][][];
