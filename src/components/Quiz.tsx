import React, {useState, useEffect} from "react";
import { IQuestion } from "../interface/IQuestion";
import { fetchQuestions} from "./fetchQuestions";


export const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const[currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false);

 

    const handleAnswer = (selectedAnswerIndex: number) => {
        const isCorrect  = selectedAnswerIndex === questions[currentQuestion].correctAnswerIndex;
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResult(true);
        }
    };

    useEffect(() => {
        const getQuestions = async () => {
            const fetchedQuestions = await fetchQuestions();
            setQuestions(fetchedQuestions)
        };
        getQuestions();
    }, [])

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
    };


}