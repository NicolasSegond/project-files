import React from 'react';
import {Outlet} from 'react-router-dom';
import MenuNavBar from "./UI/menu/MenuAppBar";
import SideBar from "./UI/menu/MenuSideBar";
import {Grid} from "@mui/material";

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
    return 1;
}