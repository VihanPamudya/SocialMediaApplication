import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PostContext } from '../context/PostContext';
import CommentList from '../components/comment/CommentList';
import CommentForm from '../components/comment/CommentForm';
import { Post } from '../types';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById } = useContext(PostContext);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        const numericId = parseInt(id, 10);
        
        if (isNaN(numericId)) {
          setError('Invalid post ID');
          return;
        }
        
        const fetchedPost = await getPostById(numericId);
        if (fetchedPost) {
          setPost(fetchedPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };
  
    fetchPost();
  }, [id, getPostById]);

  if (loading) return <div className="loading">Loading post...</div>;
  if (error || !post) return <div className="error">{error || 'Post not found'}</div>;

  return (
    <div className="post-detail">
      <div className="post-detail-header">
        <h1 style={{ color: post.titleColor || 'black' }}>
          {post.title}
        </h1>
        <button className="close-button" onClick={() => navigate('/')}>
          X
        </button>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
        <div className="comments-section">
          <h3>{post.comments.length} Comments</h3>
          <CommentList comments={post.comments} />
          <CommentForm postId={post.id} />
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;