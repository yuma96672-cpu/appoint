import React from 'react';

interface StartButtonProps {
    callback: () => void;
}

const StartButton: React.FC<StartButtonProps> = ({ callback }) => (
    <button
        className="box-border m-0 p-5 min-h-[30px] w-full rounded-2xl border-none text-white bg-[#333] font-pixel text-[1rem] outline-none cursor-pointer hover:bg-[#444] transition-colors"
        onClick={callback}
    >
        Start Game
    </button>
);

export default StartButton;
