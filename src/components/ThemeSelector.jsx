import React from 'react';

function ThemeSelector({ members, selectedMember, onSelectMember }) {
  return (
    <section className="glass-card section-block">
      <h2 className="section-title">Pick Your Cortis Bias Theme</h2>
      <div className="theme-grid">
        {members.map((member) => {
          const isActive = member.name === selectedMember.name;

          return (
            <button
              key={member.name}
              className={`theme-chip ${isActive ? 'active' : ''}`}
              onClick={() => onSelectMember(member)}
              style={{ '--chip-color': member.colors.primary }}
            >
              <span>{member.name}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default ThemeSelector;
