import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Post } from '../../types';
import { PostContext } from '../../context/PostContext';

interface PostCardProps {
  post: Post;
}



const PostCard = ({ post }: PostCardProps) => {
  const { deletePostById } = useContext(PostContext);
  const navigate = useNavigate();
  
  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostById(post.id);
        if (window.location.pathname === `/post/${post.id}`) {
          navigate('/');
        }
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };
  return (
    <div className="post-card">
      <Link to={`/post/${post.id}`}>
        <h3 style={{ color: post.titleColor || 'black' }}>{post.title}</h3>
        <p>{post.content}</p>
        <div className="post-footer">
          <span>{post.comments.length} Comments</span>
        </div>
      </Link>
      <button 
        onClick={handleDelete}
        className="delete-button"
        aria-label="Delete post"
      >
        Delete
      </button>
    </div>
  );
};

export default PostCard;