import React, { useState } from "react";

export default function StudentCard({ name, id, course, year, onDelete }) {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  function toggleFavorite() {
    setIsFavorite(!isFavorite);
    setFavoriteCount((count) => count + (isFavorite ? -1 : 1));
  }

  return (
    <article className="student-card">
      <div className="card-top">
        <div className="card-actions">
          <button
            className={`favorite-button${isFavorite ? " is-favorite" : ""}`}
            type="button"
            onClick={toggleFavorite}
            aria-pressed={isFavorite}
            aria-label={`${isFavorite ? "Remove" : "Add"} ${name} ${isFavorite ? "from" : "to"} favorites`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M20.8 8.7c0 4.2-8.8 10-8.8 10s-8.8-5.8-8.8-10a4.5 4.5 0 0 1 8.8-1.3 4.5 4.5 0 0 1 8.8 1.3Z" />
            </svg>
          </button>
          <button
            className="delete-button"
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${name}`}
          >
            <svg aria-hidden="true" viewBox="0 0 24 24">
              <path d="M4 7h16M10 11v6m4-6v6M5.5 7l1 13h11l1-13M9 7V4h6v3" />
            </svg>
          </button>
        </div>
      </div>

      <div className="student-identity">
        <h3>{name}</h3>
        <span className="student-id">ID · {id}</span>
      </div>

      <div className="card-divider" />

      <dl className="student-details">
        <div>
          <dt>Course</dt>
          <dd>{course}</dd>
        </div>
        <div>
          <dt>Year level</dt>
          <dd>{year}</dd>
        </div>
      </dl>

      <div className="card-bottom">
        <span className="favorite-label">FAVORITES</span>
        <span className="favorite-count">
          <span aria-hidden="true">♥</span> {favoriteCount}
        </span>
      </div>
    </article>
  );
}
