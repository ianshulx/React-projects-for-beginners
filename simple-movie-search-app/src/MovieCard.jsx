import React, { useState } from "react";

const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {
  const [modal, setModal] = useState(false);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <div className="movie-card">
      <img src={Poster} alt={Title} />
      <h3>{Title}</h3>
      <p>{Year}</p>
    </div>
  );
};

export default MovieCard;
