import { IQuestion } from "./Question"

export interface QuestionProps {
    question: IQuestion;
    handleAnswer: (isCorrect: boolean) => void;
}

