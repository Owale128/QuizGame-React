import { IQuestion } from "../interface/IQuestion";

export const fetchQuestions = async (): Promise<IQuestion[]> => {
    return new Promise<IQuestion[]>((resolve) => {

        const questions: IQuestion[] = [

        ];

        resolve(questions)

        
    });
};

