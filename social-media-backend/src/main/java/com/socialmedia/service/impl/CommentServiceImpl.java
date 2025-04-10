package com.socialmedia.service.impl;

import com.socialmedia.dto.request.CommentRequest;
import com.socialmedia.dto.response.CommentResponse;
import com.socialmedia.model.Comment;
import com.socialmedia.model.Post;
import com.socialmedia.repository.ICommentRepository;
import com.socialmedia.repository.IPostRepository;
import com.socialmedia.service.ICommentService;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements ICommentService {

    private final ICommentRepository commentRepository;
    private final IPostRepository postRepository;

    @Autowired
    public CommentServiceImpl(ICommentRepository commentRepository, IPostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @Override
    public List<CommentResponse> getCommentsByPostId(Long postId) {
        if (!postRepository.existsById(postId)) {
            throw new EntityNotFoundException("Post not found with id: " + postId);
        }

        return commentRepository.findByPostIdOrderByCreatedAtDesc(postId)
                .stream()
                .map(this::convertCommentToCommentResponse)
                .collect(Collectors.toList());
    }

    @Override
    public CommentResponse getCommentById(Long id) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found with id: " + id));
        return convertCommentToCommentResponse(comment);
    }

    @Override
    @Transactional
    public CommentResponse createComment(CommentRequest commentRequest) {
        Post post = postRepository.findById(commentRequest.getPostId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + commentRequest.getPostId()));

        Comment comment = new Comment();
        BeanUtils.copyProperties(commentRequest, comment);
        comment.setPost(post);

        Comment savedComment = commentRepository.save(comment);
        return convertCommentToCommentResponse(savedComment);
    }

    @Override
    @Transactional
    public CommentResponse updateComment(Long id, CommentRequest commentRequest) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Comment not found with id: " + id));

        Post post = postRepository.findById(commentRequest.getPostId())
                .orElseThrow(() -> new EntityNotFoundException("Post not found with id: " + commentRequest.getPostId()));

        BeanUtils.copyProperties(commentRequest, comment);
        comment.setPost(post);

        Comment updatedComment = commentRepository.save(comment);
        return convertCommentToCommentResponse(updatedComment);
    }

    @Override
    @Transactional
    public void deleteComment(Long id) {
        if (!commentRepository.existsById(id)) {
            throw new EntityNotFoundException("Comment not found with id: " + id);
        }
        commentRepository.deleteById(id);
    }

    @Override
    public CommentResponse convertCommentToCommentResponse(Comment comment) {
        CommentResponse commentResponse = new CommentResponse();
        BeanUtils.copyProperties(comment, commentResponse);
        commentResponse.setPostId(comment.getPost().getId());
        return commentResponse;
    }
}
