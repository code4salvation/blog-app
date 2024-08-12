'use client';
import Box from "@mui/material/Box";
import styles from "../../page.module.css";
import ViewBlog from "@/components/blogs/ViewBlog";
import { getBlog } from "@/utils/common";
import { BlogContext } from "@/context/Blogs";
import { useContext } from "react";

export default function Page({params}) {
  //This code was used for server component
  //const blogData = await getBlog(params?.id);
  const blogsContext = useContext(BlogContext);
  const blogData = blogsContext?.blogs?.filter((item) => item?.id == params?.id)[0];
  return (
    <Box className={styles.main}>
      <ViewBlog data={blogData?.id ? blogData : blogData?.blog}></ViewBlog>
    </Box>
  );
}
