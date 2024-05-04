import React from "react";
import { IModal } from "../interface/IModal";


export const Modal: React.FC<IModal> = ({ question, correctAnswer, closeModal }) => {
    return (
        <div className="modal">
            <div className="modalContent">
                <h2>Fråga:</h2>
                <p>{question}</p>
                <h2>Rätt svar:</h2>
                <p className="correctAnswerModal">{correctAnswer}</p>
                <button className="modalBtn" onClick={closeModal}>Stäng</button>
            </div>
        </div>
    );
};

export default Modal;