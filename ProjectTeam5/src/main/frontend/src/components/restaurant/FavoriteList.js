import React, { useEffect, useState } from "react";

function FavoriteList({ nickname }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch(`/api/favorites/list?nickname=${nickname}`)
      .then((res) => res.json())
      .then((data) => setFavorites(data));
  }, [nickname]);

  return (
    <div>
      <h2>찜한 음식점 리스트</h2>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            {favorite.restaurant.rName} - {favorite.restaurant.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FavoriteList;
