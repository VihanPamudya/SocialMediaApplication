package com.socialmedia.service;

import com.socialmedia.dto.request.PostRequest;
import com.socialmedia.dto.response.PostResponse;
import com.socialmedia.model.Post;

import java.util.List;

public interface IPostService {
    public List<PostResponse> getAllPosts();
    public PostResponse getPostById(Long id);
    public PostResponse createPost(PostRequest postRequest);
    public PostResponse updatePost(Long id, PostRequest postRequest);
    public void deletePost(Long id);
    public PostResponse convertPostToPostResponse(Post post);
}
