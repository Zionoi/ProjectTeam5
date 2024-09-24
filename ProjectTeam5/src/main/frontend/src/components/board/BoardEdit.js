import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function BoardEdit({ hostId, setHostId }) {
  const { bNum } = useParams(); // URL 파라미터에서 bNum을 가져옴
  const navigate = useNavigate();
  const [selectedImages, setSelectedImages] = useState([]);
  const [existingImagesName, setExistingImagesName] = useState([]);
  const [existingImagesPath, setExistingImagesPath] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]); // 삭제된 이미지를 추적하는 상태
  const [bTitle, setBTitle] = useState('');
  const [bContent, setBContent] = useState('');

  useEffect(() => {
    // 기존 게시물 정보를 불러옴
    axios.get(`/board/detail`, { params: { bNum } })
      .then(response => {
        const { btitle, bcontent, imgPath, imgName } = response.data;
        setBTitle(btitle);
        setBContent(bcontent);
        setExistingImagesName(imgName); // 기존 이미지 이름을 저장
        setExistingImagesPath(imgPath); // 기존 이미지 경로를 저장
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
      // 삭제된 기존 이미지를 추적하여 삭제 리스트에 추가
      setDeletedImages(prevDeleted => [...prevDeleted, existingImagesName[index]]);
      setExistingImagesName(prevImages => prevImages.filter((_, i) => i !== index));
      setExistingImagesPath(prevImages => prevImages.filter((_, i) => i !== index));
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
    selectedImages.forEach((image) => {
      formData.append(`image`, image.file);
    });

    // 기존 이미지를 FormData에 포함 (이름, 경로만 보냄)
    existingImagesPath.forEach((image) => {
      formData.append(`existingImagePath`, image);
    });
    existingImagesName.forEach((image) => {
      formData.append(`existingImageName`, image);
    });

    // 삭제된 이미지를 추가
    deletedImages.forEach((image) => {
      formData.append(`deletedImageName`, image); // 삭제된 이미지 이름을 서버로 보냄
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
      <div className="BoardUpload-box">
      <h6 className="BUTitle">이미지 업로드</h6>
      <div className="B-ImgPrevBox">
      <div className="BoardUpload-Imgbox">
      {/* 기존 이미지 출력 및 삭제 버튼 */}
      {existingImagesName.length > 0 && (
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {existingImagesName.map((img, index) => (
            <div key={index} style={{}}>
              <img
                src={existingImagesPath[index]}
                alt={`Existing Image ${index}`}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <button
              className="board-ImgD"
                type="button"
                onClick={() => handleRemoveImage(index, true)}
                style={{
                  display: "flex", flexDirection: "row", gap: "10px"
                }}/>
            </div>
          ))}
        </div>
      )}

      {/* 새로 선택된 이미지 출력 및 삭제 버튼 */}
      {selectedImages.length > 0 && (
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {selectedImages.map((image, index) => (
            <div key={index} style={{  }}>
              <img
                src={image.preview}
                alt={`New Image ${index}`}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <button
                className="board-ImgD"
                type="button"
                onClick={() => handleRemoveImage(index)}
                style={{
                  display: "flex", flexDirection: "row", gap: "10px"
                }}/>
            </div>
          ))}
        </div>
      )}
      </div>
      <div>
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
      </div>
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
      <button type="submit" style={{ marginTop: "20px" }} className="BUB">
        수정 완료
      </button>
      </div>
    </form>
  );
}

export default BoardEdit;
