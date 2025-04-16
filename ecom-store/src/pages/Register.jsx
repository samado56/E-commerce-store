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

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async () => {
    const url = `http://localhost:5000/user/register`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: FirstName,
        lastName: LastName,
        email: email,
        password: password,
      }),
    });

    if (!res.ok) {
      setError("somthing went wrong!");
    }
    const data = await res.json();
    console.log(data);
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
        <Typography variant="h4">Register New account</Typography>
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
            required
            id="outlined-required"
            label="First Name"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Last Name"
            value={LastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <TextField
            id="outlined-read-only-input"
            label="Email "
            type="Email"
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

          <Button variant="contained" sx={{ mt: 2 }} onClick={handleRegister}>
            Register
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
