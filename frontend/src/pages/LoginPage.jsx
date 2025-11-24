import { useState, useContext } from 'react';
import axiosClient from '../api/axiosClient';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '20px' }}>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br/><br/>
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required /><br/><br/>
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
}