"use client";
import Box from "@mui/material/Box";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { BASE_URL, VIEW_ALL_BLOG } from "@/constants/urls";
import { BlogContext, BlogsProvider } from "@/context/Blogs";
import { useContext, useEffect } from "react";
import { CircularProgress } from "@mui/material";

function ExploreBlogs(props) {
  const blogContext = useContext(BlogContext);
  useEffect(() => {
    async function getBlogs() {
      try {
        const res = await fetch(`${BASE_URL}/${VIEW_ALL_BLOG}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const blogs = await res.json();
        blogContext.setBlogs(blogs);
      } catch (error) {
        console.error(error);
      }
    }
    getBlogs();
  }, []);
  //This is for server component
  //const blogs = await getBlogs();
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {blogContext?.blogs?.length ? (
        blogContext?.blogs?.map((blog) => (
          <Link key={blog.id} href={`/view-blog/${blog.id}`}>
            <BlogCard page={props.page} data={blog}></BlogCard>
          </Link>
        ))
      ) : (
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
    </Box>
  );
}
//THis is for server component
/* async function getBlogs() {
  try {
    const res = await fetch(`${BASE_URL}/${VIEW_ALL_BLOG}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
} */

export default ExploreBlogs;
