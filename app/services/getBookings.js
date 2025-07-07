import api from "./api";


export const getBookingsByDate = async (date) => {
  try {
    const response = await api.get('/goML/booking', {
      params: { date },
    });
    console.log('Booking data:', response.data);
  } catch (error) {
    console.error('Error fetching booking:', error.response?.data?.detail || error.message);
  }
};