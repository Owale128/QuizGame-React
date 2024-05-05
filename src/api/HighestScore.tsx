import  { useState, useEffect } from "react";
import { IHighestScore } from "../interface/IHighestScore";

const HighestScores = () => {
    const [highestScorers, setHighestScorers] = useState<IHighestScore[]>([]);

    useEffect(() => {
        const fetchHighestScores = async () => {
            try {
                const response = await fetch('https://quizbackend-9soc.onrender.com/highestScores');
                if (!response.ok) {
                    throw new Error('Kunde inte hämta högsta poäng');
                }
                const data = await response.json();
                setHighestScorers(data);
            } catch (error) {
                console.error('Fel vid hämtning av högsta poäng:', error);
            }
        };
        fetchHighestScores();
    }, []);

    return (
        <div className="highestScoreContainer">
            <h2>Högsta poäng</h2>
            <ol>
                {highestScorers.map((user, index) => (
                    <li key={index}>{user.username} <span className="points"> Poäng: {user.score}</span></li>
                ))}
            </ol>
        </div>
    );
};

export default HighestScores;
