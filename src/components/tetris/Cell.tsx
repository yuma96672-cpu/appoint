import React from 'react';
import { TETROMINOS } from '@/utils/tetris/tetrominos';
import { TetrominoKey } from '@/utils/tetris/tetrominos';

interface CellProps {
    type: TetrominoKey | 0;
}

const Cell: React.FC<CellProps> = ({ type }) => {
    const color = type ? TETROMINOS[type].color : '0, 0, 0';
    const isFilled = type !== 0;

    return (
        <div
            className={`w-full h-full border-b-4 border-r-4 ${isFilled ? 'border-black/10' : 'border-transparent'
                }`}
            style={{
                background: `rgba(${color}, 0.8)`,
                borderTop: isFilled ? `4px solid rgba(${color}, 1)` : undefined,
                borderLeft: isFilled ? `4px solid rgba(${color}, 1)` : undefined,
            }}
        />
    );
};

export default React.memo(Cell);
