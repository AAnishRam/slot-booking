import api from "./api";


export const deleteUserBooking = async (mail_id) => {
  try {
    const response = await api.delete('/goML/booking/delete', {
      params: { mail_id }, 
    });
    console.log("Booking deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting booking:",
      error.response?.data?.detail || error.message
    );
    return null;
  }
};
