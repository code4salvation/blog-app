import Box from "@mui/material/Box";
import styles from "../page.module.css";
import CreateBlog from "@/components/blogs/CreateBlog";
import { blogApp } from "@/constants/constants";

export default function Page() {
  return (
    <Box className={styles.main}>
      <h1>{blogApp.createBlog}</h1>
      <CreateBlog></CreateBlog>
    </Box>
  );
}
