import React, { createContext, useContext, useState } from "react";

const BibleContext = createContext();

export const BibleProvider = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState({
    value: "Genesis",
    label: "Genesis",
    chapters: 50,
  });
  const [selectedChapter, setSelectedChapter] = useState({
    value: 1,
    label: "1",
  });
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [selectedPassage, setSelectedPassage] = useState(""); // SelectedPassage is the book, chapter, and verse range
  const [selectedVersion, setSelectedVersion] = useState("ESV");

  return (
    <BibleContext.Provider
      value={{
        selectedBook,
        setSelectedBook,
        selectedChapter,
        setSelectedChapter,
        selectedVerse,
        setSelectedVerse,
        selectedVersion,
        setSelectedVersion,
        selectedPassage,
        setSelectedPassage,
      }}
    >
      {children}
    </BibleContext.Provider>
  );
};

export const useBibleContext = () => useContext(BibleContext);
