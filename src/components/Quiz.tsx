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

    return (
        <div className="container">
            {showResult ? (
                <div className="resultContainer">
                <h1>Resultat</h1>
                <p>Poäng: {score}/{questions.length}</p>
                <button onClick={restartQuiz}>Restart Quiz</button>
            </div>
             ) : (
                 <div className="questionContainer">
                     <h2>Quiz</h2>
                <h3>{questions[currentQuestion]?.question}</h3>
                <ul>
                {questions[currentQuestion]?.options.map((option, index) => (
                <li key={index} onClick={() => handleAnswer(index)}>{option}</li>
                ))}
          
                </ul>
                </div>
        )}
        </div>
    )
}