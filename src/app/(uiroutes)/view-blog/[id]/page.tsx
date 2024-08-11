import Box from "@mui/material/Box";
import styles from "../../page.module.css";
import ViewBlog from "@/components/blogs/ViewBlog";
import { BASE_LOCAL, BASE_URL, VIEW_BLOG } from "@/constants/urls";
import { getBlog } from "@/utils/common";

export default async function Page({params}) {
  const blogData = await getBlog(params?.id);
  return (
    <Box className={styles.main}>
      <ViewBlog data={blogData}></ViewBlog>
    </Box>
  );
}
