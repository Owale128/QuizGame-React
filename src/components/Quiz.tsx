import React, { useState, useEffect } from "react";
import { IQuestion } from "../interface/IQuestion";
import { fetchQuestions, submitResult } from "./fetchQuestions";
import { shuffleQuestions } from "./ShuffleQuestions";
import { IUserAnswer } from "../interface/IUserAnswer";
import HighestScores from "./HighestScore";

export const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);
    const [username, setUsername] = useState<string>("");
    const [usernameInput, setUsernameInput] = useState<string>("");

    const handleAnswer = (selectedAnswerIndex: number) => {
        const isCorrect = selectedAnswerIndex === questions[currentQuestion].correctAnswerIndex;
        if (isCorrect) {
            setScore(score + 1);
        }

        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers.push({ 
            question: questions[currentQuestion].question,
            selectedOption: selectedAnswerIndex,
            isCorrect: isCorrect
        });
        setUserAnswers(updatedUserAnswers);

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResult(true);
            submitResult(username, score, updatedUserAnswers);
        }
    };

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const fetchedQuestions = await fetchQuestions();
                setQuestions(shuffleQuestions(fetchedQuestions));
            } catch (error) {
                console.error('Fel vid hämtning av frågor:', error);
            }
        };
        getQuestions();
    }, []);

    const startQuiz = () => {
        setUsername(usernameInput);
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setUserAnswers([]);
        setQuestions(shuffleQuestions(questions));
    };

    return (
        <div className="container">
            {!username ? (
                <div className="usernameContainer">
                    <form onSubmit={startQuiz}>
                        <input
                            type="text"
                            placeholder="Ange ditt användarnamn"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                        />
                        <button className="submitBtn" type="submit">Börja quizen</button>
                    </form>
                </div>
            ) : (
                <>
                {showResult ? (
                    <div className="resultContainer">
                        <h1>Resultat</h1>
                        <p>Poäng: {score}/{questions.length}</p>
                        <h3>Dina svar:</h3>
                        <ol className="userAnswerContainer">
                            {userAnswers.map((answer, index) => (
                                 <li 
                                 key={index} 
                                 className={answer.isCorrect ? "correct" : "incorrect"}>
                                 {questions[index].options[answer.selectedOption]}
                             </li>
                            ))}
                        </ol>
                        <button className="restartBtn" onClick={restartQuiz}>Starta om quizen</button>
                        <HighestScores />
                    </div>
                    ) : (
                        <div className="questionContainer">
                            <h2>Quiz</h2>
                            <h3>{questions[currentQuestion]?.question}</h3>
                            <ul>
                                {questions[currentQuestion]?.options.map((option, index) => (
                                    <li key={index} onClick={() => handleAnswer(index)}>
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
