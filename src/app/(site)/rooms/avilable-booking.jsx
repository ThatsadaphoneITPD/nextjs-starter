import { useState } from "react"

const Avilable = () =>{
    return <>
    Avilable
    </>
}

const Booking = () =>{
    return <>
    Avilable
    </>
}



export default  function AvilableBooking(){
   const [isAvailable, setIsAvailable] = useState(true);

    return(
        <div>
            <button>
            
            </button>
            {isAvailable ? <Avilable/> : <Booking/>}
        </div>
    )
}