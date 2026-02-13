import React from 'react';
import { NavLink } from 'react-router-dom';

const pageNavItems = [
  { to: '/todo', label: 'To-Do' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/albums', label: 'Albums' },
  { to: '/timer', label: 'Study Timer' },
  { to: '/snake', label: 'Snake Game' }
];

function Navbar({ members, selectedMember, onSelectMember }) {
  return (
    <>
      <header className="top-nav glass-card">
        <p className="brand">Forever Cortis Star</p>
        <nav className="theme-nav" aria-label="Theme navigation">
          {members.map((member) => {
            const isActive = member.name === selectedMember.name;
            return (
              <button
                key={member.name}
                type="button"
                className={`theme-nav-btn ${isActive ? 'active' : ''}`}
                style={{ '--chip-color': member.colors.primary }}
                onClick={() => onSelectMember(member)}
              >
                {member.name}
              </button>
            );
          })}
        </nav>
      </header>

      <header className="sub-nav glass-card">
        <nav className="nav-links" aria-label="Section navigation">
          {pageNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
