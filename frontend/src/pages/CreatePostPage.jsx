import { useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

export default function CreatePostPage() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  // Lấy danh mục khi vào trang
  useEffect(() => {
    axiosClient.get('/categories').then((res) => setCategories(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vì có file ảnh, phải dùng FormData thay vì JSON thường
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('categoryId', categoryId);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axiosClient.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Tạo bài viết thành công!');
      navigate('/');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Tạo bài viết mới</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tiêu đề:</label><br/>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <br/>
        <div>
          <label>Danh mục:</label><br/>
          <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
            <option value="">-- Chọn danh mục --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <br/>
        <div>
          <label>Nội dung:</label><br/>
          <textarea value={content} onChange={e => setContent(e.target.value)} required />
        </div>
        <br/>
        <div>
          <label>Ảnh bìa:</label><br/>
          <input type="file" onChange={e => setImage(e.target.files[0])} />
        </div>
        <br/>
        <button type="submit">Đăng bài</button>
      </form>
    </div>
  );
}