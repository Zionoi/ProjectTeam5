import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'; // Link를 사용하기 위해 추가
import "./RestaurantMap.css"; // 스타일 파일 불러오기

function RestaurantMap() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // 선택된 음식점
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
    setRestaurants([]);  // 리스트를 먼저 초기화
    clearMarkers();   // 기존 마커 제거

    const url = `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${keyword}&page=1&searchType=all&count=20&resCoordType=WGS84GEO&multiPoint=N&searchtypCd=A&reqCoordType=WGS84GEO&poiGroupYn=N`;

    fetch(url, {
      headers: {
        Accept: "application/json",
        appKey: "PvNF6A578c9De272T5Qz0auxd92lssbk3nmXey3c", // SK API Key 입력
      },
    })
      .then((response) => response.json())
      .then((data) => {
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

        // 음식점 이름에서 []와 그 안의 내용을 제거
        const restaurantName = restaurant.name.replace(/\[.*?\]/g, "").replace("주차장", "").trim();
        const address = `${restaurant.upperAddrName || ''} ${restaurant.middleAddrName || ''} ${restaurant.roadName || ''} ${restaurant.firstBuildNo || ''}`.trim();

        const marker = new window.naver.maps.Marker({
          position: position,
          map: map,
          title: restaurantName,
        });

        const infoWindowContent = `
          <div style="padding:10px; cursor:pointer;" id="infoWindow-${restaurant.id}">
            <strong>${restaurantName}</strong><br>${address}
          </div>`;

        const infoWindow = new window.naver.maps.InfoWindow({
          content: infoWindowContent,
        });

        // 마커 클릭 시 InfoWindow를 보여줌
        window.naver.maps.Event.addListener(marker, "click", () => {
          infoWindow.open(map, marker);
        // InfoWindow가 열렸을 때 해당 콘텐츠에 이벤트 리스너를 연결
        setTimeout(() => {
          const infoWindowElement = document.getElementById(`infoWindow-${restaurant.id}`);
            if (infoWindowElement) {
              infoWindowElement.addEventListener("click", () => {
                handleRestaurantClick({ ...restaurant, address, name: restaurantName }); // InfoWindow 클릭 시 상세보기로 이동
              });
            }
          }, 0); // 0ms 딜레이로 InfoWindow가 생성된 후에 이벤트 리스너 추가
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

      const avgLatitude = latitudes.reduce((acc, lat) => acc + lat, 0) / latitudes.length;
      const avgLongitude = longitudes.reduce((acc, lon) => acc + lon, 0) / longitudes.length;

      const newCenter = new window.naver.maps.LatLng(avgLatitude, avgLongitude);
      map.setCenter(newCenter); // 지도 중심 이동
    }
  };

  // 네이버 지도 초기화 함수
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
        console.log("Naver Map API loaded successfully");
        initializeMap();
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

  // 음식점 선택 시 상세보기 페이지로 이동
  const handleRestaurantClick = (restaurant) => {
    const address = `${restaurant.upperAddrName || ''} ${restaurant.middleAddrName || ''} ${restaurant.roadName || ''} ${restaurant.firstBuildNo || ''}`.trim();
    const restaurantName = restaurant.name.replace(/\[.*?\]/g, "").trim(); // []와 그 안의 내용 제거
  
    setSelectedRestaurant({
      id: restaurant.id, // id가 있는지 확인
      name: restaurantName,
      address: address,
      detailBizName: restaurant.detailBizName || "정보 없음",
      frontLat: restaurant.frontLat || 0,
      frontLon: restaurant.frontLon || 0,
      telNo: restaurant.telNo || "전화번호 없음",
      menu: restaurant.menu || "메뉴 정보 없음",
    });
  };
  
  // 찜하기 버튼
  const handleFavorite = (restaurant) => {
    if (!restaurant || !restaurant.id || !restaurant.name || !restaurant.frontLat || !restaurant.frontLon) {
      alert("선택된 음식점 정보가 올바르지 않습니다.");
      console.log("Invalid restaurant object:", restaurant);
      return;
    }

    fetch(`/api/favorites/add?memId=${localStorage.getItem("id")}&restaurantId=${restaurant.id}&name=${restaurant.name}&address=${restaurant.address}&foodType=${restaurant.detailBizName}&latitude=${restaurant.frontLat}&longitude=${restaurant.frontLon}`, {
      method: "POST",               // memId를 동적으로 사용
    })
      .then(() => alert("찜한 음식점에 추가되었습니다!"))
      .catch((error) => console.error("Error adding favorite:", error));
  };

  // 뒤로가기 버튼 클릭 시 리스트로 돌아가기
  const handleBackToList = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      {/* 네이버 지도 표시 */}
      <div id="map" className="map"></div>

      {/* 음식점 목록 표시 및 지역 검색 기능 */}
      <div className="restaurant-list">
        {selectedRestaurant ? (
          <div className="restaurant-details">
            <h3>{selectedRestaurant.name}</h3> {/* 음식점 이름에서 [] 제거된 이름 사용 */}
            <p>주소: {selectedRestaurant.address}</p>
            <p>전화번호: {selectedRestaurant.telNo}</p>
            <p>음식종류: {selectedRestaurant.detailBizName}</p>
            <p>메뉴: {selectedRestaurant.menu}</p>
            <button onClick={() => handleFavorite(selectedRestaurant)}>찜하기</button>
            <button onClick={handleBackToList}>뒤로가기</button>
          </div>
        ) : (
          <>
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
                restaurants
                  .filter((restaurant) => !restaurant.name.includes("주차장")) // 주차장 필터링
                  .map((restaurant) => {
                    const address = `${restaurant.upperAddrName || ''} ${restaurant.middleAddrName || ''} ${restaurant.roadName || ''} ${restaurant.firstBuildNo || ''}`.trim();
                    const restaurantName = restaurant.name.replace(/\[.*?\]/g, "").trim(); // []와 그 안의 내용 제거

                    return (
                      <li key={restaurant.id} onClick={() => handleRestaurantClick(restaurant)}> {/* 클릭 시 상세보기 이동 */}
                        <strong>{restaurantName}</strong>
                        <p>주소: {address}</p>
                        <p>전화번호: {restaurant.telNo}</p>
                      </li>
                    );
                  })
              )}
            </ul>

            {/* 나의 찜 버튼 추가 */}
            <div style={{ marginTop: '20px' }}>
              <Link to={`/favorites/${localStorage.getItem("id")}`}>
                <button style={{ width: '100%', padding: '10px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '4px' }}>
                  나의 찜 목록 보기
                </button>
              </Link>
            </div>

          </>
        )}
      </div>
    </div>
  );
}

export default RestaurantMap;
