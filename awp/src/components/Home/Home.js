// LoginForm.js

import React from 'react';

const Home = ({token}) => {
    return (
        <div>
            <h1>Bienvenue sur la page d'accueil</h1>
            <p>Voici le token : {token}</p>
        </div>
    );
}
export default Home;
