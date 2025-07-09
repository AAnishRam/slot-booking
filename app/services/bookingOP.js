import api from "./api";

export const handlebookSeat = async (setIsBottomSeatOccupied) => {
  try {
    const response = await api.post("/goML/booking/book",{
      mail_id: "fjo@example.com"
    });
    console.log("Booking response:", response.status);
    if (response.status === 200) {
      setIsBottomSeatOccupied(true);
    }
  } catch (error) {
    console.error("Error booking seat:", error);
  }
};

export const handleCancelSeat = async (setIsBottomSeatOccupied) => {
  try {
    const response = await api.patch("/goML/booking/cancel",{
     mail_id: "fjo@example.com"
    });
    console.log("Cancellation response:", response);
    if (response.status === 200) {
      setIsBottomSeatOccupied(false);
    }
  } catch (error) {
    console.error("Error canceling seat:", error);
  }
};


export const getSeatStatus = async (setIsBottomSeatOccupied) => {
  try {
    const response = await api.get("/goML/booking/check_availability",{
        params: {
            mail_id: "fjo@example.com"
        }
    });
    console.log("Seat status response:", response.data.check_availability_enabled);
    if (response.status === 200) {
      setIsBottomSeatOccupied(!response.data.check_availability_enabled);
    }
  } catch (error) {
    console.error("Error fetching seat status:", error);
  }
};