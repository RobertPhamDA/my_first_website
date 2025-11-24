import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axiosClient.get('/posts').then((res) => {
      setPosts(res.data);
    }).catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Danh sách bài viết</h1>
      <Link to="/create-post">➕ Viết bài mới</Link>
      <div style={{ display: 'grid', gap: '20px', marginTop: '20px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            {post.image && (
              <img 
                src={`http://localhost:4000/uploads/${post.image}`} 
                alt={post.title} 
                style={{ width: '200px', height: '150px', objectFit: 'cover' }} 
              />
            )}
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}...</p>
            <Link to={`/post/${post.id}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
}