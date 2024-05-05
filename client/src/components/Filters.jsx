import React from "react";
import Select from "react-select";
import { useSidebarContext } from "../contexts/SidebarContext";

function Filters() {
  const { setResourceFilter, setAuthorFilter, resourceFilter, authorFilter } =
    useSidebarContext();

  const handleResourceChange = (resource) => {
    setResourceFilter(resource);
  };

  const handleAuthorChange = (author) => {
    setAuthorFilter(author);
  };

  const resourceOptions = [
    { value: "Podcasts", label: "Podcasts" },
    { value: "Sermons", label: "Podcasts" },
  ];

  const authorOptions = [
    { value: "John Piper", label: "John Piper" },
    { value: "Tim Keller", label: "Tim Keller" },
  ];

  return (
    <div className="w-full flex justify-center items-center space-x-2">
      <div className="w-[200px]">
        <Select
          options={resourceOptions}
          onChange={handleResourceChange}
          placeholder={"resource"}
          isSearchable={false}
          value={resourceFilter}
          isClearable={true}
        />
      </div>
      <div className="w-[200px]">
        <Select
          options={authorOptions}
          onChange={handleAuthorChange}
          placeholder={"author"}
          isSearchable={false}
          value={authorFilter}
          isClearable={true}
        />
      </div>
    </div>
  );
}

export default Filters;
