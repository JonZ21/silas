import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import Filters from "../components/Filters";
import ResourceList from "../components/ResourceList";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Sidebar = () => {
  const [value, setValue] = useState(0);

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
        <TextField id="outlined-basic" label="Search" variant="outlined" />
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
        <div className=" w-full h-1/4 rounded-md flex justify-evenly">
          <Filters />
        </div>
        <div className="h-3/4 w-full">
          <ResourceList />
        </div>
      </Box>
    </div>
  );
};

export default Sidebar;
