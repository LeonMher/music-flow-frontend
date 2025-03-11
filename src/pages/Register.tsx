import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import GroupMusicIllustration from "../assets/music_group_playing.svg";
import axios from "axios";
import { Button } from "@mui/material";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post(
        "https://localhost:7125/api/auth/register",
        {
          email,
          password,
          firstName,
          lastName,
        }
      );
      console.log("Registration response:", response.data);

      if (response.status === 200 || response.status === 201) {
        navigate("/login");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed. Please check your inputs.");
    }
  };

  return (
    <div className="flex justify-around">
      <div className="w-1/4">
        <img src={GroupMusicIllustration} alt="" />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <div className="flex flex-col items-start gap-[80px]">
          <div className="flex flex-col gap-[50px]">
            <div className="text-[40px] font-bold">Create Account</div>
            <div className="flex gap-[20px]">
              <TextField
                id="first-name-field"
                label="First name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <TextField
                id="last-name-field"
                label="Last name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-[50px] w-full">
            <TextField
              id="email-field"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              id="password-field"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            id="signUpButton"
            sx={{ backgroundColor: "#C16DB4", width: "205px", height: "57px" }}
            variant="contained"
            type="submit"
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Register;
