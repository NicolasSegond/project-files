// LoginForm.js

import React from 'react';
import {redirect, useLoaderData} from "react-router-dom";
import {customFetch} from "../../services/fetchCustom";
import apiConfig from "../../services/config";
import {getIdUser} from "../../services/auth";

const Home = ({}) => {
    const data = useLoaderData().files;
    const idUser = getIdUser(localStorage.getItem('token'));

    // Vérifiez si data existe et est un tableau
    if (!data || !Array.isArray(data)) {
        return <div>Aucune donnée à afficher.</div>;
    }

    return (
        <div>
            l'id user : {idUser}
            {data.map((item, index) => (
                <div key={index}>
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
};
export default Home;

export async function loader({}) {
    let {data, error} = await customFetch({
        url: apiConfig.apiUrl + '/api/files',
        method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
    );
    if(error && error.message && error.message.includes('LOGOUT NEEDED')){
        return redirect('/login');
    }

    return {
        files: data['hydra:member'],
    };
}