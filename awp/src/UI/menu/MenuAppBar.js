import * as React from 'react';
import Container from '@mui/material/Container';
import {
    Avatar,
    IconButton,
    InputBase,
    Paper,
    Toolbar,
    Typography
} from "@mui/material";
import Logo from '../../assets/logo.png';
import SearchIcon from '@mui/icons-material/Search';
import DialpadIcon from '@mui/icons-material/Dialpad';
import {Box} from "@mui/system";

function ResponsiveAppBar() {
    return (
        <>
                <Container maxWidth="auto" style={{background: '#ffffff', padding: 0, margin: 0}}>
                    <Toolbar style={{padding: 0, margin: 0}}>
                        <img src={Logo} alt="logo" style={{marginLeft: 30, width: 90, height: 90}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontWeight: 700,
                                color: 'black',
                                textDecoration: 'none',
                            }}
                        >
                            Drive
                        </Typography>
                        <Paper
                            elevation={3} sx={{
                            ml: '50px',
                            mr: '5px',
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: 600,
                            borderRadius: 10,
                        }}
                        >
                            <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                                <SearchIcon/>
                            </IconButton>
                            <InputBase
                                sx={{ml: 1, flex: 1}}
                                placeholder="Rechercher dans Drive"
                                inputProps={{'aria-label': 'search google maps'}}
                            />
                        </Paper>
                        <Box sx={{flexGrow: 1}}/>
                        <a href="#"><DialpadIcon
                            sx={{ml: 'auto', mr: 3, width: 25, height: 25, color: '#000000', cursor: "pointer"}}/></a>
                        <Avatar sx={{mr: 3, width: 40, height: 40, bgcolor: 'primary.main'}}>N</Avatar>
                    </Toolbar>
                </Container>

        </>
    )
        ;
}

export default ResponsiveAppBar;
