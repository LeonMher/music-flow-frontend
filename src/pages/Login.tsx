import { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import PlayingBroSoloImage from "../assets/playing_bro_solo.svg";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    setError(null);
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7125/api/Auth/login",
        {
          email,
          password,
        }
      );
      console.log("Login successful:", response.data.token);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed. Please check your inputs.");
    }
  };

  return (
    <div className="flex justify-around">
      <div className="w-1/4">
        <img src={PlayingBroSoloImage} alt="" />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="flex flex-col items-start gap-[80px]">
          <div className="flex flex-col gap-[50px]">
            <div className="text-[40px] font-bold">Sign In</div>
            <div className="flex gap-[20px]">
              <TextField
                id="first-name-field"
                placeholder="Username"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="text"
              />
              <TextField
                id="last-name-field"
                placeholder="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                type="password"
              />
            </div>
          </div>

          <Button
            id="signUpButton"
            sx={{ backgroundColor: "#C16DB4", width: "205px", height: "57px" }}
            variant="contained"
            type="submit"
          >
            Sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
