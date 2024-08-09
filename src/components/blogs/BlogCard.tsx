import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";

function BlogCard(props) {
  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: { xs: "100%", md: 284 },
        height: 420,
      }}
    >
      {props.page === "editDelete" && (
        <Box
          sx={{
            position: "absolute",
            right: "1rem",
            top: "1rem",
            display: "flex",
            gap: "1rem",
          }}
        >
          <Fab size="small" color="primary" aria-label="edit">
            <EditIcon />
          </Fab>
          <Fab size="small" color="error" aria-label="delete">
            <DeleteIcon />
          </Fab>
        </Box>
      )}
      <CardMedia
        sx={{ height: 140 }}
        image={props?.data?.image}
        title={props?.data?.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props?.title}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 5, // Change the number to the number of lines you want to clamp
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
