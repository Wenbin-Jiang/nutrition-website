import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const pluralize = (word, quantity) => {
  if (quantity > 1) {
    if (word.endsWith('y')) {
      return `${word.slice(0, -1)}ies`;
    } else if (word.endsWith('s') || word.endsWith('x') || word.endsWith('z')) {
      return `${word}es`;
    } else {
      return `${word}s`;
    }
  }
  return word;
};

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (index) => {
    const updatedFavorites = favorites.filter((_, i) => i !== index);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h1>Favorites</h1>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((item, index) => (
            <li key={index}>
              <Link 
                to={`/api?foodName=${encodeURIComponent(item.foodName)}&quantity=${encodeURIComponent(item.quantity)}&size=${encodeURIComponent(item.size)}`}
              >
                {item.quantity} {item.size} {pluralize(item.foodName, item.quantity)}
              </Link>
              <button 
                onClick={() => removeFromFavorites(index)} 
                className="btn btn-danger"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default Favorites;
