import React from 'react';
import {Outlet, redirect} from 'react-router-dom';
import MenuNavBar from "./UI/menu/MenuAppBar";
import SideBar from "./UI/menu/MenuSideBar";
import {Grid} from "@mui/material";
import {customFetch} from "./services/fetchCustom";
import apiConfig from "./services/config";

const Application = () => {
    return (
        <>
            <Grid container>
                {/* Barre de navigation */}
                <Grid item xs={12}>
                    <MenuNavBar />
                </Grid>

                {/* Barre latérale */}
                <Grid item xs={2}>
                    <SideBar />
                </Grid>

                {/* Contenu principal */}
                <Grid item xs={10}>
                    <main style={{margin: 5}}>
                        <Outlet />
                    </main>
                </Grid>
            </Grid>
        </>
    );
}

export default Application;

export async function loader() {
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