import { IQuestion } from "../interface/IQuestion";

export const fetchQuestions = async (): Promise<IQuestion[]> => {
    try {
        const response = await fetch('https://quizbackend-9soc.onrender.com/');
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
