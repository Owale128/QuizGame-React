import { Question } from "../interface/Interface";

export const fetchQuestions = async (): Promise<Question[]> => {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=31&difficulty=medium')
        const data = await response.json();

        const formattedQuestions: Question[] = data.results.map((result: any) => ({
            question: result.question,
            options: [...result.incorrect_answers, result.correct_answer],
            correctAnswerIndex: result.correct_answer
        }));
        return formattedQuestions;
    }catch (error) {
        console.error('Error fetching questions:', error);
        return []
    }
}