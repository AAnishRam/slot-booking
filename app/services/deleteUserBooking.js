import api from "./api";
import { toast } from "react-hot-toast";

export const deleteUserBooking = async (mail_id) => {
  try {
    const response = await api.delete("/goML/booking/delete", {
      data: { mail_id },
    });
    console.log("Booking deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    const detail = error.response?.data?.detail || "Unexpected error";
    toast.error(`Failed to delete: ${detail}`);
    console.error("Error deleting booking:", detail);
    return null;
  }
};
