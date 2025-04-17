import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { useCart } from "../contexts/Cart/CartContext";

export default function Cart() {
  const {
    loader,
    cartItems,
    totalAmount,
    updateItemInCart,
    deleteItemFromCart,
    clearCart,
  } = useCart();
  console.log("######## totalAmount ########", totalAmount);

  const handleQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      return;
    }
    updateItemInCart(productId, quantity);
  };

  const handleDeleteItem = (productId) => {
    deleteItemFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  if (loader) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          mx: 6,
          p: 4,
        }}
      >
        <Typography variant="h4">My Cart</Typography>
        <Button onClick={handleClearCart}>Clear Cart</Button>
      </Box>
      <List
        sx={{
          width: "100%",
          maxWidth: "80%",
          bgcolor: "background.paper",
          justifySelf: "center",
        }}
      >
        {cartItems && cartItems.length ? (
          cartItems.map((item, index) => (
            <Box sx={{ p: 4 }}>
              <Box>
                <ListItem
                  key={index}
                  alignItems="center"
                  sx={{ display: "flex" }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Travis Howard"
                      src={item.product.image}
                      sx={{
                        borderRadius: 0,
                        width: 150,
                        height: 150,
                        padding: 2,
                      }}
                    />
                  </ListItemAvatar>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 4,
                      alignItems: "center",
                      width: "100%",
                      ml: 4,
                    }}
                  >
                    <Box sx={{ width: "20%" }}>
                      <Typography
                        component="span"
                        variant="h6"
                        sx={{
                          color: "text.primary",
                          display: "inline",
                        }}
                      >
                        {item.product.title}
                      </Typography>{" "}
                    </Box>
                    <Box sx={{ width: "20%" }}>
                      <Typography
                        component="span"
                        variant="h6"
                        sx={{
                          color: "text.primary",
                          display: "inline",
                        }}
                      >
                        {item.unitPrice * item.quantity}$
                      </Typography>
                    </Box>
                    <Box sx={{ width: "20%" }}>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="Basic button group"
                      >
                        <Button
                          onClick={() =>
                            handleQuantity(item.product._id, item.quantity - 1)
                          }
                        >
                          -
                        </Button>

                        <Typography
                          component="span"
                          variant="h6"
                          sx={{
                            color: "text.primary",
                            display: "inline",
                            mx: 2,
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <Button
                          onClick={() =>
                            handleQuantity(item.product._id, item.quantity + 1)
                          }
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </Box>
                    <Box sx={{ width: "20%" }}>
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: "center" }}
                      >
                        <IconButton
                          onClick={() => {
                            handleDeleteItem(item.product._id);
                          }}
                          aria-label="delete"
                          size="large"
                        >
                          <DeleteIcon fontSize="inherit" color="error" />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Box>
                </ListItem>
                <Divider variant="inset" component="li" />
              </Box>
            </Box>
          ))
        ) : (
          <h1>No Items to show</h1>
        )}
        <Typography
          variant="h4"
          sx={{ alignSelf: "center", justifySelf: "center", mb: 2 }}
        >
          Total : {Math.round(totalAmount).toFixed(2)} $
        </Typography>
      </List>
    </>
  );
}
