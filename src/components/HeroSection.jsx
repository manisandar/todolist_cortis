import React from 'react';

function HeroSection({ member, isFading, activeImage }) {
  return (
    <section className={`slideshow-inline glass-card ${isFading ? 'fade-out' : 'fade-in'}`}>
      <div className="slideshow-image-wrap">
        <img src={activeImage} alt={`${member.name} slideshow visual`} className="hero-image" />
      </div>
    </section>
  );
}

export default HeroSection;
