import React, { useState } from 'react';
import { useContext } from 'react';
import { PostContext } from '../../context/PostContext';

interface PostFormProps {
  onClose: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ onClose }) => {
  const { addPost } = useContext(PostContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleColor, setTitleColor] = useState('#1976d2');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await addPost({ title, content, titleColor });
      setTitle('');
      setContent('');
      onClose();
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="color-selector">
        <label>Title Color</label>
        <div className="color-options">
          <button
            type="button"
            className={`color-option ${titleColor === '#1976d2' ? 'selected' : ''}`}
            style={{ backgroundColor: '#1976d2' }}
            onClick={() => setTitleColor('#1976d2')}
          />
          <button
            type="button"
            className={`color-option ${titleColor === '#f1c40f' ? 'selected' : ''}`}
            style={{ backgroundColor: '#f1c40f' }}
            onClick={() => setTitleColor('#f1c40f')}
          />
          <button
            type="button"
            className={`color-option ${titleColor === '#e74c3c' ? 'selected' : ''}`}
            style={{ backgroundColor: '#e74c3c' }}
            onClick={() => setTitleColor('#e74c3c')}
          />
        </div>
      </div>
      <button type="submit" className="submit-button">
        Publish
      </button>
    </form>
  );
};

export default PostForm;