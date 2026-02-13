import React, { useEffect, useMemo, useState } from 'react';
import { studyQuotes } from '../data/studyQuotes';

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function StudyTimer({ activeImage, selectedMember }) {
  const [minutesInput, setMinutesInput] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteStyleIndex, setQuoteStyleIndex] = useState(0);
  const [showCongratsPopup, setShowCongratsPopup] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false);
          setShowCongratsPopup(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % studyQuotes.length);
      setQuoteStyleIndex((prev) => (prev + 1) % 3);
    }, 4800);

    return () => clearInterval(quoteInterval);
  }, []);

  useEffect(() => {
    if (!showCongratsPopup) return;

    const hideTimeout = setTimeout(() => {
      setShowCongratsPopup(false);
    }, 2000);

    return () => clearTimeout(hideTimeout);
  }, [showCongratsPopup]);

  const progressPercent = useMemo(() => {
    const total = Math.max(1, Number(minutesInput) * 60);
    const elapsed = Math.max(0, total - timeLeft);
    return Math.min(100, Math.round((elapsed / total) * 100));
  }, [minutesInput, timeLeft]);

  const handleDurationChange = (event) => {
    const value = Math.min(180, Math.max(1, Number(event.target.value) || 1));
    setMinutesInput(value);
    if (!isRunning) setTimeLeft(value * 60);
  };

  const handleStartPause = () => {
    if (timeLeft <= 0) {
      setTimeLeft(minutesInput * 60);
      setShowCongratsPopup(false);
    }
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setShowCongratsPopup(false);
    setTimeLeft(minutesInput * 60);
  };

  return (
    <section className="glass-card section-block timer-card">
      <h2 className="section-title">Study Timer</h2>

      <div className="timer-display">{formatTime(timeLeft)}</div>

      <div className="timer-progress-track" aria-hidden="true">
        <div className="timer-progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>

      <div className={`timer-quote quote-style-${quoteStyleIndex}`}>
        <p>{studyQuotes[quoteIndex].text}</p>
      </div>

      <div className="timer-controls">
        <label htmlFor="study-minutes">Minutes</label>
        <input
          id="study-minutes"
          type="number"
          min="1"
          max="180"
          value={minutesInput}
          onChange={handleDurationChange}
        />
      </div>

      <div className="timer-actions">
        <button type="button" onClick={handleStartPause}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button type="button" className="timer-reset-btn" onClick={handleReset}>
          Reset
        </button>
      </div>

      {showCongratsPopup ? (
        <div className="timer-popup" role="status" aria-live="polite">
          <img src={activeImage} alt={`${selectedMember?.name ?? 'Cortis'} success`} />
          <p>Great job</p>
        </div>
      ) : null}
    </section>
  );
}

export default StudyTimer;
