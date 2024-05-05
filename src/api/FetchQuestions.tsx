import { IQuestion } from "../interface/IQuestion";

export const fetchQuestions = async (): Promise<IQuestion[]> => {
    try {
        const response = await fetch('http://localhost:3000/');
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
