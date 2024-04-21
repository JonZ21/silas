import React from "react";
import Select from "react-select";
import { useBibleContext } from "../contexts/BibleContext";

function VersionDropdown() {
  const { setSelectedVersion, selectedVersion } = useBibleContext();

  const onChange = (version) => {
    setSelectedVersion(version);
  };

  const options = [{ value: "ESV", label: "ESV" }];

  return (
    <div className="w-[90px]">
      <Select
        options={options}
        onChange={onChange}
        placeholder={"ESV"}
        isSearchable={true}
        value={selectedVersion}
      />
    </div>
  );
}

export default VersionDropdown;
