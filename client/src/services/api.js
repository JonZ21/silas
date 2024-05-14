// services/api.js
import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8000", // Adjust the base URL as needed
  baseURL: "https://silas-server-b53a2a62dc8e.herokuapp.com/",
});

export const fetchESVPassage = async (book, chapter) => {
  console.log("fetching ESV passage");
  try {
    const response = await api.get(`/get_esv/${book}/${chapter}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching ESV passage:", error);
    throw error; // Rethrow the error for handling in the component
  }
};

export const fetchResources = async (verse, question = "") => {
  try {
    const response = await api.get(`/related-resources/`, {
      params: {
        verse: verse,
        question: question,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching related verses:", error);
    throw error;
  }
};
