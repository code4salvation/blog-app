'use client';
import { BASE_URL, CREATE_BLOG } from "@/constants/urls";
import { Alert, Button } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState } from "react";

function CreateBlog() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    image: 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=qNeCdQEGR07rW2FnwvIuuMaVmy0HkHPxdpYeJxLi3UE=',
    date: (new Date()).toDateString(),
    tags: ''
  });
  const [successfullyPosted, setSuccessfullyPosted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  const createPost = async() => {
    const res = await fetch(`${BASE_URL}/${CREATE_BLOG}`, {
      method: 'post', 
      body: JSON.stringify(formData)
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    } else {
      setSuccessfullyPosted(true);
      setFormData({
        title: '',
        content: '',
        author: '',
        image: 'https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=qNeCdQEGR07rW2FnwvIuuMaVmy0HkHPxdpYeJxLi3UE=',
        date: (new Date()).toDateString(),
        tags: ''
      })
    }
  }
  return (
    <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: "1rem" }} onSubmit={handleSubmit}>
      {successfullyPosted && (<Alert severity="success" onClose={() => {setSuccessfullyPosted(false)}}>Post Created Successfully</Alert>)}
      <TextField
          required
          id="title"
          label="Title"
          placeholder="Please give a suitable title to your blog..."
          onChange={handleChange}
        />
      <TextField
          id="content"
          label="Content"
          multiline
          rows={6}
          placeholder="Enter blog content..."
          onChange={handleChange}
        />
      <TextField
          required
          id="author"
          label="Author Name"
          placeholder="Please provide your full name..."
          onChange={handleChange}
        />
      <TextField
          required
          id="tags"
          label="Tags"
          placeholder="Please enter tags..."
          onChange={handleChange}
        />
        <Button type="submit" variant="contained">Post</Button>
    </Box>
  );
}

export default CreateBlog;