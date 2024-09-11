// src/components/StickerSection.js
import React from 'react';
import './TopComments.css';

function TopCommnets() {
  return (
    <div>
      {!isEditing ? (
        <div>
          <h3 className="homgepage-Co">{greeting || '사용자 홈페이지 인삿말'}</h3>
          <button className="homgepage-Co-edit" onClick={toggleEdit}>수정</button>
        </div>
      ) : (
        <div>
          <input 
            value={newGreeting} 
            onChange={handleInputChange} 
            className="homgepage-Co-input"
          />
          <button className="homgepage-Co-edit" onClick={saveGreeting}>저장</button>
        </div>
      )}
    </div>
  );
}

export default TopCommnets;