import React, { useContext } from 'react';
import PostCard from './PostCard';
import { PostContext } from '../../context/PostContext';

const PostList = () => {
  const { posts, loading, error } = useContext(PostContext);

  if (loading) return <div className="loading">Loading posts...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="post-list">
      {posts.length === 0 ? (
        <p>No posts yet. Be the first to create one!</p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
};

export default PostList;