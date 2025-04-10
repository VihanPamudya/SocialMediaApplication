import React, { useState, useContext } from 'react';
import { PostContext } from '../../context/PostContext';

interface CommentFormProps {
  postId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [content, setContent] = useState('');
  const { addComment } = useContext(PostContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addComment({ content, postId });
      setContent('');
    } catch (error) {
      console.error('Failed to create comment:', error);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="New Comment Text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className="comment-button">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;