import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button sx={{ margin: 1 }} variant="contained" color="primary">
          Inicio
        </Button>
      </Link>

      <Link to="/favorites" style={{ textDecoration: 'none' }}>
        <Button sx={{ margin: 1 }} variant="contained" color="secondary">
          Favoritos
        </Button>
      </Link>

      <Link to="/about" style={{ textDecoration: 'none' }}>
        <Button sx={{ margin: 1 }} variant="contained" color="success">
          Acerca
        </Button>
      </Link>
    </nav>
  );
};

export default NavBar;
