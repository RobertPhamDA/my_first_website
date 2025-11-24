import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API đăng ký của backend
      await axiosClient.post('/auth/register', {
        name,
        email,
        password
      });
      
      alert('Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login'); // Chuyển hướng sang trang đăng nhập
    } catch (err) {
      // Hiển thị lỗi từ backend trả về (ví dụ: Email đã tồn tại)
      alert('Lỗi đăng ký: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Đăng Ký Tài Khoản</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label>Họ và tên:</label>
          <input 
            type="text" 
            placeholder="Nhập tên hiển thị" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Email:</label>
          <input 
            type="email" 
            placeholder="Nhập email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label>Mật khẩu:</label>
          <input 
            type="password" 
            placeholder="Nhập mật khẩu" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Đăng Ký
        </button>
      </form>

      <p style={{ marginTop: '15px' }}>
        Đã có tài khoản? <Link to="/login" style={{ color: '#007bff' }}>Đăng nhập ngay</Link>
      </p>
    </div>
  );
}