package com.socialmedia.repository;

import com.socialmedia.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPostRepository extends JpaRepository<Post, Long> {
    public List<Post> findAllByOrderByCreatedAtDesc();
}
