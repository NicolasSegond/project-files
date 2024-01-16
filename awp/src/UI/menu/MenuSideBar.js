import {Drawer} from "@mui/material";
import * as React from "react";

function SideBar() {
    return (
        <Drawer
            variant="permanent"
            sx={{
                display: {xs: 'none', sm: 'block'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', position: 'relative'},
            }}
            open
        >
            <p> test </p>
        </Drawer>
    );
}

export default SideBar;