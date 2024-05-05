import React from "react";
import { useSidebarContext } from "../contexts/SidebarContext";

const ResourceList = () => {
  const { resourceFilter, setResourceFilter, authorFilter, setAuthorFilter } =
    useSidebarContext();

  return (
    <div className="flex flex-col w-full h-full bg-blue-300 overflow-y-scroll"></div>
  );
};

export default ResourceList;
