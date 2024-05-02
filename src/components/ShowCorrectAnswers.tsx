import { IQuestion } from "../interface/IQuestion";

export const showCorrectAnswers = (questions: IQuestion[]): string [] => {
    const correctAnswersArray: string [] = [];
    questions.forEach((question) => {
        correctAnswersArray.push(question.options[question.correctAnswerIndex]);
    });
    return correctAnswersArray
};