import { useState, useContext } from 'react';
import axiosClient from '../api/axiosClient';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'; // <--- 1. Thêm Import Link

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post('/auth/login', { email, password });
      // Backend trả về: { token, user }
      login(res.data.user, res.data.token);
      alert('Đăng nhập thành công!');
      navigate('/'); // Chuyển về trang chủ
    } catch (err) {
      alert('Lỗi đăng nhập: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Đăng Nhập</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ padding: '10px' }}
        />
        
        <input 
            type="password" 
            placeholder="Mật khẩu" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ padding: '10px' }}
        />
        
        <button 
            type="submit" 
            style={{ padding: '10px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' }}
        >
            Đăng nhập
        </button>
      </form>

      {/* <--- 2. Thêm phần link sang trang Đăng Ký ở đây */}
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <span style={{ color: '#888' }}>Chưa có tài khoản? </span>
        <Link to="/register" style={{ color: '#00bfff', textDecoration: 'none', fontWeight: 'bold' }}>
            Đăng ký ngay
        </Link>
      </div>

    </div>
  );
}