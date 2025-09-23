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
    <Card className="rounded-lg shadow-md  mx-4" sx={{ maxWidth: 230, height: 'auto',borderRadius: "1rem", // 👈 rounded corners
    overflow: "hidden",   }}>
      <CardMedia
        component="img"
        height="100"
        image={path_image ? path_image : ''}
        alt="Meeting Room"
        className="object-cover h-24" 
      />
      <CardContent className="p-3">
        <Typography
          gutterBottom
          variant="subtitle1" 
          component="div"
          className="font-bold !important" 
        >
          {room_name ? room_name : '--'}
        </Typography>
        <div className="flex flex-col gap-0 text-xs text-gray-600"> 
          <div className="flex items-center gap-1">
            <CalendarTodayIcon fontSize="small" sx={{ color: '#131FA8' }} />
            <span>{avilable_date ? avilable_date : '--'}</span>
          </div>
          <div className="flex items-center gap-1">
            <AccessTimeIcon fontSize="small" sx={{ color: '#131FA8' }} />
            <span>{time ? time : '--'}</span>
          </div>
          <div className="flex items-center gap-1">
            <PermIdentityIcon fontSize="small" color="disabled" />
            <span>{capacity ? capacity : '--'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span
              className="font-semibold text-xs" // Smaller text
              style={{ color: statusColor().color }}
            >
              {statusColor().text}
            </span>
          </div>
        </div>
      </CardContent>
      {(isAvailable || isNotAvailable) && (
        <CardActions className="p-3 pt-0 flex justify-center">
          <Button
            sx={{
               borderRadius: "2rem",
                            px: 9,
                            py: 1.50,
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