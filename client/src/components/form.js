import { useState } from "react";

const Form = (props) => {
  // Initial student in case that you want to update a new student
  const {
    initialPost = {
      id: null,
      title: "",
      textcontent: "",
      photourl: "",
      alttext: "",
      category: "",
    },
  } = props;

  // We're using that initial student as our initial state
  const [post, setPost] = useState(initialPost);

  //create functions that handle the event of the user typing into the form
  const handleTitleChange = (event) => {
    const title = event.target.value;
    setPost((post) => ({ ...post, title }));
  };

  const handleTextChange = (event) => {
    const textcontent = event.target.value;
    setPost((post) => ({ ...post, textcontent }));
  };

  const handlePhotoChange = (event) => {
    const photourl = event.target.value;
    setPost((post) => ({ ...post, photourl }));
  };
  const handleAltTextChange = (event) => {
    const alttext = event.target.value;
    setPost((post) => ({ ...post, alttext }));
  };
  const handleCategoryChange = (event) => {
    const category = event.target.value;
    setPost((post) => ({ ...post, category }));
  };

  //A function to handle the post request
  const postPost = (newPost) => {
    return fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From the post ", data);
        props.savePost(data);
      });
  };

  //a function to handle the Update request
  const updatePost = (existingPost) => {
    return fetch(`/api/posts/${existingPost.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(existingPost),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("From put request ", data);
        props.savePost(data);
      });
  };

  // Than handle submit function now needs the logic for the update scenario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (post.id) {
      updatePost(post);
    } else {
      postPost(post);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label>Title</label>
        <input
          type="text"
          id="add-title"
          placeholder="Title"
          required
          value={post.title}
          onChange={handleTitleChange}
        />
        <label>Text Content</label>
        <input
          type="text"
          id="add-text-content"
          placeholder="Post body"
          required
          value={post.textcontent}
          onChange={handleTextChange}
        />
        <label>Photo URL</label>
        <input
          type="text"
          id="add-photo-url"
          placeholder="Photo URL"
          required
          value={post.photourl}
          onChange={handlePhotoChange}
        />
        <label>Photo Alt text</label>
        <input
          type="text"
          id="add-alt-text"
          placeholder="Alt text"
          required
          value={post.alttext}
          onChange={handleAltTextChange}
        />
        <label>Category</label>
        <input
          type="text"
          id="add-category"
          placeholder="Post category"
          required
          value={post.category}
          onChange={handleCategoryChange}
        />
      </fieldset>

      <button type="submit">{!post.id ? "Add" : "Save"}</button>
    </form>
  );
};

export default Form;
