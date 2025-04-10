import axios from 'axios';
import { Post, Comment } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchPosts = async (): Promise<Post[]> => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch posts');
    }
    throw error;
  }
};

export const fetchPostById = async (id: number): Promise<Post> => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch post');
    }
    throw error;
  }
};

export const createPost = async (post: Omit<Post, 'id' | 'createdAt' | 'comments'>): Promise<Post> => {
  try {
    const response = await api.post('/posts/create', post);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create post');
    }
    throw error;
  }
};

export const updatePost = async (id: number, post: Omit<Post, 'id' | 'createdAt' | 'comments'>): Promise<Post> => {
  try {
    const response = await api.put(`/posts/${id}`, post);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update post');
    }
    throw error;
  }
};

export const deletePost = async (id: number): Promise<void> => {
  try {
    await api.delete(`/posts/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete post');
    }
    throw error;
  }
};

// Comment API calls
export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  try {
    const response = await api.get(`/comments/post/${postId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch comments');
    }
    throw error;
  }
};

export const createComment = async (comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> => {
  try {
    const response = await api.post('/comments', comment);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to create comment');
    }
    throw error;
  }
};

export const updateComment = async (id: number, comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> => {
  try {
    const response = await api.put(`/comments/${id}`, comment);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to update comment');
    }
    throw error;
  }
};

export const deleteComment = async (id: number): Promise<void> => {
  try {
    await api.delete(`/comments/${id}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete comment');
    }
    throw error;
  }
};