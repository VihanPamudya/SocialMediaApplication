package com.socialmedia.service;

import com.socialmedia.dto.request.CommentRequest;
import com.socialmedia.dto.response.CommentResponse;
import com.socialmedia.model.Comment;

import java.util.List;

public interface ICommentService {
    public List<CommentResponse> getCommentsByPostId(Long postId);
    public CommentResponse getCommentById(Long id);
    public CommentResponse createComment(CommentRequest commentRequest);
    public CommentResponse updateComment(Long id, CommentRequest commentRequest);
    public void deleteComment(Long id);
    public CommentResponse convertCommentToCommentResponse(Comment comment);
}
