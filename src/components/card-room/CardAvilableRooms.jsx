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

export default function CardAvilableRooms(props) {
    const { path_image, room_name, avilable_date, time, capacity, status } = props;

    const statusColor = () => {
        switch (String(status)) {
            case "1":
                return { color: "#06D001", text: "ວ່າງ" };
            case "2":
                return { color: "#E30C0C", text: "ບໍ່ວ່າງ" };
            default:
                return { color: "#131FA8", text: "--" };
        }
    };

    const isAvailable = String(status) === "1";
    const isNotAvailable = String(status) === "2";
    
    return (
        <Card className="rounded-lg flex mx-6 my-5" sx={{ width: 360, height: 194, borderRadius: "1rem", overflow: "hidden" }}>
            {/* ✅ Removed fixed width/height and added a flex basis to let it adapt */}
            <CardMedia
                component="img"
                image={path_image ? path_image : ''}
                alt="Meeting Room"
                className="object-cover"
                sx={{ flexBasis: '45%', minWidth: '160px' }}
            />
            
            {/* Right: Content */}
            <div className="flex flex-col justify-between flex-1">
                {/* ✅ Added some padding and removed fixed width for responsiveness */}
                <CardContent className="p-4 flex-1">
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
                            <span className='text-[0.58rem] whitespace-nowrap'>{avilable_date ? avilable_date : "--"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <AccessTimeIcon fontSize="small" color="info" />
                            <span>{time ? time : "--"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <PermIdentityIcon fontSize="small" color="disabled" />
                            <span>{capacity ? capacity : "--"}</span>
                        </div>
                        <div className="flex justify-end mt-3">
                            <span
                                className="font-semibold text-sm"
                                style={{ color: statusColor().color }}
                            >
                                {statusColor().text}
                            </span>
                        </div>
                    </div>
                </CardContent>
                
                {(isAvailable || isNotAvailable) && (
                    <CardActions className="p-4 items-center justify-center">
                        <Button
                            sx={{
                                borderRadius: "2rem",
                                px: 9,
                                py: 1,
                                fontWeight: "bold",
                                backgroundColor: isNotAvailable ? "gray" : "#131FA8",
                                color: "white",
                                "&:hover": {
                                    backgroundColor: isNotAvailable ? "gray" : "#0F1480",
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
            </div>
        </Card>
    );
}