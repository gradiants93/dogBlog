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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="blog"
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "540px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>You can write your blog!</h2>
        <h4>
          <small>RECENT POSTS</small>
        </h4>
        {posts.map((post) => {
          return (
            <article>
              <hr></hr>
              <h2>{post.tite}</h2>
              <h5>
                <span class="glyphicon glyphicon-time"></span> Posted on{" "}
                {post.date}{" "}
                <span class="label label-success">{post.category}</span>
              </h5>
              <div className="image">
                <img
                  src={post.photourl}
                  alt={post.alttext}
                  sizes="(max-width: 320px) 100vw, 320px"
                />
              </div>
              <div>
                <br />
                <p>{post.textcontent}</p>
              </div>
              <hr></hr>
            </article>
          );
        })}
      </div>
    </div>
  );
};

export default Blog;
