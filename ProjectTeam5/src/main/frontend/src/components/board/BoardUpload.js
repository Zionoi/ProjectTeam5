import { useState } from "react";

function BoardUpload({hostId, setHostId}) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [bTitle, setBTitle] = useState('');
  const [bContent, setBContent] = useState('');

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
        setBContent('');
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
      <div>
        <label>
          제목:
          <input 
            type="text" 
            value={bTitle} 
            onChange={(e) => setBTitle(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          내용:
          <textarea 
            value={bContent} 
            onChange={(e) => setBContent(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <input 
          type="file" 
          accept="image/*" 
          multiple  // 다중 파일 선택 허용
          onChange={handleImageChange} 
        />
      </div>
      {selectedImages.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {selectedImages.map((image, index) => (
            <div key={index} style={{ position: "relative", margin: "10px" }}>
              <img
                src={image.preview}
                alt={`Selected ${index}`}
                style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                style={{
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "50%",
                  cursor: "pointer",
                }}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
      <button type="submit" style={{ marginTop: "20px" }}>
        업로드
      </button>
    </form>
  );
}

export default BoardUpload;
