import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './sass/questionContainer.css'
import './sass/highestScore.css' 
import './sass/StartQuizForm.css'
import './sass/resultContainer.css'
import './sass/modal.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
