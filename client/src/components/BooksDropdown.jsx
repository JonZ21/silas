import React from "react";
import Select from "react-select";

function BooksDropdown({ onChange, onBlur }) {
  const options = [
    { value: "Genesis", label: "Genesis", chapters: 50 },
    { value: "Exodus", label: "Exodus", chapters: 40 },
    { value: "Leviticus", label: "Leviticus", chapters: 27 },
    { value: "Numbers", label: "Numbers", chapters: 36 },
    { value: "Deuteronomy", label: "Deuteronomy", chapters: 34 },
    { value: "Joshua", label: "Joshua", chapters: 24 },
    { value: "Judges", label: "Judges", chapters: 21 },
    { value: "Ruth", label: "Ruth", chapters: 4 },
    { value: "1 Samuel", label: "1 Samuel", chapters: 31 },
    { value: "2 Samuel", label: "2 Samuel", chapters: 24 },
    { value: "1 Kings", label: "1 Kings", chapters: 22 },
    { value: "2 Kings", label: "2 Kings", chapters: 25 },
    { value: "1 Chronicles", label: "1 Chronicles", chapters: 29 },
    { value: "2 Chronicles", label: "2 Chronicles", chapters: 36 },
    { value: "Ezra", label: "Ezra", chapters: 10 },
    { value: "Nehemiah", label: "Nehemiah", chapters: 13 },
    { value: "Esther", label: "Esther", chapters: 10 },
    { value: "Job", label: "Job", chapters: 42 },
    { value: "Psalms", label: "Psalms", chapters: 150 },
    { value: "Proverbs", label: "Proverbs", chapters: 31 },
    { value: "Ecclesiastes", label: "Ecclesiastes", chapters: 12 },
    { value: "Song of Solomon", label: "Song of Solomon", chapters: 8 },
    { value: "Isaiah", label: "Isaiah", chapters: 66 },
    { value: "Jeremiah", label: "Jeremiah", chapters: 52 },
    { value: "Lamentations", label: "Lamentations", chapters: 5 },
    { value: "Ezekiel", label: "Ezekiel", chapters: 48 },
    { value: "Daniel", label: "Daniel", chapters: 12 },
    { value: "Hosea", label: "Hosea", chapters: 14 },
    { value: "Joel", label: "Joel", chapters: 3 },
    { value: "Amos", label: "Amos", chapters: 9 },
    { value: "Obadiah", label: "Obadiah", chapters: 1 },
    { value: "Jonah", label: "Jonah", chapters: 4 },
    { value: "Micah", label: "Micah", chapters: 7 },
    { value: "Nahum", label: "Nahum", chapters: 3 },
    { value: "Habakkuk", label: "Habakkuk", chapters: 3 },
    { value: "Zephaniah", label: "Zephaniah", chapters: 3 },
    { value: "Haggai", label: "Haggai", chapters: 2 },
    { value: "Zechariah", label: "Zechariah", chapters: 14 },
    { value: "Malachi", label: "Malachi", chapters: 4 },
    { value: "Matthew", label: "Matthew", chapters: 28 },
    { value: "Mark", label: "Mark", chapters: 16 },
    { value: "Luke", label: "Luke", chapters: 24 },
    { value: "John", label: "John", chapters: 21 },
    { value: "Acts", label: "Acts", chapters: 28 },
    { value: "Romans", label: "Romans", chapters: 16 },
    { value: "1 Corinthians", label: "1 Corinthians", chapters: 16 },
    { value: "2 Corinthians", label: "2 Corinthians", chapters: 13 },
    { value: "Galatians", label: "Galatians", chapters: 6 },
    { value: "Ephesians", label: "Ephesians", chapters: 6 },
    { value: "Philippians", label: "Philippians", chapters: 4 },
    { value: "Colossians", label: "Colossians", chapters: 4 },
    { value: "1 Thessalonians", label: "1 Thessalonians", chapters: 5 },
    { value: "2 Thessalonians", label: "2 Thessalonians", chapters: 3 },
    { value: "1 Timothy", label: "1 Timothy", chapters: 6 },
    { value: "2 Timothy", label: "2 Timothy", chapters: 4 },
    { value: "Titus", label: "Titus", chapters: 3 },
    { value: "Philemon", label: "Philemon", chapters: 1 },
    { value: "Hebrews", label: "Hebrews", chapters: 13 },
    { value: "James", label: "James", chapters: 5 },
    { value: "1 Peter", label: "1 Peter", chapters: 5 },
    { value: "2 Peter", label: "2 Peter", chapters: 3 },
    { value: "1 John", label: "1 John", chapters: 5 },
    { value: "2 John", label: "2 John", chapters: 1 },
    { value: "3 John", label: "3 John", chapters: 1 },
    { value: "Jude", label: "Jude", chapters: 1 },
    { value: "Revelation", label: "Revelation", chapters: 22 },
  ];

  return (
    <div className="w-[200px]">
      <Select
        options={options}
        onChange={onChange}
        placeholder={"Genesis"}
        isSearchable={true}
        onBlur={() => {
          onBlur();
        }}
      />
    </div>
  );
}

export default BooksDropdown;
