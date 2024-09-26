import React, { useState } from "react";
import axios from "axios";

function SignupForm() {
  const [formData, setFormData] = useState({
    memId: "",
    pass: "",
    nickname: "",
    phone: "",
    birthday: "",
    email: "",
    address: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/api/auth/signup", formData)
      .then((response) => {
        alert("회원가입이 완료되었습니다.");
        console.log("Signup successful:", response.data);
      })
      .catch((error) => {
        console.error("Error signing up:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      });
  };

  return (
    <div>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <label>
          아이디:
          <input type="text" name="memId" value={formData.memId} onChange={handleChange} required />
        </label>
        <br />
        <label>
          비밀번호:
          <input type="password" name="pass" value={formData.pass} onChange={handleChange} required />
        </label>
        <br />
        <label>
          닉네임:
          <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} required />
        </label>
        <br />
        <label>
          전화번호:
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <br />
        <label>
          생년월일:
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
        </label>
        <br />
        <label>
          이메일:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          주소:
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </label>
        <br />
        <label>
          성별:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">선택하세요</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
        </label>
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignupForm;