import React, { useEffect, useState } from "react";
import "./RestaurantMap.css"; // 동일한 스타일을 사용

function FavoriteList() {
  const [favorites, setFavorites] = useState([]); // 찜 목록
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // 선택된 음식점
  const [map, setMap] = useState(null); // 네이버 지도 객체
  const [markers, setMarkers] = useState([]); // 마커들을 저장할 상태

  // 네이버 지도 스크립트 로드
  const loadNaverMapScript = () => {
    return new Promise((resolve, reject) => {
      if (window.naver && window.naver.maps) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=xjh0qjchu1`;
        script.async = true;

        script.onload = () => {
          if (window.naver && window.naver.maps) {
            resolve();
          } else {
            reject(new Error("Naver Map API failed to load"));
          }
        };

        script.onerror = () => {
          reject(new Error("Naver Map script load error"));
        };

        document.head.appendChild(script);
      }
    });
  };

  // 찜한 음식점 데이터 불러오기
  const fetchFavorites = () => {
    fetch(`/api/favorites/list?memId=${localStorage.getItem('id')}`)  
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFavorites(data);
          console.log("Fetched data:", data); // 데이터를 확인하기 위한 로그
          if (map) { // map이 초기화된 후에만 마커 표시
            displayMarkersOnMap(data);
          }
        } else {
          console.error('Received data is not an array', data);
          setFavorites([]);  // 기본값 설정
        }
      })
      .catch((error) => {
        console.error('Error fetching favorites', error);
        setFavorites([]);  // 오류 발생 시 기본값으로 빈 배열 설정
      });
  };

  // 찜 삭제 기능 구현
  const deleteFavorite = (restaurantId) => {
    const memId = localStorage.getItem('id');  // 현재 사용자 아이디

    fetch(`/api/favorites/delete?memId=${memId}&restaurantId=${restaurantId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          alert("찜 목록에서 삭제되었습니다.");
          // 찜 삭제 후 리스트 갱신
          fetchFavorites();
          removeMarker(restaurantId); // 마커 제거
          setSelectedRestaurant(null);  // 상세보기 창 닫기
        } else {
          alert("삭제하는 데 오류가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.error("Error deleting favorite", error);
      });
  };

  // 지도에 마커 표시 (노란색 마커로 설정)
  const displayMarkersOnMap = (restaurants) => {
    if (!map) return; // map 객체가 없으면 마커를 추가하지 않음

    clearMarkers(); // 기존 마커 초기화
    const newMarkers = [];
    restaurants.forEach((restaurant) => {
      const position = new window.naver.maps.LatLng(restaurant.restaurant.latitude, restaurant.restaurant.longitude);

      const marker = new window.naver.maps.Marker({
        position: position,
        map: map,
        title: restaurant.restaurant.rnum, // 마커에 rnum 사용
      });

      const infoWindowContent = `
        <div style="padding:10px; cursor:pointer;" id="infoWindow-${restaurant.restaurant.rnum}">
          <strong>${restaurant.restaurant.rname}</strong><br>${restaurant.restaurant.raddress || '주소 없음'}
        </div>`;

      const infoWindow = new window.naver.maps.InfoWindow({
        content: infoWindowContent,
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });
    setMarkers(newMarkers);
  };

  // 지도에서 특정 마커 제거
  const removeMarker = (restaurantId) => {
    const updatedMarkers = markers.filter((marker) => {
      if (marker.title === restaurantId) {
        marker.setMap(null); // 지도에서 마커 제거
        return false;
      }
      return true;
    });
    setMarkers(updatedMarkers);
  };

  // 기존 마커 모두 제거
  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null)); // 지도에서 모든 마커 제거
    setMarkers([]); // 상태에서 마커 초기화
  };

  // 지도 초기화
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.494669, 127.030103),
      zoom: 15,
    };
    const naverMap = new window.naver.maps.Map("map", mapOptions);
    setMap(naverMap);
  };

  useEffect(() => {
    loadNaverMapScript()
      .then(() => {
        initializeMap();
      })
      .catch((error) => {
        console.error("Error loading Naver Map API:", error);
      });
  }, []);

  useEffect(() => {
    if (map) {
      fetchFavorites(); // map이 준비된 후 찜 목록을 불러옴
    }
  }, [map]); // map이 초기화된 후에만 찜 목록을 가져옴

  // 음식점 선택 시 상세보기 페이지로 이동
  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  return (
    <div className="container">
      <div id="map" className="map"></div>

      <div className="restaurant-list">
        {selectedRestaurant ? (
          <div className="restaurant-details">
            <h3>{selectedRestaurant.rname}</h3> {/* 음식점 이름 */}
            <p>주소: {selectedRestaurant.raddress}</p> {/* 음식점 주소 */}
            <p>전화번호: {selectedRestaurant.telNo || "전화번호 없음"}</p> {/* 전화번호 없을 경우 기본 메시지 */}
            <button onClick={() => deleteFavorite(selectedRestaurant.rnum)}>찜 삭제</button> {/* 찜 삭제 기능 추가 */}
            <button onClick={() => setSelectedRestaurant(null)}>뒤로가기</button>
          </div>
        ) : (
          <ul>
            {Array.isArray(favorites) && favorites.length === 0 ? (
              <p>찜한 음식점이 없습니다.</p>
            ) : (
              Array.isArray(favorites) &&
              favorites.map((favorite) => (
                <li key={favorite.restaurant.rnum} onClick={() => handleRestaurantClick(favorite.restaurant)}>
                  <strong>{favorite.restaurant.rname}</strong> {/* 음식점 이름 */}
                  <p>주소: {favorite.restaurant.raddress}</p> {/* 음식점 주소 */}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FavoriteList;
