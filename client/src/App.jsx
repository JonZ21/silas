import Bible from "./components/Bible";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="w-full h-screen bg-red-400 overflow-hidden">
      <Navbar />
      <div className="flex flex-row items-center justify-center">
        <div className="w-1/2 mt-3">
          <Bible />
        </div>
        <div className="w-1/2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}

export default App;
