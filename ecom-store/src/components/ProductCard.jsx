import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { useCart } from "../contexts/Cart/CartContext";

export default function ProductCard({ _id, image, title, price }) {
  const { addItemToCart } = useCart();
  return (
    <Card sx={{ maxHeight: "400px" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt="green iguana"
          width={100}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            {price}$
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => addItemToCart(_id)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}
