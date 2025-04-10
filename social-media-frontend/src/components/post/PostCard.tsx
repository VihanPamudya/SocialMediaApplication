import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types';

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="post-card">
      <Link to={`/post/${post.id}`}>
        <h3 style={{ color: post.titleColor || 'black' }}>{post.title}</h3>
        <p>{post.content}</p>
        <div className="post-footer">
          <span>{post.comments.length} Comments</span>
        </div>
      </Link>
    </div>
  );
};

export default PostCard;