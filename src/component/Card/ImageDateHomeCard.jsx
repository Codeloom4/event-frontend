import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";

const ImageDateHomeCard = ({ event }) => {
  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "#F9F8F9" }}>
      <CardMedia
        sx={{ height: 140, position: "relative" }}
        image={event.image}
        title={event.title}
      >
        <Typography
          sx={{
            position: "absolute",
            bottom: 8,
            left: 4,
            backgroundColor: "yellow",
            fontWeight: 600,
            padding: "2px 6px",
            borderRadius: "4px",
          }}
        >
          {event.eventType}
        </Typography>
      </CardMedia>
      <CardContent>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            direction="column"
            spacing={0.5}
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {event.month}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{
                color: "yellow",
                fontWeight: 800,
              }}
            >
              {event.date}
            </Typography>
          </Stack>
          <Stack>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ fontWeight: "bold", fontSize: "1.25rem" }}
            >
              {event.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {event.venue}
              <br />
              {event.time}
              <br />
              {event.price}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ImageDateHomeCard;
