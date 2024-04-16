// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8888", // Adjust the base URL as needed
});

export const fetchESVPassage = async (book, chapter) => {
  try {
    const response = await api.get(`/get_esv/${book}/${chapter}`);
    return response.data; // Assuming the response contains the ESV passage
  } catch (error) {
    console.error("Error fetching ESV passage:", error);
    throw error; // Rethrow the error for handling in the component
  }
};
