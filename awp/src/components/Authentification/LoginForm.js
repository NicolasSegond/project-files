// LoginForm.js

import React, {useState} from 'react';
import './Authentification.css';
import {Form, useNavigate} from "react-router-dom";
import {TextField} from "@mui/material";
import CustomizedButtons from "../../UI/loginUI/Button";
import {customFetch} from "../../services/fetchCustom";
import apiConfig from "../../services/config";

const LoginForm = ({}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const [isValidEmail, setIsValidEmail] = useState(true);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleLogin = async () => {
        setIsValidEmail(validateEmail(email));

        if(!email || !password) {
            setMessage('Please fill all the fields.');
            return;
        }

        if (!isValidEmail) {
            setMessage('Please enter a valid email address.');
            return;
        }
            const dataAuthentication = {
                email: email,
                password: password,
            };

            let {data , error} = await customFetch({
                    url: apiConfig.apiUrl +'/api/login',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: dataAuthentication
                },
                false
            );

            if(error){
                setMessage(error.message);
            }

            localStorage.setItem('token', JSON.stringify(data));

            navigate("/");
    };
    return (
        <div className="index">
            <div className="overlap-wrapper">
                <div className="overlap">
                    <div className="overlap-group1">
                        <div className="left-side">
                            <div className="headline">
                                <div className="overlap-4">
                                    <div className="welcome-back">WELCOME BACK</div>
                                    <p className="p">Welcome back! Please enter your details.</p>
                                </div>
                            </div>

                            <Form className={"form"}>
                                <TextField id="outlined-basic" type={"email"} className={"textField"} label="Email"
                                           variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <TextField id="outlined-basic" type={"password"} className={"textField"} label="Password"
                                           variant="outlined" margin={"dense"} value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                <a href={"#"} className="text-wrapper-8">Forgot password</a>
                                <CustomizedButtons onClickSignIn={handleLogin}/>
                            </Form>
                            <p className="don-t-have-an">
                                <span className="text-wrapper">Don’t have an account?</span>
                                <span className="span">&nbsp;</span>
                                <a href="/register" className="text-wrapper-2">Sign up fo free!</a>
                            </p>
                            {message && <p>{message}</p>}
                        </div>
                        <img
                            className="right-side"
                            alt="Right side"
                            src="https://cdn.animaapp.com/projects/658716036c38307735fa4d48/releases/658726b270e6cc99f452197d/img/right-side.png"
                        />
                    </div>
                </div>
            </div>
        </div>
    );


}
export default LoginForm;
