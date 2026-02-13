import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import TodoSection from './components/TodoSection';
import QuizSection from './components/QuizSection';
import AlbumsSection from './components/AlbumsSection';
import StudyTimer from './components/StudyTimer';
import SnakeGame from './components/SnakeGame';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import { members } from './data/members';

const TASKS_STORAGE_KEY = 'cortis_valentine_tasks';

function getInitialTasks() {
  try {
    const saved = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function App() {
  const audioRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(members[0] ?? null);
  const [isFading, setIsFading] = useState(false);
  const [tasks, setTasks] = useState(getInitialTasks);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const selectedImages = useMemo(() => selectedMember?.images ?? [], [selectedMember]);
  const activeImage = selectedImages[slideIndex] ?? selectedMember?.image;
  const progressImage =
    selectedImages.length > 1
      ? selectedImages[(slideIndex + 1) % selectedImages.length]
      : activeImage;

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!selectedMember) return;

    document.documentElement.style.setProperty('--primary-color', selectedMember.colors.primary);
    document.documentElement.style.setProperty('--secondary-color', selectedMember.colors.secondary);
    document.documentElement.style.setProperty('--background-color', selectedMember.colors.background);

    setSlideIndex(0);
    setIsFading(true);
    const fadeTimeout = setTimeout(() => setIsFading(false), 350);

    return () => clearTimeout(fadeTimeout);
  }, [selectedMember]);

  useEffect(() => {
    if (selectedImages.length <= 1) return;

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % selectedImages.length);
      setIsFading(true);
      setTimeout(() => setIsFading(false), 300);
    }, 3200);

    return () => clearInterval(interval);
  }, [selectedImages]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;

    let cleanupUnlock = null;

    const attachUnlockListeners = () => {
      const unlockPlayback = async () => {
        try {
          await audio.play();
          setIsMusicPlaying(true);
          if (cleanupUnlock) cleanupUnlock();
        } catch {
          setIsMusicPlaying(false);
        }
      };

      const events = ['pointerdown', 'keydown', 'touchstart'];
      events.forEach((eventName) =>
        window.addEventListener(eventName, unlockPlayback, { once: true })
      );

      cleanupUnlock = () => {
        events.forEach((eventName) => window.removeEventListener(eventName, unlockPlayback));
      };
    };

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch {
        setIsMusicPlaying(false);
        attachUnlockListeners();
      }
    };

    tryAutoplay();

    return () => {
      if (cleanupUnlock) cleanupUnlock();
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsMusicPlaying(true);
      } catch {
        setIsMusicPlaying(false);
      }
      return;
    }

    audio.pause();
    setIsMusicPlaying(false);
  };

  if (!selectedMember) return null;

  return (
    <div className="app-shell">
      <div className="hearts-layer" aria-hidden="true">
        <span className="heart h1">❤</span>
        <span className="heart h2">❤</span>
        <span className="heart h3">❤</span>
        <span className="heart h4">❤</span>
      </div>

      <main className="content">
        <audio ref={audioRef} src="/audio/bg-music.mp3" loop preload="auto" />
        <button type="button" className="music-toggle" onClick={toggleMusic}>
          {isMusicPlaying ? 'Music: On' : 'Music: Off'}
        </button>

        <Navbar
          members={members}
          selectedMember={selectedMember}
          onSelectMember={setSelectedMember}
        />

        <HeroSection member={selectedMember} isFading={isFading} activeImage={activeImage} />

        <div className="route-page">
          <Routes>
            <Route
              path="/todo"
              element={
                <TodoSection
                  tasks={tasks}
                  setTasks={setTasks}
                  selectedMember={selectedMember}
                  progressImage={progressImage}
                />
              }
            />
            <Route path="/quiz" element={<QuizSection />} />
            <Route path="/albums" element={<AlbumsSection />} />
            <Route path="/timer" element={<StudyTimer activeImage={activeImage} selectedMember={selectedMember} />} />
            <Route path="/snake" element={<SnakeGame selectedMember={selectedMember} activeImage={activeImage} />} />
            <Route path="*" element={<Navigate to="/todo" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
