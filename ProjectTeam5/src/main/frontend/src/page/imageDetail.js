import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ImageDetail() {
  const { bnum } = useParams();  // URL 파라미터에서 bnum을 가져옵니다.
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    axios
      .get('/board/detail',  {params: { bnum }})  // bnum을 올바르게 전달
      .then((response) => {
        console.log("Fetched detail:", response.data);
        setDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching detail:", error);
        alert("상세 정보를 가져오는 중 오류가 발생했습니다.");
      });
  }, [bnum]);  // bnum이 변경될 때마다 이펙트가 재실행되도록 의존성 배열에 추가

  if (!detail) {
    return <div>Loading...</div>;  // 데이터를 가져오는 중일 때 표시되는 로딩 메시지
  }

  return (
    <div>
      <h1>{bnum}</h1>
      <h2>{detail.btitle}</h2>
      <img
        src={detail.imgPath}
        alt={detail.btitle}
        style={{ maxWidth: "500px", maxHeight: "500px", objectFit: "cover" }}
      />
      <p>{detail.bcontent}</p>
      <p>{detail.bnum}</p>
    </div>
  );
}

export default ImageDetail;