"use client";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Link from "next/link";
import { BASE_URL, DELETE_BLOG } from "@/constants/urls";
import { useRouter } from "next/navigation";

export default function EditDeleteIcon(props) {
  const router = useRouter();
  const deleteBlog = async (e) => {
    try {
      e.stopPropagation();
      e.preventDefault();
      const res = await fetch(
        `${BASE_URL}/${DELETE_BLOG}/${props?.data?.id}`,
        {
          method: "delete",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete data");
      }
      alert("Blog Post Deleted Successfully");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
}
