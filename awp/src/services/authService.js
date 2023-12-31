import {jwtDecode} from "jwt-decode";

export function isAuthenticated() {
    // Récupérez le token depuis le stockage local
    const token = localStorage.getItem('token');

    // Vérifiez si le token existe et s'il est expiré
    if (token) {
        // Decode the token to get the expiration date
        const decodedToken = jwtDecode(token);

        // Compare the current date with the token's expiration date
        return decodedToken.exp * 1000 > Date.now();
    }

    return false;
}
