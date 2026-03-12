import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <IconButton
        onClick={() => {
          navigate("/home");
        }}
      >
        <HomeIcon />
      </IconButton>
      {meetings.length !== 0 ? (
        meetings.map((e, i) => {
          return (
            <>
              <Card key={i} variant="outlined">
                <CardContent>
                  <Typography
                    gutterBottom
                    sx={{ color: "text.secondary", fontSize: 14 }}
                  >
                    Code: {e.meetingCode}
                  </Typography>
                  <Typography></Typography>
                  <Typography sx={{ color: "text.secondary" }}>
                    Data: {formatDate(e.date)}
                  </Typography>
                </CardContent>
              </Card>
            </>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
}
