import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { red, grey } from '@mui/material/colors';

const SignInButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
        backgroundColor: red[700],
    },
    width: 314,
    height: 38,
}));

const GoogleButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[50]),
    backgroundColor: grey[50],
    '&:hover': {
        backgroundColor: grey[500],
    },
    height: 38,
}));

const CustomizedButtons = ({ onClickSignIn }) => {
    return (
        <Stack spacing={2} direction="column">
            <SignInButton variant="contained" onClick={onClickSignIn}> Sign in </SignInButton>
            <GoogleButton variant="contained">
                <img
                    className="free-icon-google"
                    alt="Free icon google"
                    style={{ paddingRight: 10 }}
                    src="https://cdn.animaapp.com/projects/658716036c38307735fa4d48/releases/658726b270e6cc99f452197d/img/free-icon-google-300221-1.png"
                />
                Sign in with Google
            </GoogleButton>
        </Stack>
    );
}

export default CustomizedButtons;