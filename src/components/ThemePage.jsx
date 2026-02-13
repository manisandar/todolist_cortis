import React from 'react';
import HeroSection from './HeroSection';
import ThemeSelector from './ThemeSelector';

function ThemePage({ member, isFading, members, onSelectMember }) {
  return (
    <>
      <HeroSection member={member} isFading={isFading} />
      <ThemeSelector members={members} selectedMember={member} onSelectMember={onSelectMember} />
    </>
  );
}

export default ThemePage;
