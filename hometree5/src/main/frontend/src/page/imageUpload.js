import { useState } from "react";

function ImageUpload() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [bTitle, setBTitle] = useState('');
    const [bContent, setBContent] = useState('');
  
    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage({ file, preview: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handleRemoveImage = () => {
      setSelectedImage(null);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append("bTitle", bTitle);
      formData.append("bContent", bContent);
      if (selectedImage) {
        formData.append("image", selectedImage.file);
      }
  
      try {
        const response = await fetch("/board/write", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          alert("파일을 보내는데 성공했습니다");
          setSelectedImage(null);
          setBTitle('');
          setBContent('');
        } else {
          alert("파일을 보내는데 실패했습니다");
        }
      } catch (error) {
        console.error("Error uploading data:", error);
        alert("An error occurred while uploading the data.");
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Title:
            <input 
              type="text" 
              value={bTitle} 
              onChange={(e) => setBTitle(e.target.value)} 
            />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea 
              value={bContent} 
              onChange={(e) => setBContent(e.target.value)} 
            />
          </label>
        </div>
        <div>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>
        {selectedImage && (
          <div style={{ position: "relative", marginTop: "20px" }}>
            <img
              src={selectedImage.preview}
              alt="Selected"
              style={{ maxWidth: "150px", maxHeight: "150px", objectFit: "cover" }}
            />
            <button
              type="button"
              onClick={handleRemoveImage}
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
        )}
        <button type="submit" style={{ marginTop: "20px" }}>
          Upload
        </button>
      </form>
    );
}

export default ImageUpload;