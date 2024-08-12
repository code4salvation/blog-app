"use client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Link from "next/link";
import { BASE_URL, DELETE_BLOG } from "@/constants/urls";
import { useContext, useState } from "react";
import { Alert, CircularProgress } from "@mui/material";
import { BlogContext } from "@/context/Blogs";

export default function EditDeleteIcon(props) {
  //Can use this without store
  //const router = useRouter();
  const [spinner, showSpinner] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const blogContext = useContext(BlogContext);
  
  const deleteBlog = async (e) => {
    setDeleting(true);
    const blogsLocalState = [...blogContext.blogs];
    try {
      e.stopPropagation();
      e.preventDefault();
      showSpinner(true);
      const res = await fetch(`${BASE_URL}/${DELETE_BLOG}/${props?.data?.id}`, {
        method: "delete",
      });
      if (!res.ok) {
        throw new Error("Failed to delete data");
      }
      const deleteIndex = blogsLocalState.findIndex((item) => item.id == props?.data?.id)
      blogsLocalState?.splice(deleteIndex, 1);
      blogContext.setBlogs([...blogsLocalState]);
      showSpinner(false);
      //router.refresh()
    } catch (error) {
      showSpinner(false);
      console.error(error);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          right: "1rem",
          top: "1rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link href={`/create-blog/${props?.data?.id}`}>
          <Fab size="small" color="primary" aria-label="edit">
            <EditIcon />
          </Fab>
        </Link>
        <Fab
          size="small"
          color="error"
          aria-label="delete"
          onClick={(e) => {
            deleteBlog(e);
          }}
        >
          <DeleteIcon />
        </Fab>
      </Box>
      {spinner && (
        <Box
          sx={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {deleting && (
        <Box
          sx={{
            position: "fixed",
            right: "2rem",
            bottom: "2rem",
            zIndex: 1000
          }}
        >
          <Alert severity="info" onClose={() => {
            setDeleting(false);
          }}>
            Deleting Post...
          </Alert>
        </Box>
      )}
    </>
  );
}
