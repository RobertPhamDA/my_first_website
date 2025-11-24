import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axiosClient from '../api/axiosClient';
import { AuthContext } from '../context/AuthContext';

export default function PostDetailPage() {
  const { id } = useParams(); // Lấy ID từ URL (ví dụ: /post/5)
  const { user } = useContext(AuthContext); // Lấy thông tin user đang đăng nhập
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  // 1. Tải thông tin bài viết và bình luận khi vào trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Gọi song song 2 API cho nhanh
        const [postRes, commentRes] = await Promise.all([
          axiosClient.get(`/posts/${id}`),
          axiosClient.get(`/comments/post/${id}`)
        ]);
        
        setPost(postRes.data);
        setComments(commentRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // 2. Xử lý gửi bình luận
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // Gửi comment lên server
      const res = await axiosClient.post('/comments', {
        content: newComment,
        postId: parseInt(id) // Đảm bảo ID là số
      });

      // Thêm comment mới vào danh sách hiện tại (để hiện ngay lập tức)
      // Lưu ý: Backend cần trả về comment kèm thông tin user, 
      // nếu chưa có user thì ta fake tạm để hiện lên giao diện cho mượt
      const savedComment = res.data; 
      const commentToDisplay = {
        ...savedComment,
        user: { name: user.name } // Gắn tạm tên người đang đăng nhập vào
      };

      setComments([...comments, commentToDisplay]);
      setNewComment(''); // Xóa ô nhập
    } catch (error) {
      alert('Lỗi gửi bình luận: ' + error.message);
    }
  };

  if (loading) return <div style={{padding: '20px'}}>Đang tải...</div>;
  if (!post) return <div style={{padding: '20px'}}>Không tìm thấy bài viết!</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', color: '#fff' }}>
      {/* --- PHẦN BÀI VIẾT --- */}
      <Link to="/" style={{ color: '#aaa', textDecoration: 'none' }}>← Quay lại trang chủ</Link>
      
      <h1 style={{ marginTop: '10px', fontSize: '2rem' }}>{post.title}</h1>
      
      <div style={{ color: '#888', marginBottom: '20px', fontSize: '0.9rem' }}>
        Đăng ngày: {new Date(post.createdAt).toLocaleDateString('vi-VN')} 
        {post.author ? ` - Bởi: ${post.author.name}` : ''}
      </div>

      {post.image && (
        <img 
          src={`http://localhost:4000/uploads/${post.image}`} 
          alt={post.title} 
          style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }}
        />
      )}

      <div style={{ lineHeight: '1.6', fontSize: '1.1rem', whiteSpace: 'pre-wrap' }}>
        {post.content}
      </div>

      <hr style={{ margin: '40px 0', borderColor: '#444' }} />

      {/* --- PHẦN BÌNH LUẬN --- */}
      <h3>Bình luận ({comments.length})</h3>

      {/* Form nhập bình luận */}
      {user ? (
        <form onSubmit={handleSubmitComment} style={{ marginBottom: '30px' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Viết bình luận của bạn..."
            style={{ 
              width: '100%', padding: '10px', borderRadius: '5px', 
              border: '1px solid #444', backgroundColor: '#222', color: '#fff', minHeight: '80px' 
            }}
            required
          />
          <button 
            type="submit" 
            style={{ 
              marginTop: '10px', padding: '8px 20px', backgroundColor: '#007bff', 
              color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' 
            }}
          >
            Gửi bình luận
          </button>
        </form>
      ) : (
        <p style={{ color: '#aaa', marginBottom: '20px' }}>
          Vui lòng <Link to="/login" style={{ color: '#007bff' }}>đăng nhập</Link> để bình luận.
        </p>
      )}

      {/* Danh sách bình luận cũ */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {comments.map((comment) => (
          <div key={comment.id} style={{ background: '#1a1a1a', padding: '15px', borderRadius: '8px', border: '1px solid #333' }}>
            <strong style={{ color: '#00bfff' }}>{comment.user?.name || 'Người dùng ẩn danh'}</strong>
            <span style={{ color: '#666', fontSize: '0.8rem', marginLeft: '10px' }}>
               {new Date(comment.createdAt).toLocaleString('vi-VN')}
            </span>
            <p style={{ marginTop: '5px', color: '#ddd' }}>{comment.content}</p>
          </div>
        ))}
        {comments.length === 0 && <p style={{ color: '#666' }}>Chưa có bình luận nào.</p>}
      </div>
    </div>
  );
}