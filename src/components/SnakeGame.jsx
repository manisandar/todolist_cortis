import React, { useEffect, useRef, useState } from 'react';

const GRID_SIZE = 21;
const CELL_SIZE = 65;
const GAME_SPEED_MS = 175;
const FOOD_SIZE_MULTIPLIER = 2;
const SNAKE_HIGHSCORE_KEY = 'cortis_snake_highscore';
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];
const INITIAL_DIRECTION = { x: 1, y: 0 };

function randomFoodPosition(snake) {
  let position = { x: 0, y: 0 };
  let isOnSnake = true;

  while (isOnSnake) {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };

    isOnSnake = snake.some((segment) => segment.x === position.x && segment.y === position.y);
  }

  return position;
}

function SnakeGame({ selectedMember, activeImage }) {
  const canvasRef = useRef(null);
  const foodImageRef = useRef(null);

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() => randomFoodPosition(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [queuedDirection, setQueuedDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem(SNAKE_HIGHSCORE_KEY)) || 0;
    } catch {
      return 0;
    }
  });
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [foodAvatarIndex, setFoodAvatarIndex] = useState(0);

  const memberImages = selectedMember?.images ?? [];
  const foodAvatarSrc = memberImages[foodAvatarIndex] ?? activeImage;

  const requestDirection = (next) => {
    const isReverse = next.x === -queuedDirection.x && next.y === -queuedDirection.y;
    if (isReverse) return;
    setQueuedDirection(next);
  };

  useEffect(() => {
    setFoodAvatarIndex(0);
  }, [selectedMember?.name]);

  useEffect(() => {
    const image = new Image();
    image.src = foodAvatarSrc;
    foodImageRef.current = image;
  }, [foodAvatarSrc]);

  useEffect(() => {
    const handleKeydown = (event) => {
      const keyMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        w: { x: 0, y: -1 },
        s: { x: 0, y: 1 },
        a: { x: -1, y: 0 },
        d: { x: 1, y: 0 }
      };

      const next = keyMap[event.key];
      if (!next) return;
      requestDirection(next);
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [queuedDirection]);

  useEffect(() => {
    if (!isRunning || isGameOver) return;

    const timer = setTimeout(() => {
      setSnake((prevSnake) => {
        const nextDirection = queuedDirection;
        setDirection(nextDirection);

        const head = prevSnake[0];
        const newHead = {
          x: head.x + nextDirection.x,
          y: head.y + nextDirection.y
        };

        const hitWall =
          newHead.x < 0 || newHead.y < 0 || newHead.x >= GRID_SIZE || newHead.y >= GRID_SIZE;

        const hitSelf = prevSnake.some(
          (segment) => segment.x === newHead.x && segment.y === newHead.y
        );

        if (hitWall || hitSelf) {
          setIsGameOver(true);
          setIsRunning(false);
          return prevSnake;
        }

        const ateFood = newHead.x === food.x && newHead.y === food.y;

        const nextSnake = [newHead, ...prevSnake];
        if (!ateFood) {
          nextSnake.pop();
        } else {
          setScore((prev) => prev + 1);
          setFood(randomFoodPosition(nextSnake));
          setFoodAvatarIndex((prev) => {
            if (memberImages.length === 0) return prev;
            return (prev + 1) % memberImages.length;
          });
        }

        return nextSnake;
      });
    }, GAME_SPEED_MS);

    return () => clearTimeout(timer);
  }, [snake, queuedDirection, food, isRunning, isGameOver, memberImages.length]);

  useEffect(() => {
    if (score <= highScore) return;

    setHighScore(score);
    try {
      localStorage.setItem(SNAKE_HIGHSCORE_KEY, String(score));
    } catch {
      // Ignore storage errors and continue game.
    }
  }, [score, highScore]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    const rootStyles = getComputedStyle(document.documentElement);
    const primaryColor = rootStyles.getPropertyValue('--primary-color').trim() || '#ff4d6d';

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    for (let i = 0; i <= GRID_SIZE; i += 1) {
      context.beginPath();
      context.moveTo(i * CELL_SIZE, 0);
      context.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      context.stroke();

      context.beginPath();
      context.moveTo(0, i * CELL_SIZE);
      context.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      context.stroke();
    }

    snake.forEach((segment, index) => {
      context.fillStyle = index === 0 ? '#222' : primaryColor;
      context.fillRect(segment.x * CELL_SIZE + 1, segment.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });

    const foodX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const foodY = food.y * CELL_SIZE + CELL_SIZE / 2;
    const baseRadius = CELL_SIZE / 2 - 2;
    const radius = baseRadius * FOOD_SIZE_MULTIPLIER;

    context.save();
    context.beginPath();
    context.arc(foodX, foodY, radius, 0, Math.PI * 2);
    context.clip();

    const foodImage = foodImageRef.current;
    if (foodImage && foodImage.complete) {
      context.drawImage(foodImage, foodX - radius, foodY - radius, radius * 2, radius * 2);
    } else {
      context.fillStyle = '#ff4d6d';
      context.fillRect(foodX - radius, foodY - radius, radius * 2, radius * 2);
    }
    context.restore();

    context.strokeStyle = '#fff';
    context.lineWidth = 1.5;
    context.beginPath();
    context.arc(foodX, foodY, radius, 0, Math.PI * 2);
    context.stroke();
  }, [snake, food, foodAvatarSrc]);

  const startPause = () => {
    if (isGameOver) return;
    setIsRunning((prev) => !prev);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(randomFoodPosition(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    setQueuedDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsRunning(false);
    setIsGameOver(false);
  };

  return (
    <section className="glass-card section-block snake-wrap">
      <h2 className="section-title">Snake Game</h2>
      <p className="snake-sub">
        Eat <strong>{selectedMember.name}</strong> avatar photos to grow longer.
      </p>

      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="snake-canvas"
      />

      <div className="snake-meta">
        <div className="snake-scoreline">
          <p>Score: {score}</p>
          <p>High Score: {highScore}</p>
        </div>
        <div className="snake-actions">
          <button type="button" onClick={startPause}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button type="button" className="snake-reset" onClick={resetGame}>
            Reset
          </button>
        </div>
      </div>
      <p className={isGameOver ? 'snake-over snake-status' : 'snake-status'} aria-live="polite">
        {isGameOver ? 'Game Over' : 'Beat your high score.'}
      </p>

      <div className="snake-pad" aria-label="Touch direction controls">
        <button type="button" className="snake-pad-btn up" onClick={() => requestDirection({ x: 0, y: -1 })}>
          ↑
        </button>
        <button type="button" className="snake-pad-btn left" onClick={() => requestDirection({ x: -1, y: 0 })}>
          ←
        </button>
        <button type="button" className="snake-pad-btn right" onClick={() => requestDirection({ x: 1, y: 0 })}>
          →
        </button>
        <button type="button" className="snake-pad-btn down" onClick={() => requestDirection({ x: 0, y: 1 })}>
          ↓
        </button>
      </div>

    </section>
  );
}

export default SnakeGame;
