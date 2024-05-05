import React, {useState, useEffect} from "react";
import { ITimer } from "../interface/ITimer";

export const Timer: React.FC<ITimer> = ({ timeLimit, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState<number>(timeLimit);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                onTimeUp();
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, onTimeUp]);

    useEffect(() => {
        setTimeLeft(timeLimit);
    }, [timeLimit]);

    return (
        <p>Tid kvar: {timeLeft} sekunder</p>
    );
}
