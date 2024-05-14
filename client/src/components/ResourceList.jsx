import React, { useEffect, useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";
import { useBibleContext } from "../contexts/BibleContext";
import { fetchResources } from "../services/api";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import apj from "../images/apj.jpg";
import Loading from "./Loading";

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

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getResources = async () => {
      setResources(null);
      setLoading(true);
      try {
        const resources = await fetchResources(
          selectedPassage,
          "Please explain this"
        );
        setResources(resources.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setLoading(false);
      }
    };
    getResources();
  }, [selectedPassage]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center flex-col">
        <Loading />
        <div className="font-riffle text-6xl text-black opacity-100 mt-7">
          LOADING
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-y-scroll">
      <div className="flex flex-col w-full h-full">
        {resources && selectedPassage && resources.length > 0 ? (
          resources.map((resource, index) => (
            <div
              key={index}
              className="p-4 border-b flex flex-row cursor-pointer hover:bg-gray-100"
              onClick={() => {
                window.open(resource.url, "_blank");
              }}
            >
              <div className="w-1/6 mx-3 flex items-center justify-center">
                <img src={apj} className="w-[100px]" />
              </div>
              <div className="w-5/6 flex flex-col">
                <div className="text-lg font-bold">{resource.title}</div>
                <div className="text-sm">{resource.date}</div>
                <div className="text-sm">{resource.author}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 flex w-full h-full justify-center items-center">
            <div className="font-riffle text-6xl text-black opacity-100">
              SILAS
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceList;
