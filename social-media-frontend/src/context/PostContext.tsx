import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Post, Comment } from '../types';
import { fetchPosts, createPost, createComment, fetchPostById, deletePost } from '../services/api';

interface PostContextType {
  posts: Post[];
  loading: boolean;
  error: string | null;
  addPost: (post: Omit<Post, 'id' | 'createdAt' | 'comments'>) => Promise<Post>;
  addComment: (comment: Omit<Comment, 'id' | 'createdAt'>) => Promise<void>;
  getPostById: (id: number) => Promise<Post | undefined>;
  deletePostById: (id: number) => Promise<void>;
}

export const PostContext = createContext<PostContextType>({
  posts: [],
  loading: false,
  error: null,
  addPost: async () => {
    throw new Error('Not implemented');
  },
  addComment: async () => {
    throw new Error('Not implemented');
  },
  getPostById: async () => {
    return undefined;
  },
  deletePostById: async () => {
    return undefined;
  },
});

interface PostProviderProps {
  children: ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        setError('Failed to load posts');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const addPost = async (newPost: Omit<Post, 'id' | 'createdAt' | 'comments'>): Promise<Post> => {
    try {
      const createdPost = await createPost(newPost);
      setPosts((prevPosts) => [createdPost, ...prevPosts]);
      return createdPost;
    } catch (error) {
      setError('Failed to create post');
      throw error;
    }
  };

  const addComment = async (newComment: Omit<Comment, 'id' | 'createdAt'>): Promise<void> => {
    try {
      const createdComment = await createComment(newComment);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === newComment.postId
            ? { ...post, comments: [...post.comments, createdComment] }
            : post
        )
      );
    } catch (error) {
      setError('Failed to create comment');
      throw error;
    }
  };

  const getPostById = async (id: number): Promise<Post | undefined> => {
    try {
      const existingPost = posts.find((post) => post.id === id);
      if (existingPost){
        return existingPost;
      } 
      const post = await fetchPostById(id);
      return post;
    } catch (error) {
      setError('Failed to get post');
      throw error;
    }
  };

  const deletePostById = async (postId: number): Promise<void> => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      setError('Failed to delete post');
      throw error;
    }
  };

  return (
    <PostContext.Provider value={{ posts, loading, error, addPost, addComment, getPostById, deletePostById }}>
    {children}
  </PostContext.Provider>
  );
};