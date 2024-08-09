import Box from "@mui/material/Box";
import BlogCard from "./BlogCard";
import Link from "next/link";
import { BASE_URL, VIEW_ALL_BLOG } from "@/constants/urls";

async function ExploreBlogs(props) {
  const data = await getBlogs();
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
      {data?.blogs?.map((blog) => (
        <Link key={blog.id} href={`/view-blog/${blog.id}`}>
          <BlogCard page={props.page} data={blog}></BlogCard>
        </Link>
      ))}
    </Box>
  );
}

async function getBlogs() {
  try {
    const res = await fetch(`${BASE_URL}/${VIEW_ALL_BLOG}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

export default ExploreBlogs;
