import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Filters from "../components/Filters";
import ResourceList from "../components/ResourceList";
import { useBibleContext } from "../contexts/BibleContext";

const Sidebar = () => {
  const { selectedPassage } = useBibleContext();

  return (
    <div className="w-full h-screen bg-slate-100 flex flex-col justify-center items-center">
      <Box
        sx={{
          width: "90%",
          background: "white",
          borderRadius: 3,
          boxShadow: 3,
          height: "20%",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField id="outlined-basic" label="Ask Silas" variant="outlined" />
        <Typography variant="h4"></Typography>
      </Box>
      <Box
        sx={{
          width: "90%",
          background: "white",
          borderRadius: 3,
          boxShadow: 3,
          height: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          flexDirection: "column",
        }}
      >
        <div className=" w-full h-1/5 rounded-md flex justify-evenly border-b">
          {selectedPassage ? (
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-sans-serif">
                Showing Resources on {selectedPassage}
              </h1>
            </div>
          ) : (
            <div className="flex items-center justify-center">
              <h1 className="text-2xl font-sans-serif">
                Click a verse or ask a question to get started!
              </h1>
            </div>
          )}
          {/* <Filters /> */}
        </div>
        <div className="h-4/5 w-full">
          <ResourceList />
        </div>
      </Box>
    </div>
  );
};

export default Sidebar;
