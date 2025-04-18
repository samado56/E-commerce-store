import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import { Container } from "@mui/material";

export default function OrderSucces() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 5,
      }}
    >
      <CheckCircleOutline
        sx={{
          fontSize: "80px",
          color: "green",
        }}
      />
      <h2 id="parent-modal-title">Thank you !</h2>
      <h4 id="parent-modal-description">
        we received your order and it will delivery within 3-5 days
      </h4>
      <Button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Home!
      </Button>
    </Box>
  );
}
