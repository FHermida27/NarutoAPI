import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Components/Page/HomePage/HomePage";
import CharacterDetail from "./Components/Page/Character/CharacterDetail";
import FavoritesPage from "./Components/Favorite/FavoritesPage";
import Header from "./Components/Header/Header";
import AboutPage from "./Components/About/About";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
