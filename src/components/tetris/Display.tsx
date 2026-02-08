import React from 'react';

interface DisplayProps {
    gameOver?: boolean;
    text: string;
}

const Display: React.FC<DisplayProps> = ({ gameOver, text }) => (
    <div
        className={`box-border flex items-center justify-center m-0 mb-5 p-5 border-4 border-[#333] min-h-[30px] w-full rounded-2xl text-white font-pixel text-[0.8rem] ${gameOver ? 'bg-red-900/80 text-red-500' : 'bg-[#000]'
            }`}
    >
        {text}
    </div>
);

export default Display;
