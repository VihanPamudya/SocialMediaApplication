package com.socialmedia.repository;

import com.socialmedia.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICommentRepository extends JpaRepository<Comment, Long> {
    public List<Comment> findByPostIdOrderByCreatedAtDesc (Long postId);
    public void deleteByPostId(Long postId);
}
