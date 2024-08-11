import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import EditDeleteIcon from "./EditDeleteIcon";

function BlogCard(props) {
  return (
    <Card
      sx={{
        position: "relative",
        width: {xs: '100%', sm: 284},
        height: 350,
      }}
    >
      {props.page === "editDelete" && (
       <EditDeleteIcon {...props}></EditDeleteIcon>
      )}
      <CardMedia
        sx={{ height: 140 }}
        image={props?.data?.image}
        title={props?.data?.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props?.data?.title}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3, // Change the number to the number of lines you want to clamp
            textOverflow: "ellipsis",
          }}
          variant="body2"
          color="text.secondary"
        >
          {props?.data?.body}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default BlogCard;
