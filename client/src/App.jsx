import Bible from "./components/Bible";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="w-full h-full bg-gray-400 ">
      <Navbar />
      <div className="flex flex-row items-center justify-center">
        <div className="w-1/2">
          <Bible />
        </div>
        <div className="w-1/2">
          <h1 className="text-4xl font-bold text-white font-mono pt-10">
            {" "}
            Loading Silas
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
