import { Routes, Route, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreatePostPage from './pages/CreatePostPage';
import PostDetailPage from './pages/PostDetailPage'; // <-- Thêm dòng này


function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div>
      {/* Thanh Menu đơn giản */}
      <nav style={{ padding: '10px', background: '#f0f0f0', marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }}>Trang chủ</Link>
        
        {user ? (
          <>
            <span style={{ marginRight: '10px' }}>Xin chào, {user.name}</span>
            <button onClick={logout}>Đăng xuất</button>
          </>
        ) : (
          <Link to="/login">Đăng nhập</Link>
        )}
      </nav>

      {/* Cấu hình các đường dẫn */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;