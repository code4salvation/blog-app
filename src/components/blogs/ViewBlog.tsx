import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function ViewBlog(props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <Box
        component="img"
        sx={{
          height: 324,
          width: '100%',
          objectFit: 'cover',
          maxHeight: { xs: 233, md: 324 },
          maxWidth: '100%',
        }}
        alt={props?.data?.title}
        src={props?.data?.image}
      />
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Typography variant="h4" component="h1">
          {props?.data?.title}
        </Typography>
        <Typography variant="body2" component="p">
          {`Published by ${props?.data?.author} on ${props?.data?.publishedDate}`}
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "1.5rem" }} variant="body1" component="p">
        {props?.data?.body}
      </Typography>
    </Box>
  );
}

export default ViewBlog;
