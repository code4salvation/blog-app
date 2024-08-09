import Box from "@mui/material/Box";
import styles from "../../page.module.css";
import ViewBlog from "@/components/blogs/ViewBlog";
import { BASE_URL, VIEW_BLOG } from "@/constants/urls";

export default async function Page({params}) {
  const blogData = await getBlog(params.id);
  return (
    <Box className={styles.main}>
      <ViewBlog data={blogData?.blog}></ViewBlog>
    </Box>
  );
}

async function getBlog(id: any) {
  try {
    const res = await fetch(`${BASE_URL}/${VIEW_BLOG}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}