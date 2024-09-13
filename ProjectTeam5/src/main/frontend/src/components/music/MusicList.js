import React, { useState } from "react";
import "./MusicList.css";

function MusicList({ allMusic, onSongSelect, currentSongIndex }) {
  const [searchTerm, setSearchTerm] = useState("");  // 검색어 상태 관리
  const [isSearchVisible, setIsSearchVisible] = useState(false); // 검색 입력 필드의 가시성 상태 관리

  // 검색어에 따라 필터링된 음악 리스트 반환
  const filteredMusic = allMusic.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase()) || // 곡 이름으로 필터링
    song.artist.toLowerCase().includes(searchTerm.toLowerCase())   // 가수 이름으로 필터링
  );

  return (
    <div className= "music-list" >
      <div className="music-search-box">
      <label className="music-list-label">플레이리스트</label>
      {/* 검색 버튼 */}
      <button
          className={isSearchVisible ? "search-music-button-off" : "search-music-button"} 
          onClick={() => setIsSearchVisible(!isSearchVisible)} 
        />
         </div>
      {/* 검색 입력 필드 */}
      {isSearchVisible && (
          <input
           className="music-search-input"
            type="text"
            placeholder="노래 제목 또는 가수 검색"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}  // 검색어 상태 업데이트
          />

      )}
     

      {/* 필터링된 음악 리스트 */}
      <div className={isSearchVisible ? "list-blur" : "music-on"} >
        <ul>
          {filteredMusic.length > 0 ? (
            filteredMusic.map((song, index) => (
              <li
                key={index}
                onClick={() => onSongSelect(allMusic.indexOf(song))}  // 필터링된 곡의 인덱스를 원본 배열에서 찾음
                className={allMusic.indexOf(song) === currentSongIndex ? "active" : ""}
              >
                <p className="musicTItle">{song.name}</p>
                <p className="musicSinger">{song.artist}</p>
              </li>
            ))
          ) : (
            <li className="no-results">No songs found</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default MusicList;
