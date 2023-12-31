import React from 'react';
import {Outlet} from 'react-router-dom';

const Application = () => {
    return (
        <>
            <main>
                <Outlet/>
            </main>
        </>
    );
}

export default Application;