import React from 'react';
import { albumArtLibrary } from '../data/albumArtLibrary';

function AlbumsSection() {
  return (
    <section className="glass-card section-block">
      <h2 className="section-title">Cortis Albums</h2>
      <div className="albums-grid">
        {albumArtLibrary.map((album) => (
          <article key={album.albumName} className="album-card">
            <img src={album.coverArt} alt={`${album.albumName} cover`} />
            <h3>{album.albumName}</h3>
            <p>
              <strong>Release:</strong> {album.releaseDate}
            </p>
            <a href={album.spotifyLink} target="_blank" rel="noreferrer">
              Open on Spotify
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default AlbumsSection;
