import React from "react";
import "./MusicList.css";

// MusicList 컴포넌트는 음악 리스트를 표시하고, 곡을 선택할 수 있는 기능을 제공
function MusicList({ allMusic, onSongSelect, currentSongIndex }) {
  return (
    <div className="music-list">
      <ul>
        {/* allMusic 배열을 순회하면서 각 곡을 리스트 아이템으로 렌더링 */}
        {allMusic.map((song, index) => (
          <li
            key={index}  // 각 리스트 아이템에 고유한 키를 부여 (React가 요소를 구분할 수 있도록 함)
            onClick={() => onSongSelect(index)}  // 클릭 시 해당 곡의 인덱스를 onSongSelect 함수로 전달
            className={index === currentSongIndex ? "active" : ""}  // 현재 재생 중인 곡은 "active" 클래스를 추가
          >
            {/* 곡 이름과 가수 이름을 표시 */}
            <p>{song.name} - {song.artist}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MusicList;
