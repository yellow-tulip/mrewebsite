import React, { useState } from "react";
import { useAmbientSoundscape } from "./components/AmbientSoundscape";
import { Navigation } from "./components/Navigation";
import { GlobalStyles } from "./components/GlobalStyles";
import { WorkPage } from "./components/work/WorkPage";

// Router hook
const useRouter = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const navigate = (page) => {
    setCurrentPage(page);
  };

  return { currentPage, navigate };
};

// Main App component
const App = () => {
  const { currentPage, navigate } = useRouter();
  useAmbientSoundscape();

  return (
    <div className="min-h-screen bg-white">
      <GlobalStyles />
      <Navigation currentPage={currentPage} navigate={navigate} />
      {currentPage === "work" && <WorkPage />}
    </div>
  );
};

export default App;
