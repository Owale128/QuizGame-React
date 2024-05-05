import React, { useState, useEffect } from "react";
import { IQuestion } from "../interface/IQuestion";
import { fetchQuestions } from "../api/FetchQuestions";
import { submitResult } from "../api/SubmitResult";
import { shuffleQuestions } from "./ShuffleQuestions";
import { IUserAnswer } from "../interface/IUserAnswer";
import HighestScores from "../api/HighestScore";
import { Modal } from "./Modal";
import { Timer } from "./Timer";

export const Quiz: React.FC = () => {
    const [questions, setQuestions] = useState<IQuestion[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showResult, setShowResult] = useState<boolean>(false);
    const [userAnswers, setUserAnswers] = useState<IUserAnswer[]>([]);
    const [username, setUsername] = useState<string>("");
    const [usernameInput, setUsernameInput] = useState<string>("");
    const [showHighestScore, setShowHighestScore] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [modalQuestion, setModalQuestion] = useState<string>("");
    const [modalCorrectAnswer, setModalCorrectAnswer] = useState<string>("");

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
    
    useEffect(() => {
        if (showResult) {
            submitResult(username, score, userAnswers);
        }
    }, [showResult]);
    
    const startQuiz = (e: React.FormEvent) => {
        e.preventDefault();
        if (usernameInput.trim() !== "") {
            setUsername(usernameInput);
        } else {
            alert("Var god fyll i ditt användarnamn innan du fortsätter till quizen!");
        }
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowResult(true);
        }
    };

    const handleAnswer = (selectedAnswerIndex: number) => {
        const isCorrect = selectedAnswerIndex === questions[currentQuestion].correctAnswerIndex;
        let updatedScore = score;
        if (isCorrect) {
            updatedScore += 1;
        }
    
        const updatedUserAnswers = [...userAnswers];
        updatedUserAnswers.push({ 
            question: questions[currentQuestion].question,
            selectedOption: selectedAnswerIndex,
            isCorrect: isCorrect
        });
        setUserAnswers(updatedUserAnswers);
        setScore(updatedScore); 
    
        handleNextQuestion(); 
    };
    

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setUserAnswers([]);
        setQuestions(shuffleQuestions(questions));
    };
    
    const quitQuiz = () => {
        setUsername("");
        setCurrentQuestion(0);
        setScore(0);
        setShowResult(false);
        setUserAnswers([]);
        setQuestions(shuffleQuestions(questions));
    };

    const toggleHighestScore = () => {
        setShowHighestScore(!showHighestScore);
    };

    const openAnswerModal = (question: string, correctAnswer: string) => {
        setModalQuestion(question);
        setModalCorrectAnswer(correctAnswer);
        setShowModal(true);
    };

    const closeAnswerModal = () => {
        setShowModal(false);
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
                        <p className="score">Poäng: {score}/{questions.length}</p>
                        <ol className="userAnswerContainer">
                        <h3>Dina svar:</h3>
                        {userAnswers.length > 0 && (
                            <p>klicka för att se rätt svar</p>
                        )}
                            {userAnswers.map((answer, index) => (
                                <li 
                                    key={index} 
                                    className={answer.isCorrect ? "correct" : "incorrect"}
                                    onClick={() => openAnswerModal(questions[index].question, questions[index].options[questions[index].correctAnswerIndex])}
                                >
                                    {questions[index].options[answer.selectedOption]}
                                </li>
                            ))}
                        </ol>
                        <button className="restartBtn" onClick={restartQuiz}>Starta om</button>
                        <button className="scoreBtn" onClick={toggleHighestScore}>Högsta poäng</button>
                        <button className="quitBtn" onClick={quitQuiz}>Avsluta</button>
                        {showHighestScore && <HighestScores />}
                    </div>
                ) : (
                    <div className="questionContainer">
                        <h2>Fråga {currentQuestion + 1}</h2>
                        <h3>{questions[currentQuestion]?.question}</h3>
                        <Timer key={currentQuestion} onTimeUp={handleNextQuestion} timeLimit={45} />
                        <ul>
                            {questions[currentQuestion]?.options.map((option, index) => (
                                <li key={index} onClick={() => handleAnswer(index)}>
                                    {option}
                                </li>
                            ))}
                        </ul>
                        <button className="quitBtn" onClick={quitQuiz}>Avsluta</button>
                    </div>
                )}
                </>
            )}
            {showModal && (
                <Modal
                    question={modalQuestion}
                    correctAnswer={modalCorrectAnswer}
                    closeModal={closeAnswerModal}
                />
            )}
        </div>
    );
}
