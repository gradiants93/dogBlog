import { useState, useEffect } from "react";
import Form from "../components/form";

function EditPosts() {
  //Original state in the parent component so the page will now when to render new students
  const [posts, setPosts] = useState([]);

  // New state to check if we are working on editing a student
  const [editingPostId, setEditingPostId] = useState(null);

  const loadPosts = () => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((posts) => {
        setPosts(posts);
      });
  };

  // Use effect hook to render the students in the app. This will change any time that our initial state change
  useEffect(() => {
    loadPosts();
  }, []);

  // A function to handle the Delete funtionallity
  const onDelete = (post) => {
    return fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
    }).then((response) => {
      //console.log(response);
      if (response.ok) {
        loadPosts();
      }
    });
  };

  // A function to handle the Add a nwe Student funtionallity
  const addPost = (newPost) => {
    //console.log(newStudent);
    //postStudent(newStudent);
    setPosts((posts) => [...posts, newPost]);
  };

  // A function to update the list of students when the user edit a student
  const updatePost = (savedPost) => {
    setPosts((posts) => {
      const newPosts = [];
      for (let post of posts) {
        if (post.id === savedPost.id) {
          newPosts.push(savedPost);
        } else {
          newPosts.push(post);
        }
      }
      return newPosts;
    });

    // This line is just to close the form!
    setEditingPostId(null);
  };

  //A function to grab the student.id of the student that we want to edit
  const onEdit = (post) => {
    const editingId = post.id;
    setEditingPostId(editingId);
  };

  return (
    <div
      className="posts"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h2> Posts </h2>
      <ul>
        {posts.map((post) => {
          if (post.id === editingPostId) {
            return <Form initialPost={post} savePost={updatePost} />;
          } else {
            return (
              <li key={post.id}>
                {" "}
                {post.title}
                <button
                  type="button"
                  onClick={() => {
                    onDelete(post);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onEdit(post);
                  }}
                >
                  Edit
                </button>
              </li>
            );
          }
        })}
      </ul>
      <Form savePost={addPost} />
    </div>
  );
}

export default EditPosts;
