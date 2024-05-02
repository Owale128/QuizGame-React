import { IQuestion } from "../interface/IQuestion";

export const shuffleQuestions = (questionsArray: IQuestion[]): IQuestion[] => {
    return [...questionsArray].sort(() => Math.random() - 0.5);
};