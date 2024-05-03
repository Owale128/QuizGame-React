import { IQuestion } from "../interface/IQuestion";

export const fetchQuestions = async (): Promise<IQuestion[]> => {
    try {
        const response = await fetch('http://localhost:3000/routes/questions');
        if (!response.ok) {
            throw new Error('Kunde inte hämta frågor');
        }
        const questions = await response.json();
        return questions;
    } catch (error) {
        console.error('Fel vid hämtning av frågor:', error);
        return [];
    }
};


export const submitResult = async (username: string, score: number, userAnswers: {}): Promise<void> => {
    try {
        const result = {
            username: username,
            score: score,
            answers: userAnswers 
        };
        const response = await fetch('http://localhost:3000/routes/userResult', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        });
        if (!response.ok) {
            throw new Error('Kunde inte skicka resultat');
        }

    } catch (error) {
        console.error('Fel vid skickning av resultat:', error);
    }
};