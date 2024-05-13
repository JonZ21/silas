import React, { useEffect } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useBibleContext } from "../contexts/BibleContext";
import { fetchResources } from "../services/api";

const ResourceList = () => {
  const {
    resourceFilter,
    setResourceFilter,
    authorFilter,
    setAuthorFilter,
    resources,
    setResources,
  } = useSidebarContext();

  const { selectedPassage } = useBibleContext();

  useEffect(() => {
    const getResources = async () => {
      try {
        const resources = await fetchResources(
          selectedPassage,
          "Please explain this"
        );
        setResources(resources.data);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };
    getResources();
  }, [selectedPassage]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full h-full bg-blue-300 overflow-y-scroll">
        {/* {resources && resources.length > 0 ? (
          resources.map((resource, index) => (
            <div key={index} className="p-4 border-b border-blue-500">
              <div className="text-lg font-bold">{resource.title}</div>
              <div className="text-sm">{resource.author}</div>
            </div>
          ))
        ) : (
          <div className="p-4">No resources found</div>
        )} */}
      </div>
    </div>
  );
};

export default ResourceList;
