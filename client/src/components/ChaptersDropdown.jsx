import React, { useContext } from "react";
import Select from "react-select";
import { useBibleContext } from "../contexts/BibleContext";

const ChaptersDropdown = ({
  showChapters,
  setShowChapters,
  onChange,
  chapterOptions,
  setIsbookDropdownFocused,
}) => {
  const { selectedChapter } = useBibleContext();
  const styles = {
    menu: (provided) => ({
      ...provided,
      width: "fit-content", // Adjust width to fit content
      minWidth: "310px", // Ensure a minimum width
    }),
    menuList: (provided) => ({
      ...provided,
      display: "grid", // Set display to grid for the options
      gridTemplateColumns: "repeat(auto-fill, minmax(30px, 1fr))", // Create columns that adapt to content width
      gap: "5px", // Space between grid items
    }),
    option: (provided, state) => ({
      ...provided,
      display: "flex", // Continue using flex for centering content within each option
      justifyContent: "center", // Center horizontally within each option
      alignItems: "center", // Center vertically within each option
      height: "30px", // Fixed height for each option
      borderRadius: "30%", // Circular edges
      fontSize: "12px", // Font size to ensure text fits
      padding: 0,
      margin: 2,
    }),
  };

  return (
    <div>
      <Select
        options={chapterOptions}
        styles={styles}
        menuIsOpen={showChapters}
        onMenuOpen={() => setShowChapters(true)}
        onMenuClose={() => setShowChapters(false)}
        onChange={onChange}
        openMenuOnClick={true}
        placeholder={"1"}
        value={selectedChapter}
        onFocus={() => setIsbookDropdownFocused(true)}
        onBlur={() => setIsbookDropdownFocused(false)}
      />
    </div>
  );
};

export default ChaptersDropdown;
