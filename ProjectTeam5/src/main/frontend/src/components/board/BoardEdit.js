import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BoardEdit({ hostId, setHostId }) {
  const { bNum } = useParams(); // URL 파라미터에서 bNum을 가져옴
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [bTitle, setBTitle] = useState('');
  const [bContent, setBContent] = useState('');

  useEffect(() => {
    // 기존 게시물 정보를 불러옴
    axios.get(`/board/detail`, { params: { bNum } })
      .then(response => {
        const { btitle, bcontent, imgPath } = response.data;
        setBTitle(btitle);
        setBContent(bcontent);
        setExistingImages(imgPath); // 기존 이미지 경로를 저장
      })
      .catch(error => {
        console.error('게시물 정보를 불러오는 중 오류가 발생했습니다:', error);
        alert('게시물 정보를 불러오는 중 오류가 발생했습니다.');
      });
  }, [bNum]);

  // 파일 선택 시 처리
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file) // 이미지 미리보기 URL 생성
    }));
    setSelectedImages(prevImages => [...prevImages, ...newImages]); // 선택된 이미지 추가
  };

  // 이미지 삭제 처리
  const handleRemoveImage = (index, isExisting = false) => {
    if (isExisting) {
      setExistingImages(prevImages => prevImages.filter((_, i) => i !== index));
    } else {
      setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    }
  };

  // 폼 제출 처리
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("bTitle", bTitle);
    formData.append("bContent", bContent);
    formData.append("bNum", bNum); // 게시물 번호 추가
    formData.append("memId", hostId);

    // 새로 추가된 이미지를 FormData에 추가
    selectedImages.forEach((image, index) => {
      formData.append(image, image.file);
    });

    // 기존 이미지를 FormData에 포함 (경로만 보냄)
    existingImages.forEach((image, index) => {
      formData.append(`existingImage`, image);
    });

    try {
      const response = await fetch("/board/update", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("게시물이 수정되었습니다.");
        navigate(`/boardDetail/${bNum}/${localStorage.getItem("id")}`);
      } else {
        alert("게시물 수정 중 오류가 발생했습니다.");
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

      {/* 기존 이미지 출력 및 삭제 버튼 */}
      {existingImages.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {existingImages.map((img, index) => (
            <div key={index} style={{ position: "relative", margin: "10px" }}>
              <img
                src={img}
                alt={`Existing Image ${index}`}
                style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index, true)}
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

      {/* 새로 선택된 이미지 출력 및 삭제 버튼 */}
      {selectedImages.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
          {selectedImages.map((image, index) => (
            <div key={index} style={{ position: "relative", margin: "10px" }}>
              <img
                src={image.preview}
                alt={`New Image ${index}`}
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
        수정 완료
      </button>
    </form>
  );
}

export default BoardEdit;
