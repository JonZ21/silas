import React from "react";
import Loading from "./Loading";
import BooksDropdown from "./BooksDropdown";

const Bible = () => {
  const handleBookChange = (book) => {
    console.log(book);
  };
  return (
    <div className="w-full h-screen bg-slate-50 flex justify-center items-center flex-col">
      <div className="w-5/6 h-5/6 bg-white shadow-md rounded-3xl flex flex-col items-center">
        <div className="w-5/6 h-[100px] flex items-center justify-center">
          <BooksDropdown onChange={handleBookChange} />
        </div>
      </div>
    </div>
  );
};

export default Bible;
