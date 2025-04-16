import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useState } from "react";
import { UseAuth } from "../contexts/Auth/AuthCntext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("ss@ss.cc");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = UseAuth();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("missing information!");
      return;
    }

    const url = `http://localhost:5000/user/login`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    if (!res.ok) {
      setError("somthing went wrong!");
      return;
    }
    const token = await res.json();

    if (!token) {
      setError("incorect Token!");
    }

    console.log(token);
    login(email, token);
    navigate("/");
  };

  return (
    <Container>
      <Box
        component="form"
        sx={{
          m: 1,
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h4">Login in </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            mt: 5,
            width: 400,
            // background: "gold",
            p: 10,
            borderRadius: 4,
            border: 2,
          }}
        >
          <TextField
            id="outlined-read-only-input"
            label="Email "
            type="Email"
            defaultValue="ss@ss.cc"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button variant="contained" sx={{ mt: 2 }} onClick={handleLogin}>
            Sign in
          </Button>
          {error && (
            <Typography variant="h6" sx={{ color: "red" }}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Container>
  );
}
