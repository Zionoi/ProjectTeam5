import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LikeList = () => {
  const [like, setLike] = useState([]);

  useEffect(() => {
    axios.get('/api/like')
      .then(response => setLike(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>좋아요❤</h1>
      <ul>
        {like.map(restaurant => (
          <li key={restaurant.rNum}>{restaurant.rName} - {restaurant.rAddress}</li>
        ))}
      </ul>
    </div>
  );
};

export default LikeList;