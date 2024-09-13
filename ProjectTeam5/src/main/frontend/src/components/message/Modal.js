import React, { useState } from 'react';
import './Modal.css'; // 스타일 파일
import WriteMessage from '../message/WriteMessage';
import Inbox from '../message/Inbox';
import MessageDetail from '../message/MessageDetail';

const Modal = ({ isOpen, onClose, content, setContent, selectedMessage, setSelectedMessage, recipient, fetchMessages }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (!isOpen) return null; // 모달이 열리지 않으면 null 반환

  const renderContent = () => {
    switch (content) {
      case 'writeMessage':
        return <WriteMessage recipient={recipient} />;
      case 'inbox':
        return <Inbox setContent={setContent} setSelectedMessage={setSelectedMessage} />; // setSelectedMessage 전달
      case 'messageDetail':
        return <MessageDetail message={selectedMessage} onClose={onClose} setContent={setContent} fetchMessages={fetchMessages} />;
      default:
        return null;
    }
  };

  return (
    <div className="modal-overlay" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <div
        className="modal-content"
        onMouseDown={handleMouseDown}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      >
        <button className="modal-close" onClick={onClose}>X</button>
        {renderContent()}
      </div>
    </div>
  );
};

export default Modal;
