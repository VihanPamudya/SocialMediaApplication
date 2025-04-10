import React, { useState } from 'react';
import PostList from '../components/post/PostList';
import Modal from '../components/common/Modal';
import PostForm from '../components/post/PostForm';

const HomePage = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  return (
    <div className="home-page">
      <button 
        className="create-post-button" 
        onClick={() => setIsPostModalOpen(true)}
      >
        Create New Post
      </button>
      <PostList />

      <Modal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        title="Create Post"
      >
        <PostForm onClose={() => setIsPostModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HomePage;