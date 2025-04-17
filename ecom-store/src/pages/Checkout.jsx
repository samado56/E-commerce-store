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
import TextField from "@mui/material/TextField";

import { useCart } from "../contexts/Cart/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { loader, cartItems, totalAmount } = useCart();
  const [adress, setAdress] = useState();

  const navigate = useNavigate();

  if (loader) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          mx: 6,
          p: 4,
        }}
      >
        <Typography variant="h3">Order Summury</Typography>
      </Box>
      <List
        sx={{
          width: "100%",
          maxWidth: "90%",
          bgcolor: "background.paper",
          justifySelf: "center",
          display: "flex",
        }}
      >
        <Box width="50%">
          {cartItems && cartItems.length ? (
            cartItems.map((item, index) => (
              <Box sx={{ p: 2 }}>
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
                          width: 100,
                          height: 100,
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
                        ml: 2,
                      }}
                    >
                      <Box sx={{ width: "40%" }}>
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
                      <Box sx={{ width: "30%" }}>
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
                    </Box>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Box>
              </Box>
            ))
          ) : (
            <h1>No Items to show</h1>
          )}
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // justifyContent: "center",
            mx: 6,
            my: 2,
            mb: 2,
            p: 4,
            // backgroundColor: "gold",
            width: "50%",
            gap: 2,
            border: 1,
            borderColor: "GrayText",
            borderRadius: 2,
          }}
        >
          <Typography variant="h4">Checkout</Typography>
          <TextField
            id="shipping adress"
            type="text"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
            fullWidth
            label="Shipping Adress"
          />

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mx: 6,
              my: 2,
              mb: 2,
              width: "100%",
            }}
          >
            <TextField
              id="copon code"
              type="text"
              // value={copon}
              // onChange={(e) => setCopom(e.target.value)}
              label="Copon Code"
            />
            <Button
              onClick={() => {
                navigate("/checkout");
              }}
              size="large"
              sx={{ fontWeight: "bold", px: 4, py: 2 }}
              variant="outlined"
            >
              Apply
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mx: 6,
              my: 2,
              mb: 2,
              width: "100%",
            }}
          >
            <Typography variant="h4">
              Total : {Math.round(totalAmount).toFixed(2)} $
            </Typography>
            <Button
              onClick={() => {
                navigate("/checkout");
              }}
              size="large"
              sx={{ fontWeight: "bold" }}
              variant="contained"
            >
              Pay Now
            </Button>
          </Box>
        </Box>
      </List>
    </>
  );
}
