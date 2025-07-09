import api from "./api";

export const deleteSlot = async (date) => {
  try {
    const response = await api.delete("/goML/slot/delete", {
      params: { date },
    });

    if (response.status === 200) {
      alert("Slot deleted successfully!");
      return response.data;
    }
  } catch (error) {
    console.error("Error deleting slot:", error);
    if (error.response?.status === 422) {
      alert("Validation error: Please check the date format (dd-mm-yyyy)");
    } else {
      alert("Failed to delete slot. Please try again.");
    }
    throw error;
  }
};

 
