import React, { useMemo, useState } from 'react';
import { quizQuestionLibrary } from '../data/quizQuestions';

const QUESTIONS_PER_ROUND = 5;

function pickRandomQuestions(questions, count) {
  const shuffled = [...questions];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.slice(0, Math.min(count, shuffled.length));
}

function QuizSection() {
  const [activeQuestions, setActiveQuestions] = useState(() =>
    pickRandomQuestions(quizQuestionLibrary, QUESTIONS_PER_ROUND)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [isLocked, setIsLocked] = useState(false);

  const currentQuestion = activeQuestions[currentIndex];
  const totalQuestions = activeQuestions.length;

  const confettiPieces = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);

  const handleAnswer = (choice) => {
    if (isLocked) return;

    setIsLocked(true);
    const isCorrect = choice === currentQuestion.answer;
    const updatedScore = isCorrect ? score + 1 : score;
    setFeedback(isCorrect ? 'Starlight Yes ✨' : 'Moonlight Oops 🌙');

    setTimeout(() => {
      if (currentIndex < totalQuestions - 1) {
        setScore(updatedScore);
        setCurrentIndex((prev) => prev + 1);
        setFeedback('');
        setIsLocked(false);
        return;
      }

      setScore(updatedScore);
      setFinished(true);
      setFeedback('');
      setIsLocked(false);
    }, 650);
  };

  const restartQuiz = () => {
    setActiveQuestions(pickRandomQuestions(quizQuestionLibrary, QUESTIONS_PER_ROUND));
    setCurrentIndex(0);
    setScore(0);
    setFinished(false);
    setFeedback('');
    setIsLocked(false);
  };

  if (totalQuestions === 0) {
    return (
      <section className="glass-card section-block quiz-wrap">
        <h2 className="section-title">Cortis Quiz Challenge</h2>
        <p>No quiz questions available. Add questions in `src/data/quizQuestions.js`.</p>
      </section>
    );
  }

  return (
    <section className="glass-card section-block quiz-wrap">
      <h2 className="section-title">Cortis Quiz Challenge</h2>

      {!finished ? (
        <div className="quiz-box">
          <p className="quiz-progress">
            Question {currentIndex + 1} / {totalQuestions}
          </p>
          <h3>{currentQuestion.question}</h3>
          <div className="quiz-options">
            {currentQuestion.options.map((option) => (
              <button key={option} onClick={() => handleAnswer(option)} disabled={isLocked}>
                {option}
              </button>
            ))}
          </div>
          {feedback ? (
            <p className={`quiz-feedback ${feedback === 'Starlight Yes ✨' ? 'ok' : 'bad'}`}>{feedback}</p>
          ) : null}
        </div>
      ) : (
        <div className="quiz-result">
          <h3>
            Final Score: {score}/{totalQuestions}
          </h3>
          {score >= 4 ? <p>You are the Ultimate Cortis Queen 👑</p> : <p>So close. Try once more, COER.</p>}

          {score === totalQuestions ? (
            <div className="confetti-layer" aria-hidden="true">
              {confettiPieces.map((piece) => (
                <span
                  key={piece}
                  className="confetti-piece"
                  style={{
                    left: `${(piece % 12) * 8 + Math.random() * 3}%`,
                    animationDelay: `${(piece % 8) * 0.2}s`
                  }}
                />
              ))}
            </div>
          ) : null}

          <button onClick={restartQuiz}>Play Again</button>
        </div>
      )}
    </section>
  );
}

export default QuizSection;
