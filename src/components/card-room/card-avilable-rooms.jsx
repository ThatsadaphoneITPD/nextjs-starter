import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function CardAvilableRooms(props) {
    const { path_image, room_name, avilable_date, time, capacity, status, } = props;
    const statusColor = () => {
        switch (status) {
            case 1:
                return { color: "#03AC13", text: "Avilable" };
            case 2:
                return { color: "#ff4d4f", text: "Not" };
            default:
                return { color: "#85a5ff", text: "--" };
        }
    }

    return (
        <Card className="flex mx-4 my-2" sx={{ maxWidth: 359, height: 194 }}>
            {/* Left: Image */}
            <CardMedia
                sx={{ width: 165, height: 195 }}
                component="img"
                image={path_image ? path_image : ''}
                alt="Meeting Room"
                className=" object-cover"
            />
            {/* Right: Content */}
            <div className="flex flex-col justify-between flex-1">
                <CardContent className="p-0" sx={{width: 194}}>
                    <Typography
                        gutterBottom
                        component="div"
                        className="font-bold text-base sm:text-lg"
                    >
                        {room_name ? room_name : "--"}
                    </Typography>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <CalendarTodayIcon fontSize="small" color="info" />
                            <span className='text-[0.57rem]'>{avilable_date ? avilable_date : "--"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <AccessTimeIcon fontSize="small" color="info" />
                            <span>{time ? time : "--"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <PermIdentityIcon fontSize="small" color="disabled" />
                            <span>{capacity ? capacity : "--"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className={`font-semibold text-sm text-[${statusColor().color}] `}>
                                {status ? statusColor().text : "--"}
                            </span>
                        </div>
                    </div>
                </CardContent>
                <CardActions className="p-0 items-center justify-center ">
                    <Button
                        sx={{
                            borderRadius: "2rem",
                            px: 4,
                            py: 1.5,
                            fontWeight: "bold",
                            backgroundColor: "#131FA8",   // custom color
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#0F1480", // darker shade on hover
                                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                            },
                        }}
                        size="large"
                        variant="contained"
                    >
                        Book Now
                    </Button>
                </CardActions>
            </div>
        </Card>

    )
}



