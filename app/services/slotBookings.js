import api from "./api"; 

export const enableSlot = async () => {
  try {
    const response = await api.patch("/goML/slot/enable");
    return response.data;
  } catch (error) {
    console.error("Error enabling slot:", error.response?.data?.detail || error.message);
    throw error;
  }
};

export const disableSlot = async () => {
  try {
    const response = await api.patch("/goML/slot/disable");
    return response.data;
  } catch (error) {
    console.error("Error disabling slot:", error.response?.data?.detail || error.message);
    throw error;
  }
};
