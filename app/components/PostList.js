import "./css/_PostList.css";

import React, { useEffect } from "react";
import { fetchPosts, loadPosts } from "../actions/posts";

import { connect } from "react-redux";

const PostList = ({ error, fetchPosts, loadPosts, pages, posts }) => {
  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const getPosts = (page) => {
    fetchPosts({ page });
  };

  if (error) {
    return (
      <div className="postList">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="postList">
      <div className="posts">
        {posts.map((post, i) => {
          const date = new Date(post.created).toLocaleDateString("en-US");
          return (
            <div className="post" key={i}>
              <div className="votes">{post.votes}</div>
              <div className="words">
                <div className="title">{post.title}</div>
                <div className="details">{post.details}</div>
              </div>
              <div className="dateWrapper">
                <div className="date">{date}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pages">
        {[...Array(pages).keys()].map((i) => {
          const page = i + 1;
          return (
            <div className="page" key={i} onClick={() => getPosts(page)}>
              {page}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default connect(
  ({ posts }) => ({
    error: posts.error,
    pages: posts.pages,
    posts: posts.posts,
  }),
  (dispatch) => ({
    fetchPosts: (params) => {
      return dispatch(fetchPosts(params));
    },
    loadPosts: () => dispatch(loadPosts()),
  })
)(PostList);
