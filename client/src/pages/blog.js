import React from "react";
import { useState, useEffect } from "react";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  const loadPosts = () => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
        console.log(posts);
      });
  };
  useEffect(() => {
    loadPosts();
  }, []);
  return (
    <>
      <div className="blog">
        <h2>You can write your blog!</h2>
        <ul>
          {posts.map((post) => {
            return (
              <li key={post.id}>
                {" "}
                {post.title} {post.textcontent}
                <img src={post.photourl} alt={post.alttext} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Blog;
