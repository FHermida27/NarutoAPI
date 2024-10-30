import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, IconButton, Snackbar } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import "./CharacterDetail.css";

function CharacterCard({ character }) {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleFavoriteClick = async () => {
    try {
      const favoriteData = {
        name: character.name,
        birthdate: character.personal?.birthdate || '',
        images: character.images || [],
      };

      const uniqueId = `${character.id}-${Date.now()}`; 
      
      await setDoc(doc(db, 'favorites', uniqueId), favoriteData);
      console.log('Favorito guardado correctamente');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error al guardar favorito: ', error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card className="character-card">
      <CardMedia
        component="img"
        height="250"
        image={character.images[0]} 
        alt={character.name}
      />
      <CardContent>
        <Typography variant="h5">{character.name}</Typography>
        <Link to={`/character/${character.id}`}>
          <Typography variant="body2" color="primary">
            Ver detalles
          </Typography>
        </Link>
        <IconButton 
          color="secondary" 
          onClick={handleFavoriteClick} 
          aria-label={`Agregar ${character.name} a favoritos`}
        >
          <FavoriteIcon style={{ color: 'red' }} />
        </IconButton>
      </CardContent>
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Favorito guardado!"
        autoHideDuration={3000}
      />
    </Card>
  );
}

export default CharacterCard;
