// RegisterForm.js

import React, {useState} from 'react';
import './Authentification.css';

const RegisterForm = ({onLogin}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmationPassword, setConfirmationPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('https://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            // Vérifiez si la réponse est un succès (status code 2xx)
            if (response.ok) {
                setMessage('Login successful!');

                const data = await response.json();
                const token = data.token;
                onLogin(token);
            } else {
                // Si la réponse n'est pas un succès, affichez un message d'erreur
                setMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Error during login:', error);

            // Affichez un message d'erreur dans votre composant React
            setMessage('Login failed. Please check your credentials.');
        }
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
                            <form className="form">
                                <input className={'div-wrapper'} type="email" placeholder="Email" value={email}
                                       onChange={(e) => setEmail(e.target.value)}/>
                                <input className={'overlap-3'} type="password" placeholder="Password" value={password}
                                       onChange={(e) => setPassword(e.target.value)}/>
                                <input className={'overlap-3'} type="password" placeholder="Password" value={confirmationPassword}
                                       onChange={(e) => setConfirmationPassword(e.target.value)}/>
                                <button type="button" className="overlap-1" onClick={handleLogin}>
                                    Register
                                </button>
                                <div className="overlap-group-wrapper">
                                    <div className="overlap-2">
                                        <img
                                            className="free-icon-google"
                                            alt="Free icon google"
                                            src="https://cdn.animaapp.com/projects/658716036c38307735fa4d48/releases/658726b270e6cc99f452197d/img/free-icon-google-300221-1.png"
                                        />
                                        <div className="text-wrapper-3">Sign in with Google</div>
                                    </div>
                                </div>
                            </form>
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
export default RegisterForm;
