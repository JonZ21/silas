import Bible from "./components/Bible";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState, useEffect } from "react";

function App() {
  const [sidebarWidth, setSidebarWidth] = useState(window.innerWidth / 2);
  const [dragging, setDragging] = useState(false);
  const minWidth = 500;
  const maxWidth = window.innerWidth - minWidth;

  // Event handler for mouse move
  const handleMouseMove = (e) => {
    if (dragging) {
      // Ensure the sidebar width doesn't exceed the window's bounds
      const newWidth = Math.max(Math.min(e.clientX, maxWidth), minWidth);
      setSidebarWidth(newWidth);
    }
  };

  // Event handler for mouse up
  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    // Attach event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Clean up function
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]); // Only re-bind if dragging state changes

  return (
    <div className="w-full h-screen bg-red-400 overflow-hidden">
      <Navbar />
      <div className="flex flex-row items-center justify-center">
        <div style={{ width: sidebarWidth }} className="bg-red-500">
          <Bible />
        </div>
        <div
          className="h-screen w-[4px] bg-gray-300 hover:bg-gray-500 transition duration-75 cursor-ew-resize"
          onMouseDown={() => {
            setDragging(true);
          }}
        ></div>
        <div className="flex-grow">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
