import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

const PackageCard = ({ packageData }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/package/${packageData.id}`);
  };
  return (
    <Card
      className="shadow-lg rounded-xl border p-4 cursor-pointer transition duration-300 w-full hover:shadow-2xl hover:scale-105 hover:bg-opacity-20"
      onClick={handleClick}
    >
      <CardHeader
        title={packageData.name}
        className="text-xl font-bold text-center text-gray-800"
      />
      <CardContent className="text-center">
        <Typography variant="h5" color="primary">
          ${packageData.price}
        </Typography>
        <Typography variant="body2" className="text-gray-600 mt-2">
          {packageData.description}
        </Typography>

        {/* Feature List */}
        <List className="mt-4">
          {packageData.features.map((feature, index) => (
            <ListItem key={index} disablePadding>
              <ListItemIcon>
                <CheckCircleIcon className="text-green-500" />
              </ListItemIcon>
              <ListItemText primary={feature} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
