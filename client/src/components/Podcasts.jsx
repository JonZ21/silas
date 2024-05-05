import React, { useEffect, useState } from "react";
import { fetchRelated } from "../services/api";
import { useBibleContext } from "../contexts/BibleContext";

const Podcasts = () => {
  const { selectedVerse, selectedBook, selectedPassage, setSelectedPassage } =
    useBibleContext();
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const podcasts = await fetchRelated(
          selectedPassage,
          "Please explain this!"
        );
        console.log("podcasts: ", podcasts);
      } catch (error) {
        console.error("Error fetching podcasts:", error);
      }
    };
    fetchPodcasts();
  }, [selectedPassage]);

  return (
    <div>
      Podcasts
      <div></div>
    </div>
  );
};

export default Podcasts;
