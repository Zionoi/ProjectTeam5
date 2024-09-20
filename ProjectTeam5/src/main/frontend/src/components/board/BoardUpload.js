import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './BoardUpload.css';

function BoardUpload({hostId, setHostId}) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [bTitle, setBTitle] = useState('');
  const [bContent, setBContent] = useState('');
  const navigate = useNavigate();

  // 파일 선택 시 처리
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files); // 선택된 파일들을 배열로 변환
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)  // 이미지 미리보기 URL 생성
    }));
    setSelectedImages(prevImages => [...prevImages, ...newImages]); // 선택된 이미지 추가
  };

  // 이미지 삭제 처리
  const handleRemoveImage = (index) => {
    setSelectedImages(prevImages => 
      prevImages.filter((_, i) => i !== index)  // 선택된 이미지 중 해당 인덱스 제외
    );
  };

  // 폼 제출 처리
  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 제출 동작 방지

    const formData = new FormData();
    formData.append("bTitle", bTitle);
    formData.append("bContent", bContent);
    formData.append("memId", hostId);
    
    // 각 이미지를 FormData에 추가
    selectedImages.forEach((image, index) => {
      formData.append(`image`, image.file);
    });

    try {
      const response = await fetch("/board/write", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("파일 업로드 성공");
        setSelectedImages([]);  // 선택된 이미지 초기화
        setBTitle('');
        setBContent('')
        navigate(`/bulletin-board/${ hostId }`);  // 게시판 이동
      } else {
        alert("파일 업로드 실패");
      }
    } catch (error) {
      console.error("데이터 업로드 오류:", error);
      alert("데이터 업로드 중 오류가 발생했습니다.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="BoardUpload-box">
        <h6 className="BUTitle">이미지 업로드</h6>
        <div className="B-ImgPrevBox">
            <div className="BoardUpload-Imgbox">
            {selectedImages.length > 0 && (
          <div style={{ display: "flex",flexDirection: "row", gap:"10px" }}>
            {selectedImages.map((image, index) => (
              <div key={index} style={{}}>
                <img
                className="board-Imgs"
                  src={image.preview}
                  alt={`Selected ${index}`}
                  style={{ width: "150px", height: "150px", objectFit: "cover"}}
                />
                <button
                  className="board-ImgD"
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  style={{ display: "flex",flexDirection: "row", gap:"10px" }}/>
              </div>
            ))}
          </div>
        )}
      </div>
      <label className="B-ImgBox">
              <input
                className="board-uploadImgBox"
                type="file" 
                accept="image/*" 
                multiple  // 다중 파일 선택 허용
                onChange={handleImageChange} 
              />+
            </label>
      </div>
      <div className="BoardContentBox">
          <div>
            <input
              className="BoardUploadTitle"
              placeholder="제목을 입력하세요."
              type="text" 
              value={bTitle} 
              onChange={(e) => setBTitle(e.target.value)} 
            />
          </div>
        <div>
            <textarea
              className="BoardUploadContent"
              placeholder="나의 이야기를 적어보세요."
              value={bContent} 
              onChange={(e) => setBContent(e.target.value)} 
            />
        </div>
        <button type="submit">
          돌아가기
        </button>
        <button type="submit"
        className="BUB">
          업로드
        </button>
        </div>
        </div>
    </form>
  );
}

export default BoardUpload;
