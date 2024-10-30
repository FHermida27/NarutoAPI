import React, { useEffect, useState } from "react";
import axios from "axios";
import CharacterCard from "../Character/CharacterCard";
import "./HomePage.css";

function HomePage() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://dattebayo-api.onrender.com/characters")
      .then(response => {
        setCharacters(response.data.characters); 
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="character-list">
      {characters.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}

export default HomePage;
