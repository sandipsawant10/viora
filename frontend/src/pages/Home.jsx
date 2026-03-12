import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import IconButton from "@mui/material/IconButton";
import RestoreIcon from "@mui/icons-material/Restore";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Viora</h2>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={() => navigate("/history")}>
            <RestoreIcon />
          </IconButton>
          <p>History</p>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <div>
            <h2>Providing Quality Video Calls</h2>
            <div style={{ display: "flex", gap: "10px" }}>
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                label="Meeting Code"
                variant="outlined"
              />
              <Button onClick={handleJoinVideoCall} variant="contained">
                Join
              </Button>
            </div>
          </div>
        </div>
        <div className="rightPanel">
          <img src="/logo3.png" alt="logo" />
        </div>
      </div>
    </>
  );
}
