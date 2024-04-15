import React, { useState, useContext, useEffect, useRef } from "react";
import Loading from "./Loading";
import BooksDropdown from "./BooksDropdown";
import { useBibleContext } from "../contexts/BibleContext";
import ChaptersDropdown from "./ChaptersDropdown";
import { fetchESVPassage } from "../services/api";

const Bible = () => {
  const { selectedBook, setSelectedBook, setSelectedChapter, selectedChapter } =
    useBibleContext();
  const [showChapters, setShowChapters] = useState(false);
  const [chapterOptions, setChapterOptions] = useState([]);
  const [isBookDropdownFocused, setIsBookDropdownFocused] = useState(false);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (selectedBook) {
      setChapterOptions(createChapterOptions(selectedBook));
    }
  }, [selectedBook]);

  useEffect(() => {
    const fetchPassage = async () => {
      try {
        setIsLoading(true);
        const passage = await fetchESVPassage(
          selectedBook.value,
          selectedChapter.value
        );
        setIsLoading(false);
        setContent(passage);
        setTimeout(() => {
          if (contentRef.current) {
            contentRef.current.scrollTo({ behavior: "smooth", top: 0 });
          }
        }, 100);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching ESV passage:", error);
      }
    };
    fetchPassage();
  }, [selectedBook, selectedChapter]);

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
        <div className="flex items-center justify-start w-5/6 h-[700px] flex-col">
          <h1 className="text-2xl font-bold">
            {selectedBook.label} {selectedChapter.label}
          </h1>
          {isLoading ? (
            <div className="h-[550px] flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            content &&
            content.passages &&
            content.passages.length > 0 && (
              <div
                className="w-full h-[550px] overflow-auto mt-4 text-center p-3"
                ref={contentRef}
              >
                <p>{content.passages[0]}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Bible;
