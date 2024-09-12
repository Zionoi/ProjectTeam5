import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // 네이버 지도 API 스크립트 추가
    const script = document.createElement('script');
    script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=xjh0qjchu1`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // window.naver로 네이버 지도 객체에 접근
      const { naver } = window;
      if (naver) {
        const map = new naver.maps.Map('map', {
          center: new naver.maps.LatLng(37.5665, 126.9780), // 지도 중심
          zoom: 10,
        });

        // 맛집 데이터를 가져와서 마커 표시
        axios.get('/api/restaurants')
          .then(response => {
            setRestaurants(response.data);
            
            response.data.forEach(restaurant => {
              const marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(restaurant.latitude, restaurant.longitude), // 가정: 레스토랑 데이터에 위도와 경도 값이 있음
                map: map,
                title: restaurant.rName,
              });
            });
          })
          .catch(error => console.log(error));
      }
    };

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      document.head.removeChild(script);
    };
  }, []);

  const addLike = (restaurantId) => {
    axios.post(`/api/restaurants/${restaurantId}/like`)
      .then(() => alert('Liked!'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>Restaurant Page</h1>
      
      {/* RestaurantList와 LikeList로 이동하는 버튼 */}
      <div>
        <Link to="/like">
          <button>Like List</button>
        </Link>
      </div>

      {/* 네이버 지도 표시 */}
      <div id="map" style={{ width: '100%', height: '400px', marginBottom: '20px' }}></div>

      {/* 맛집 목록 표시 */}
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.rNum}>
            {restaurant.rName} - {restaurant.rAddress} - Likes: {restaurant.likeCount}
            <button onClick={() => addLike(restaurant.rNum)}>Like</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Restaurant;
