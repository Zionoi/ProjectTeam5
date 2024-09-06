// src/components/MusicPlayer.js
import React, { useState } from 'react';
import ReactPlayer from 'react-player'; // react-player를 import
import './MusicPlayer.css';

function MusicPlayer() {
  const [playing, setPlaying] = useState(false); // 재생 상태를 관리

  const handlePlayPause = () => {
    setPlaying(!playing); // 재생 및 일시정지 상태 전환
  };

  return (
    <div className="music-player">
      {/* react-player 컴포넌트 */}
      <ReactPlayer
        url="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // 재생할 오디오 파일 URL
        playing={playing} // 재생 상태
        controls={true} // 플레이어 기본 컨트롤 표시
        width="100%" // 플레이어 너비
        height="50px" // 플레이어 높이
      />
      <div className="player-controls">
        <button onClick={handlePlayPause}>
          {playing ? '⏸️ Pause' : '▶️ Play'}
        </button>
      </div>
    </div>
  );
}

export default MusicPlayer;
