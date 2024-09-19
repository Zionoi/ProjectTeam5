import React, { useEffect, useState } from "react";
import "./RestaurantMap.css"; // 스타일 파일 불러오기

function RestaurantMap() {
  const [restaurants, setRestaurants] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]); // 마커들을 저장할 상태
  const [searchKeyword, setSearchKeyword] = useState(""); // 기본 검색 키워드 설정

  // 네이버 지도 스크립트를 비동기적으로 로드하는 함수
  const loadNaverMapScript = () => {
    return new Promise((resolve, reject) => {
      if (window.naver && window.naver.maps) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=xjh0qjchu1`; // 네이버 클라이언트 ID
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

  // 마커들을 제거하는 함수
  const clearMarkers = () => {
    markers.forEach((marker) => marker.setMap(null)); // 지도에서 마커 제거
    setMarkers([]); // 상태에서 마커 초기화
  };

  // SK 오픈 API로부터 음식점 데이터를 가져오는 함수
  const fetchRestaurants = (keyword) => {
    // 리스트를 먼저 초기화
    setRestaurants([]);
    // 기존 마커 제거
    clearMarkers();

    // URL에 필수 파라미터를 다시 확인하고 추가합니다.
    const url = `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${keyword}&page=1&searchType=all&count=20&resCoordType=WGS84GEO&multiPoint=N&searchtypCd=A&reqCoordType=WGS84GEO&poiGroupYn=N`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        appKey: "PvNF6A578c9De272T5Qz0auxd92lssbk3nmXey3c", // SK API Key 입력
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // 콘솔로 응답 데이터를 확인할 수 있도록 추가
        console.log("API 응답 데이터:", data);

        const restaurantData = data?.searchPoiInfo?.pois?.poi;
        if (Array.isArray(restaurantData)) {
          setRestaurants(restaurantData);
          displayMarkersOnMap(restaurantData); // 데이터를 지도에 마커로 표시
          moveMapToCenter(restaurantData); // 검색된 음식점들의 중간 위치로 지도 중심 이동
        } else {
          console.error("Expected an array but got:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  };

  // 지도에 음식점 마커를 표시하는 함수
  const displayMarkersOnMap = (restaurants) => {
    if (map) {
      const newMarkers = [];
      restaurants.forEach((restaurant) => {
        const position = new window.naver.maps.LatLng(restaurant.frontLat, restaurant.frontLon);

        const marker = new window.naver.maps.Marker({
          position: position,
          map: map,
          title: restaurant.name,
        });

        // 음식점 이름에서 '주차장'이라는 단어를 제거
        const restaurantName = restaurant.name.replace("주차장", "").trim();
        // 주소를 구성하는 필드들
        const address = `${restaurant.upperAddrName || ''} ${restaurant.middleAddrName || ''} ${restaurant.roadName || ''} ${restaurant.firstBuildNo || ''}`.trim();

        // 정보창에 표시할 내용
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `<div style="padding:10px;"><strong>${restaurantName}</strong><br>${address}</div>`,
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.open(map, marker);
        });
        newMarkers.push(marker);
      });
      setMarkers(newMarkers); // 새로운 마커들 저장
    }
  };

  // 음식점들의 중간 위치로 지도 중심을 이동시키는 함수
  const moveMapToCenter = (restaurants) => {
    if (map && restaurants.length > 0) {
      const latitudes = restaurants.map((restaurant) => parseFloat(restaurant.frontLat));
      const longitudes = restaurants.map((restaurant) => parseFloat(restaurant.frontLon));

      // 위도와 경도의 평균을 계산
      const avgLatitude = latitudes.reduce((acc, lat) => acc + lat, 0) / latitudes.length;
      const avgLongitude = longitudes.reduce((acc, lon) => acc + lon, 0) / longitudes.length;

      const newCenter = new window.naver.maps.LatLng(avgLatitude, avgLongitude);
      map.setCenter(newCenter); // 지도 중심 이동
    }
  };

  // 네이버 지도 초기화 함수
  const initializeMap = () => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(37.494669, 127.030103), // 더조은 좌표
      zoom: 15,
    };
    const naverMap = new window.naver.maps.Map("map", mapOptions);
    setMap(naverMap);
  };

  useEffect(() => {
    loadNaverMapScript()
      .then(() => {
        console.log("Naver Map API loaded successfully");
        initializeMap(); // 네이버 지도 초기화
        fetchRestaurants(searchKeyword); // SK API로부터 음식점 데이터 가져오기
      })
      .catch((error) => {
        console.error("Error loading Naver Map API:", error);
      });
  }, []);

  // 검색 버튼 클릭 시 실행되는 함수
  const handleSearch = () => {
    fetchRestaurants(searchKeyword + "맛집"); // 입력된 키워드로 음식점 데이터 가져오기
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      {/* 네이버 지도 표시 */}
      <div id="map"></div>

      {/* 음식점 목록 표시 및 지역 검색 기능 */}
      <div className="restaurant-list">
        {/* 검색어 입력 및 검색 버튼 */}
        <div className="search-bar">
          <h3>음식점 검색</h3>
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="지역 또는 키워드 검색"
          />
          <button onClick={handleSearch}>검색</button>
        </div>

        <ul>
          {restaurants.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
            // 주차장이 포함되지 않은 음식점만 필터링
            restaurants
              .filter((restaurant) => !restaurant.name.includes("주차장"))
              .map((restaurant) => {
                // 주소를 구성하는 필드들
                const address = `${restaurant.upperAddrName || ''} ${restaurant.middleAddrName || ''} ${restaurant.roadName || ''} ${restaurant.firstBuildNo || ''}`.trim();

                return (
                  <li key={restaurant.id}>
                    <strong>{restaurant.name}</strong>
                    <p>주소: {address}</p>
                    <p>전화번호: {restaurant.telNo}</p>
                  </li>
                );
              })
          )}
        </ul>
      </div>
    </div>
  );
}

export default RestaurantMap;
