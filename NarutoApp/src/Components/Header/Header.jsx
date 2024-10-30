import React from "react";
import NavBar from "../NavBar/NavBar"; 
import './Header.css'; 

function Header() {
  return (
    <header className="header-container">
      <img src="https://th.bing.com/th/id/R.811c4362811db64a92cdd06460e094e3?rik=fbOhXGMrTEbxrg&riu=http%3a%2f%2fwww.solofondos.com%2fwp-content%2fuploads%2f2015%2f11%2fNaruto-y-fuego-298198.jpg&ehk=kzzjtHiOSGkSr5%2fhAdZe84fI2jTiFsgFPWLPVRkXQUc%3d&risl=&pid=ImgRaw&r=0" alt="Imagen 1" className="header-image" />
      <div className="header-content">
        <h1><strong><i>Naruto Characters</i></strong></h1>
        <NavBar />
      </div>
      <img src="https://th.bing.com/th?id=OIP.j8XuUqeHkFNuX-Bu92uRKAHaFb&w=292&h=214&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="Imagen 2" className="header-image" />
    </header>
  );
}

export default Header;
