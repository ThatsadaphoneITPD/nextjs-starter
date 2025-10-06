import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupsIcon from '@mui/icons-material/Groups';

export default function CardRoom(props) {
  const { path_image, room_name, avilable_date, time, capacity, status } = props;

  const statusColor = () => {
    switch (String(status)) {
      case '1':
        return { color: '#06D001', text: 'ວ່າງ' };
      case '2':
        return { color: '#E30C0C', text: 'ບໍ່ວ່າງ' };
      default:
        return { color: '#131FA8', text: '--' };
    }
  };

  const isAvailable = String(status) === "1";
  const isNotAvailable = String(status) === "2";

  return (
    <Card className="rounded-lg shadow-md mx-2 sm:mx-4"
      sx={{
        width: '100%',
        maxWidth: 230,
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", 
      }}
    >
      <CardMedia
        component="img"
        height="100" // Reduced image height
        image={path_image || ''}
        alt="Meeting Room"
        className="object-cover h-32 w-full"
      />
      <CardContent className="p-2">
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="font-bold text-sm !important leading-tight" // Smaller font size and tighter leading
        >
          {room_name || '--'}
        </Typography>
        <div className="flex flex-col gap-1 text-xs text-gray-600 mt-1">
          <div className="flex items-center gap-1">
            <CalendarTodayIcon sx={{ color: '#131FA8', fontSize: '1rem' }} /> {/* Smaller icon */}
            <span>{avilable_date || '--'}</span>
          </div>
          <div className="flex items-center gap-1">
            <AccessTimeIcon sx={{ color: '#131FA8', fontSize: '1rem' }} /> {/* Smaller icon */}
            <span>{time || '--'}</span>
          </div>
          <div className="flex items-center gap-1">
            <PermIdentityIcon sx={{ color: '#131FA8', fontSize: '1rem' }} /> {/* Using a different icon for consistency */}
            <span>{capacity || '--'}</span>
          </div>
          <div className="flex justify-end ">
            <span
              className="font-semibold text-sm" // Smaller text
              style={{ color: statusColor().color }}
            >
              {statusColor().text}
            </span>
          </div>
        </div>
      </CardContent>
      {(isAvailable || isNotAvailable) && (
        <CardActions className="p-1 flex justify-center">
          <Button
            sx={{
              borderRadius: "1rem",
              px: 9,
              py: 1,
              fontWeight: "bold",
              backgroundColor: "#131FA8",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#0F1480",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              },
            }}
            size="small"
            variant="contained"
            disabled={isNotAvailable}
          >
            ຈອງ
          </Button>
        </CardActions>
      )}
    </Card>
  );
}