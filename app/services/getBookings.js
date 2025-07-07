import api from "./api";


export const getBookingsByDate = async (date) => {
  try {
    const response = await api.get('/goML/booking', { params: { date } });
    console.log('Bookings fetched successfully:', response.data);
    return response.data; 
  }
  catch (error) {
    console.error('Error fetching bookings:', error.response?.data?.detail || error.message);
    return null;
  }
};