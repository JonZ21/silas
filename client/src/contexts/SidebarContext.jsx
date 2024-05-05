import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [resourceFilter, setResourceFilter] = useState(null);
  const [authorFilter, setAuthorFilter] = useState(null);
  const [resources, setResources] = useState([]); // Resources is an array of objects with the following shape: [{ title: "Resource Title", author: "Resource Author" }

  return (
    <SidebarContext.Provider
      value={{
        resourceFilter,
        setResourceFilter,
        authorFilter,
        setAuthorFilter,
        resources,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarContext = () => useContext(SidebarContext);
