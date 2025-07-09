import api from "./api";
import { toast } from "react-hot-toast";

export const initializeSlot = async () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formattedDate = tomorrow
    .toLocaleDateString("en-GB")
    .split("/")
    .join("-");

  try {
    const response = await api.post("/goML/booking/initialize", {
      date: formattedDate,
      total_seats: 12,
    });
    toast.success("Slot initialized");
    return response.data;
  } catch (error) {
    if (error.response?.status === 400 && error.response.data?.detail) {
      toast.error(error.response.data.detail);
    } else {
      toast.error("Failed to initialize slot");
    }
    return null;
  }
};
