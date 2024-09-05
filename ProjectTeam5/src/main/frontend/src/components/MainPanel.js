import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


function MainPanel({ onLogout }) { // onLogout props 추가
    const navigate = useNavigate();
  
    const handleLogout = () => {
      onLogout(); // 부모 컴포넌트의 로그아웃 핸들러 호출
      navigate('/login'); // 로그인 페이지로 리다이렉트
    };
  
    return (
      <div style={{ display: 'flex' }}>
        <div className="left-panel">
        </div>
        <div className="center-panel">
          <Routes>
            <Route path="/" element={<Home />} />
           
          </Routes>
        </div>
        <div className="right-panel">
          <nav>
            <Link to="/"><button type="button" className="btn btn-outline-primary">Home</button></Link><br/>
          </nav>
          <button onClick={handleLogout} className="btn btn-outline-danger">로그아웃</button>
        </div>
      </div>
    );
  }
  
  export default MainPanel;
  