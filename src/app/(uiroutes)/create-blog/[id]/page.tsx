import Box from "@mui/material/Box";
import styles from "../../page.module.css";
import CreateBlog from "@/components/blogs/CreateBlog";
import { blogApp } from "@/constants/constants";
import { getBlog } from "@/utils/common";

export default async function Page({ params }) {
  const blogData = await getBlog(params?.id);
  
  return (
    <Box className={styles.main}>
      <h1>{blogApp.editBlog}</h1>
      <CreateBlog page='edit' data={blogData?.id ? blogData : blogData?.blog}></CreateBlog>
    </Box>
  );
}
