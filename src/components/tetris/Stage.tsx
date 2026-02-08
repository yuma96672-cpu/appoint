import React from 'react';
import Cell from './Cell';
import { TetrominoKey } from '@/utils/tetris/tetrominos';
import { StageGrid } from '@/utils/tetris/types';

interface StageProps {
    stage: StageGrid;
}

const Stage: React.FC<StageProps> = ({ stage }) => (
    <div
        className="grid grid-rows-[repeat(20,min(calc(25vw/12),calc(50vh/20)))] grid-cols-[repeat(12,1fr)] gap-[1px] border-2 border-[#333] bg-[#111] max-w-[25vw] sm:max-w-none w-full"
        style={{
            // Responsive grid sizing helper
            gridTemplateColumns: `repeat(${stage[0].length}, 1fr)`,
            width: '100%',
            maxWidth: '400px', // Constrain width on large screens
            aspectRatio: `${stage[0].length} / ${stage.length}`,
        }}
    >
        {stage.map((row) =>
            row.map((cell, x) => <Cell key={x} type={cell[0] as TetrominoKey} />)
        )}
    </div>
);

export default Stage;
