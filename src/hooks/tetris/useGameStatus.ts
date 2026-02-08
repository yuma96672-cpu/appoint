import { useState, useEffect } from 'react';

export const useGameStatus = (rowsCleared: number) => {
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);

    useEffect(() => {
        const calculateScore = (rowsClearedArg: number, levelArg: number) => {
            const linePoints = [40, 100, 300, 1200];
            // We start at level 0, so level + 1 gives us the multiplier
            return linePoints[rowsClearedArg - 1] * (levelArg + 1);
        }

        if (rowsCleared > 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setScore((prev) => prev + calculateScore(rowsCleared, level));
            setRows((prev) => prev + rowsCleared);
            setLevel((prev) => prev + 1);
        }
    }, [rowsCleared, level]);

    return { score, setScore, rows, setRows, level, setLevel };
};
