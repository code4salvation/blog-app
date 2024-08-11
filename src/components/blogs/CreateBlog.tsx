"use client";
import { BASE_URL, CREATE_BLOG, EDIT_BLOG } from "@/constants/urls";
import { Alert, Autocomplete, Button, Chip } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

function CreateBlog(props) {
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    content: "",
    author: "",
    image:
      "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=qNeCdQEGR07rW2FnwvIuuMaVmy0HkHPxdpYeJxLi3UE=",
    date: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
      .format(new Date())
      .replace(
        /\d+/,
        (d) =>
          d +
          (d.endsWith("1") && !d.endsWith("11")
            ? "st"
            : d.endsWith("2") && !d.endsWith("12")
            ? "nd"
            : d.endsWith("3") && !d.endsWith("13")
            ? "rd"
            : "th")
      ),
    tags: [],
  });
  const [successfullyPosted, setSuccessfullyPosted] = useState(false);

  useEffect(() => {
    if (props?.data) {
      setFormData({
        id: props?.data?.id,
        title: props?.data?.title,
        content: props?.data?.body,
        author: props?.data?.author,
        image:
          "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=qNeCdQEGR07rW2FnwvIuuMaVmy0HkHPxdpYeJxLi3UE=",
        date: new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
          .format(new Date())
          .replace(
            /\d+/,
            (d) =>
              d +
              (d.endsWith("1") && !d.endsWith("11")
                ? "st"
                : d.endsWith("2") && !d.endsWith("12")
                ? "nd"
                : d.endsWith("3") && !d.endsWith("13")
                ? "rd"
                : "th")
          ),
        tags: props?.data?.tags,
      });
    }
  }, [props?.data]);

  const handleChange = (e, newValue?) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.id === "tags" ? newValue : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createPost();
  };

  const createPost = async () => {
    const createOrEdit =
      props?.page === "edit" ? `${EDIT_BLOG}/${formData?.id}` : CREATE_BLOG;
    const methodValue = props?.page === "edit" ? "put" : "post";
    const res = await fetch(`${BASE_URL}/${createOrEdit}`, {
      method: methodValue,
      body: JSON.stringify(formData),
    });
    if (!res.ok) {
      throw new Error("Failed to create/update data");
    } else {
      setSuccessfullyPosted(true);
      setFormData({
        id: 0,
        title: "",
        content: "",
        author: "",
        image:
          "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=1024x1024&w=is&k=20&c=qNeCdQEGR07rW2FnwvIuuMaVmy0HkHPxdpYeJxLi3UE=",
        date: new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
          .format(new Date())
          .replace(
            /\d+/,
            (d) =>
              d +
              (d.endsWith("1") && !d.endsWith("11")
                ? "st"
                : d.endsWith("2") && !d.endsWith("12")
                ? "nd"
                : d.endsWith("3") && !d.endsWith("13")
                ? "rd"
                : "th")
          ),
        tags: [],
      });
    }
  };
  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      onSubmit={handleSubmit}
    >
      {successfullyPosted && (
        <Alert
          severity="success"
          onClose={() => {
            setSuccessfullyPosted(false);
          }}
        >
          Post Created Successfully
        </Alert>
      )}
      <TextField
        id="title"
        label="Title"
        placeholder="Please give a suitable title to your blog..."
        value={formData.title}
        onChange={handleChange}
      />
      <TextField
        id="content"
        label="Content"
        multiline
        rows={6}
        placeholder="Enter blog content..."
        value={formData.content}
        onChange={handleChange}
      />
      <TextField
        id="author"
        label="Author Name"
        placeholder="Please provide your full name..."
        value={formData.author}
        onChange={handleChange}
      />

      <Autocomplete
        id="tags"
        clearIcon={false}
        options={[]}
        freeSolo
        multiple
        value={formData?.tags}
        onChange={(event, newValue) => {
          handleChange(event, newValue);
        }}
        renderTags={(value, props) =>
          value.map((option, index) => (
            <Chip key={index} label={option} {...props({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
            placeholder="Please enter tags..."
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={
          !formData.title ||
          !formData.content ||
          !formData.author ||
          !formData.tags.length
        }
      >
        Post
      </Button>
    </Box>
  );
}

export default CreateBlog;
