import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export default function CardBooking(props) {
  const { title, roomNumber, date, time, capacity } = props;

  return (
    <div className="flex flex-wrap justify-center gap-6">
      <div className="bg-white rounded-3xl shadow-md p-6 w-[350px] border border-gray-400">
        <div className="flex flex-col">
          <div className="text-xl font-bold mb-4 text-black">
            <div className="flex items-center gap-1">
             </div>{title}</div>
          <div className="flex flex-col space-y-1 text-gray-600">
            <p className="text-base font-bold text-black">{roomNumber}</p>
            <p className="text-base"> 
              <CalendarTodayIcon fontSize="small" color="info" />{date}</p>
            <p className="text-base">
              <AccessTimeIcon fontSize="small" color="info" />{time}</p>
            <p className="text-base">
               <PermIdentityIcon fontSize="small" color="disabled" />{capacity}</p>
           
          </div>
        </div>
      </div>
    </div>
  );
}
