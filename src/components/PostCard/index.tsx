import { Card, CardContent, Typography } from "@mui/material";
import { Post } from "../../types/Placeholder";
import { useNavigate } from "react-router-dom";

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{ cursor: "pointer" }}
      onClick={() => navigate(`/${post.id}`)}
    >
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PostCard;
