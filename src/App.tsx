import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import RepositoryPage from "./Pages/Repository/Repository";
import Home from "./Pages/Home/Home";
import Favorites from "./Pages/Favorites/Favorites";
import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />;
        <Route path="/repository/:owner/:repo" element={<RepositoryPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
