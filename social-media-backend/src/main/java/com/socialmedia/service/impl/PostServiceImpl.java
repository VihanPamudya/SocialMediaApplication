package com.socialmedia.service.impl;

import com.socialmedia.dto.request.PostRequest;
import com.socialmedia.dto.response.CommentResponse;
import com.socialmedia.dto.response.PostResponse;
import com.socialmedia.model.Comment;
import com.socialmedia.model.Post;
import com.socialmedia.repository.ICommentRepository;
import com.socialmedia.repository.IPostRepository;
import com.socialmedia.service.IPostService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements IPostService {

    private final IPostRepository postRepository;
    private final ICommentRepository commentRepository;

    @Autowired
    public PostServiceImpl(IPostRepository postRepository, ICommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    @Override
    public List<PostResponse> getAllPosts() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertPostToPostResponse)
                .collect(Collectors.toList());
    }

    @Override
    public PostResponse getPostById(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with ID: " + id));
        return convertPostToPostResponse(post);
    }

    @Override
    @Transactional
    public PostResponse createPost(PostRequest postRequest) {
        Post post = new Post();
        BeanUtils.copyProperties(postRequest, post);

        Post savedPost = postRepository.save(post);
        return convertPostToPostResponse(savedPost);
    }

    @Override
    public PostResponse updatePost(Long id, PostRequest postRequest) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + id));

        BeanUtils.copyProperties(postRequest, post);
        Post updatedPost = postRepository.save(post);
        return convertPostToPostResponse(updatedPost);
    }

    @Override
    @Transactional
    public void deletePost(Long id) {
        if (!postRepository.existsById(id)) {
            throw new EntityNotFoundException("Post not found with id: " + id);
        }
        postRepository.deleteById(id);
    }

    @Override
    public PostResponse convertPostToPostResponse(Post post) {
        PostResponse postResponse = new PostResponse();
        BeanUtils.copyProperties(post, postResponse);

        List<CommentResponse> commentResponses = post.getComments().stream()
                .map(this::convertCommentToCommentResponse)
                .collect(Collectors.toList());

        postResponse.setComments(commentResponses);
        return postResponse;
    }

    private CommentResponse convertCommentToCommentResponse(Comment comment) {
        CommentResponse commentResponse = new CommentResponse();
        BeanUtils.copyProperties(comment, commentResponse);
        commentResponse.setPostId(comment.getPost().getId());
        return commentResponse;
    }
}
