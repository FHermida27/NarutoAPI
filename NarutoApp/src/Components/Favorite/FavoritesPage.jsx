import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../FirebaseConfig";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import "./FavoritesPage.css";
import FavoriteIcon from "@mui/icons-material/Favorite";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const querySnapshot = await getDocs(collection(db, "favorites"));
      const favoritesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFavorites(favoritesData);
    };
    fetchFavorites();
  }, []);

  return (
    <div className="favorites">
      <header className="favorites-header">
        <img
          src="https://th.bing.com/th/id/OIP.221sQAt9WRvboowz-y8hBgHaEo?w=256&h=185&c=7&r=0&o=5&pid=1.7"
          alt="Imagen izquierda"
          className="header-image"
        />
        <h2>
          <font color="white">Favoritos</font>
        </h2>
        <img
          src="https://th.bing.com/th/id/OIP.TjGS1ZvlykQxmt2a45-8AQHaEK?w=327&h=187&c=7&r=0&o=5&pid=1.7"
          alt="Imagen derecha"
          className="header-image"
        />
      </header>
      <div className="favorites-grid">
        {favorites.map((favorite) => (
          <Card key={favorite.id} className="favorite-card">
              <CardMedia
              component="img"
              height="250"
              image={ favorite.id === "515"? "https://kahramanbaykus.com/wp-content/uploads/2018/02/jiraya_sage_mode_by_vergildvs-d3jxmyv.png"
                  : favorite.images[0]
              }
              alt={favorite.name}
            />

            <CardContent>
              <Typography variant="h5">{favorite.name}</Typography>
              <Typography variant="body1">
                Cumpleaños: {favorite.birthdate}
              </Typography>
              <FavoriteIcon style={{ color: "red" }} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FavoritesPage;
