import React from 'react';
import ReactDOM from 'react-dom/client';
import Quiz from './components/Quiz';
import './index.css'
import { QuizProvider } from './context/quiz';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <QuizProvider>
      <Quiz />
    </QuizProvider>
);
