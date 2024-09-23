import React, { useEffect, useRef, useState } from 'react';
import MusicList from './MusicList';  // MusicList 가져오기
import './MusicPlayerHandle.css';
import Draggable from 'react-draggable'; 
//npm install react-draggable 
// 인스톨 해야함

function MusicPlayerHandle({ currentSong, isPlaying, onPlayPauseClick, onNextPrevClick, allMusic, currentSongIndex, onSongSelect }) {
  const audioRef = useRef(null);  // audio 요소에 대한 참조를 생성
  const [isRepeating, setIsRepeating] = useState(false);  // 반복 여부 상태 관리
  const [showList, setShowList] = useState(false);  // 리스트 표시 여부 상태 추가

  useEffect(() => {
    if (audioRef.current) {
      const audioElement = audioRef.current;

      audioElement.addEventListener('ended', () => {
        onNextPrevClick(true);  // true 전달로 인해 다음 곡 재생
      });

      if (isPlaying) {
        audioElement.play().catch(error => console.error("Audio play error:", error));  // 재생 중 오류 처리
      } else {
        audioElement.pause();  // 일시정지
      }
    }
  }, [isPlaying, currentSong, onNextPrevClick]);

  const handleRepeatToggle = () => {
    setIsRepeating(prevState => !prevState);  // 반복 상태를 반전시킴
  };

  const toggleList = () => {
    setShowList(prevState => !prevState);  // showList 상태를 반전시켜 리스트 표시 여부 변경
  };

  return (
    <div className="music-player-wrapper">
      {/* 드래그 가능한 영역을 music__inner로 제한 */}
      <Draggable>
        <div className="music__inner">
          {/* 현재 재생 중인 곡 정보 */}
          {/* <div className="music__top">
            <h3>Now Playing</h3>
          </div> */}

          {/* 곡 제목과 아티스트 이름 표시 */}
          <div className="music__song">
            <p>{currentSong.name} - {currentSong.artist}</p>
          </div>

          {/* 오디오 요소 */}
          <audio
            src={`/songs/${currentSong.audio}.mp3`}  // 현재 곡 오디오 파일 경로 설정
            ref={audioRef}  // audioRef를 통해 오디오 요소에 접근
            autoPlay={isPlaying}  // isPlaying 상태에 따라 자동 재생
            controls  // 기본 오디오 컨트롤 표시
            loop={isRepeating}  // isRepeating 상태에 따라 반복 재생 설정
            onError={(e) => console.error("Failed to load audio:", e)}
          >
            Your browser does not support the audio element.  {/* 오디오를 지원하지 않는 브라우저를 위한 메시지 */}
          </audio>

          {/* 음악 재생 컨트롤 버튼 */}
          <div className="music__progress">
            <button onClick={() => onNextPrevClick(false)} className="before-music"/>  {/* 이전 곡 */}
            <button onClick={onPlayPauseClick} className={isPlaying ? "stop-music" : "play-music"} />  {/* 재생/일시정지 */}
            <button onClick={() => onNextPrevClick(true)} className="next-music" />  {/* 다음 곡 */}
            <button onClick={handleRepeatToggle}
              className={isRepeating ? "repeatOne-music" : "repeat-music"} /> {/* 반복 여부에 따라 아이콘 변경 */}
            <button onClick={toggleList} className="list-music"/>  {/* 리스트 토글 버튼 */}
          </div>
        </div>
      </Draggable>

      {/* 오른쪽에 패널처럼 리스트를 표시 */}
      <div className={`music__list-panel ${showList ? 'show' : ''}`}>
        <MusicList
          allMusic={allMusic}  // 전체 곡 목록을 MusicList 컴포넌트에 전달
          onSongSelect={onSongSelect}  // 선택된 곡의 인덱스를 상위로 전달하는 함수
          currentSongIndex={currentSongIndex}  // 현재 재생 중인 곡의 인덱스를 전달
        />
      </div>
    </div>
  );
}

export default MusicPlayerHandle;
