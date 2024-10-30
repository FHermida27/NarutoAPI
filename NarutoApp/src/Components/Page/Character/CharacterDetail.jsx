import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typography, Box, IconButton, Snackbar, Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; 
import { db } from "../../FirebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import "./CharacterDetail.css";

function CharacterDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://dattebayo-api.onrender.com/characters/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error("Error fetching character:", error);
      }
    };
    fetchCharacter();
  }, [id]);

  const handleFavoriteClick = async () => {
    try {
      const favoriteDocRef = doc(db, 'favorites', `${character.id}-${new Date().getTime()}`);
      await setDoc(favoriteDocRef, {
        id: character.id,
        name: character.name,
        birthdate: character.personal.birthdate,
        images: character.images,
      });
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error saving favorite:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const toggleDetails = () => {
    setShowDetails(prevState => !prevState);
  };

  if (!character) return <p>Loading...</p>;

  const isRockLee = character.id === 739;

  return (
    <div className="character-detail-container">
      <Box className="character-detail">
        <Box className="character-carousel">
          <Carousel showThumbs={false} infiniteLoop autoPlay>
            {character.images.map((image, index) => (
              <div key={index}>
                <img src={image} alt={`${character.name} ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        </Box>

        <Box className="character-info">
          <header>
            <Typography variant="h4" gutterBottom>{character.name}</Typography>
          </header>
          <IconButton 
            onClick={toggleDetails} 
            className="expand-button">
            <ExpandMoreIcon style={{ fontSize: '2rem', color: 'black' }} />
          </IconButton>
          
          {showDetails && (
            <>
              {isRockLee ? (
                <>
                  <Typography variant="body1"><strong>Debut:</strong> {character.debut.manga} (Manga), {character.debut.anime} (Anime), {character.debut.novel} (Novel), {character.debut.movie} (Movie)</Typography>
                  <br />
                  <Typography variant="body1"><strong>Familia:</strong> Hijo: {character.family.son}</Typography>
                  <br />
                  <Typography variant="body1"><strong>Jutsu:</strong> {character.jutsu.slice(0, 10).join(" - ")}...</Typography>
                  <br />
                  <Typography variant="body1"><strong>Tipo de Naturaleza:</strong> {character.natureType ? character.natureType.join(" - ") : "No especificado"}</Typography>
                  <br />
                  <Typography variant="body1"><strong>Fecha de Nacimiento:</strong> {character.personal.birthdate}</Typography>
                  <br />
                  <Typography variant="body1"><strong>Clan:</strong> {character.personal.clan}</Typography>
                  <br />
                  <Typography variant="body1"><strong>Afiliación:</strong> {character.personal.affiliation.join(" - ")}</Typography>
                  <br />
                  <Typography variant="body1"><strong>Rango Ninja:</strong> {character.rank.ninjaRank.PartII}</Typography>
                </>
              ) : (
                <>
                  <Typography variant="body1"><strong>Debut:</strong> {character.debut.manga} (Manga), {character.debut.anime} (Anime)</Typography>
                  <br />
                  <Typography variant="body1"><strong>Familia:</strong> Padre: {character.family.father}, Madre: {character.family.mother}</Typography>
                  <br />
                  <Typography variant="body1"><strong>Jutsu:</strong> {character.jutsu.slice(0, 10).join(" - ")}...</Typography>
                  <br />
                  <Typography variant="body1"><strong>Tipo de Naturaleza:</strong> {character.natureType.join(" - ")}</Typography>
                  <br />
                  <Typography variant="body1"><strong>Fecha de Nacimiento:</strong> {character.personal.birthdate}</Typography>
                  <br />
                  <Typography variant="body1"><strong>Clan:</strong> {character.personal.clan}</Typography>
                  <br />
                  <Typography variant="body1"><strong>Afiliación:</strong> {character.personal.affiliation.join(" - ")}</Typography>
                </>
              )}
              <IconButton 
                color="secondary" 
                onClick={handleFavoriteClick} 
                className="favorite-button">
                <FavoriteIcon style={{ color: 'red'}} /> Agregar Favorito
              </IconButton>
            </>
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Favorito guardado!"
        autoHideDuration={3000}
      />
    </div>
  );
}

export default CharacterDetail;
