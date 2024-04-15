import React, { useState, useContext, useEffect } from "react";
import Loading from "./Loading";
import BooksDropdown from "./BooksDropdown";
import { useBibleContext } from "../contexts/BibleContext";
import ChaptersDropdown from "./ChaptersDropdown";

const Bible = () => {
  const { selectedBook, setSelectedBook, setSelectedChapter, selectedChapter } =
    useBibleContext();
  const [showChapters, setShowChapters] = useState(false);
  const [chapterOptions, setChapterOptions] = useState([]);
  const [isBookDropdownFocused, setIsBookDropdownFocused] = useState(false);

  useEffect(() => {
    if (selectedBook) {
      setChapterOptions(createChapterOptions(selectedBook));
    }
  }, [selectedBook]);

  const handleBookChange = (book) => {
    setSelectedBook(book);
    setSelectedChapter({ value: 1, label: "1" });
    setShowChapters(true);
  };

  const createChapterOptions = (book) => {
    return Array.from({ length: book.chapters }, (v, k) => ({
      value: k + 1,
      label: `${k + 1}`,
    }));
  };

  const handleChapterChange = (chapter) => {
    setSelectedChapter(chapter);
  };

  const onBlur = () => {
    setIsBookDropdownFocused(false);
    setTimeout(() => {
      if (!isBookDropdownFocused) {
        setShowChapters(false);
      }
    }, 100);
  };

  return (
    <div className="w-full h-screen bg-slate-50 flex justify-center items-center flex-col">
      <div className="w-5/6 h-5/6 bg-white shadow-md rounded-3xl flex flex-col items-center">
        <div className="w-5/6 h-[100px] flex items-center justify-start">
          <BooksDropdown onChange={handleBookChange} onBlur={onBlur} />
          <div className=" ml-4">
            <ChaptersDropdown
              onChange={handleChapterChange}
              showChapters={showChapters}
              setShowChapters={setShowChapters}
              chapterOptions={chapterOptions}
              setIsBookDropdownFocused={setIsBookDropdownFocused}
            />
          </div>
        </div>
        <div className="flex items-center justify-center w-5/6 h-[30px]">
          <h1 className="text-2xl font-bold">
            {selectedBook.label} {selectedChapter.label}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Bible;
