// Diary.js
import React from 'react';
import MyCalendar from './MyCalendar';
function Diary({hostId}) {
  return (
    <div>
      <h3 className="diary-title">다이어리</h3>
      <MyCalendar hostId={hostId}/>
    </div>
  );
}

export default Diary;
