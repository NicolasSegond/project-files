// LoginForm.js

import React from 'react';
import {redirect} from "react-router-dom";
import {customFetch} from "../../services/fetchCustom";

const Home = ({token}) => {
    return (
        <div>
            <h1>Bienvenue sur la page d'accueil</h1>
            <p>Voici le token : {token}</p>
        </div>
    );
}
export default Home;

export async function loader({pages}) {
    if(pages){
        return;
    }

    let {data, error} = await customFetch({
            url: apiConfig.apiUrl + '/api/files',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
    if(error && error.message && error.message.includes('LOGOUT NEEDED')){
        return redirect('/logout');
    }

    return {
        files: data,
    };
}