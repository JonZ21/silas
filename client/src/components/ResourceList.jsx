import React, { useEffect } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useBibleContext } from "../contexts/BibleContext";
import { fetchResources } from "../services/api";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import apj from "../images/apj.jpg";

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
    <div className="w-full h-full overflow-y-scroll">
      <div className="flex flex-col w-full h-full">
        {resources && resources.length > 0 ? (
          resources.map((resource, index) => (
            <div
              key={index}
              className="p-4 border-b flex flex-row cursor-pointer hover:bg-gray-100"
              onClick={() => {
                window.open(resource.url, "_blank");
              }}
            >
              <div className="w-[100px] mx-3 flex items-center justify-center">
                <img src={apj} className="w-full" />
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-bold">{resource.title}</div>
                <div className="text-sm">{resource.date}</div>
                <div className="text-sm">{resource.author}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4">No resources found</div>
        )}
      </div>
    </div>
  );
};

export default ResourceList;
