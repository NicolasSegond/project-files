import {jwtDecode} from "jwt-decode";
import dayjs from "dayjs";

export function getToken() {
    const tokens = localStorage.getItem('token');

    if (!tokens) {
        throw new Error('LOGOUT NEEDED - tokens not found');
    }

    try {
        const TokensOk = JSON.parse(tokens);

        if (TokensOk.token && TokensOk.refresh_token && typeof TokensOk.token === 'string' && typeof TokensOk.refresh_token === 'string') {
            return TokensOk;
        } else {
            throw new Error('LOGOUT NEEDED - Invalid tokens');
        }
    } catch (e) {
        throw new Error('LOGOUT NEEDED - Invalid tokens');
    }
}

export function getTokenExpiration(token) {
    try{
        const exp = jwtDecode(token).exp;
        const duration = dayjs.unix(exp).diff(dayjs());

        return duration;
    } catch (e) {
        throw new Error('LOGOUT NEEDED - Unable to extract token expiration');
    }
}

export async function refreshToken(refreshtoken) {
    let response = await fetch(apiConfig.apiUrl + '/api/token/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'refresh_token': refreshtoken})
    });

    if (!response.ok) {
        throw new Error('Impossible to refresh token');
    }

    let data = await response.json();
    localStorage.setItem('token', JSON.stringify(data));

    return data.token;
}

export function addBearerToTheHeader(token, requestConfigInit = {}) {
    if (!token || typeof token != 'string') {
        return requestConfigInit;
    }
    if (!requestConfigInit.headers || typeof requestConfigInit.headers != 'object') {
        requestConfigInit.headers = {};
    }
    return {
        ...requestConfigInit,
        'headers': {
            ...requestConfigInit.headers,
            ...{
                'Authorization': 'Bearer ' + token
            }
        }
    };
}