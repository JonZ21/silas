import React, { useState, useContext, useEffect, useRef } from "react";
import Loading from "../components/Loading";
import BooksDropdown from "../components/BooksDropdown";
import { useBibleContext } from "../contexts/BibleContext";
import ChaptersDropdown from "../components/ChaptersDropdown";
import { fetchESVPassage } from "../services/api";
import VersionDropdown from "../components/VersionDropdown";

const Bible = () => {
  const {
    selectedBook,
    setSelectedBook,
    setSelectedChapter,
    selectedChapter,
    selectedVerse,
    setSelectedVerse,
    setSelectedPassage,
  } = useBibleContext();
  const [showChapters, setShowChapters] = useState(false);
  const [chapterOptions, setChapterOptions] = useState([]);
  const [isBookDropdownFocused, setIsBookDropdownFocused] = useState(false);
  const [content, setContent] = useState("");
  const [verses, setVerses] = useState(["", ""]);
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
        setVerses(passage.data);
        console.log("passage: ", passage);
        setContent("passage");
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

  const createChapterOptions = (book) => {
    return Array.from({ length: book.chapters }, (v, k) => ({
      value: k + 1,
      label: `${k + 1}`,
    }));
  };

  const handleChapterChange = (chapter) => {
    setSelectedChapter(chapter);
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen bg-slate-50 flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-slate-50 flex justify-center items-center flex-col">
      <div className="w-5/6 h-5/6 bg-white shadow-md rounded-3xl flex flex-col items-center overflow-hidden">
        <div className="w-5/6 h-[100px] flex items-center justify-start mt-3">
          <BooksDropdown
            isBookDropdownFocused={isBookDropdownFocused}
            setIsBookDropdownFocused={setIsBookDropdownFocused}
          />
          <div className=" ml-4">
            <ChaptersDropdown
              onChange={handleChapterChange}
              showChapters={showChapters}
              setShowChapters={setShowChapters}
              chapterOptions={chapterOptions}
              setIsBookDropdownFocused={setIsBookDropdownFocused}
            />
          </div>
          <div className="ml-4">
            <VersionDropdown />
          </div>
        </div>
        <div className="flex items-center justify-start w-5/6 flex-col h-full">
          <h1 className="text-2xl font-bold m-3">
            {selectedBook.label} {selectedChapter.label}
          </h1>

          <div className="overflow-y-scroll mb-20 pr-10 text-center text-wrap">
            <p>
              {verses.map((verse, index) => (
                <span
                  key={index}
                  className={`hover:bg-slate-300 ${
                    verse == selectedVerse?.verse ? "bg-slate-300" : "bg-white"
                  } cursor-pointer`}
                  onClick={() => {
                    if (
                      index == selectedVerse?.index &&
                      selectedVerse?.verse == verse
                    ) {
                      setSelectedVerse(null);
                      setSelectedPassage("");
                      return;
                    }

                    setSelectedVerse({ index: index, verse: verse });
                    setSelectedPassage(
                      selectedBook.label +
                        " " +
                        selectedChapter.label +
                        ":" +
                        (index + 1).toString()
                    );
                  }}
                >
                  {index + 1} {verse}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bible;
