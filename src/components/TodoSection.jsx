import React, { useState } from 'react';

function TodoSection({ tasks, setTasks, selectedMember, progressImage }) {
  const [input, setInput] = useState('');

  const addTask = (event) => {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed) return;

    const newTask = {
      id: Date.now(),
      text: trimmed,
      completed: false
    };

    setTasks((prev) => [newTask, ...prev]);
    setInput('');
  };

  const toggleCompleted = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed
            }
          : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;
  const isAllCompleted = tasks.length > 0 && progress === 100;

  return (
    <section className="glass-card section-block">
      <h2 className="section-title">To-Do List</h2>

      <div className="todo-progress-wrap">
        <div className="todo-progress-head">
          <p>Task Progress</p>
          <p>
            {completedCount}/{tasks.length} ({progress}%)
          </p>
        </div>
        <div className="todo-progress-track-wrap">
          <div
            className="todo-progress-track"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress}
          >
            <div className="todo-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          {tasks.length > 0 ? (
            <div className="todo-progress-avatar" style={{ left: `${progress}%` }}>
              <img src={progressImage} alt={`${selectedMember.name} progress`} />
            </div>
          ) : null}
        </div>
      </div>

      {isAllCompleted ? (
        <div className="todo-celebration">
          <div>
            <h3>Congratulation, COER</h3>
            <p>
              You completed everything today with <strong>{selectedMember.name}</strong> energy.
            </p>
          </div>
        </div>
      ) : null}

      <form className="todo-form" onSubmit={addTask}>
        <input
          type="text"
          placeholder="Add sweet plans for today..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {tasks.length === 0 ? <p className="empty-state">No plans yet. Let&apos;s make today magical.</p> : null}

      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`}>
            <span>{task.text}</span>
            <div className="todo-actions">
              <button type="button" className="complete-btn" onClick={() => toggleCompleted(task.id)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button type="button" className="delete-btn" onClick={() => deleteTask(task.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {completedCount > 0 ? <p className="completed-msg">You shine brighter than Cortis 💖</p> : null}
    </section>
  );
}

export default TodoSection;
