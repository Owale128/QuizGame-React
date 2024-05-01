import React from "react";
import { QuestionProps } from "../interface/QuestionProps";

export const showQuestion: React.FC<QuestionProps> = ({ question, handleAnswer }) => {

    return (
        <div>
            <h2>{question.question}</h2>
            <ul>
                {question.options.map((option, index) => ( 
                    <li key={index} onClick={() => handleAnswer(option === question.options[question.correctAnswerIndex])}>{option}</li>
                ))}
            </ul>
        </div>
    )
}