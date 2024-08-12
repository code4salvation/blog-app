'use client';
import Box from "@mui/material/Box";
import styles from "../../page.module.css";
import CreateBlog from "@/components/blogs/CreateBlog";
import { blogApp } from "@/constants/constants";
import { useContext } from "react";
import { BlogContext } from "@/context/Blogs";

export default async function Page({ params }) {
  //This code was used for server component
  //const blogData = await getBlog(params?.id);
  const blogsContext = useContext(BlogContext);
  const blogData = blogsContext?.blogs?.filter((item) => item?.id == params?.id)[0];
  return (
    <Box className={styles.main}>
      <h1>{blogApp.editBlog}</h1>
      <CreateBlog page='edit' data={blogData?.id ? blogData : blogData?.blog}></CreateBlog>
    </Box>
  );
}
