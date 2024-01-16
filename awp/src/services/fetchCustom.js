import {addBearerToTheHeader, getToken, getTokenExpiration, refreshToken} from "./auth";

let refreshTokenVar = undefined;

export async function customFetch(parameters, authentificated = true) {
    let response = {data: null, error: null};
    let data;

    let requestConfigInit = {
        method: parameters.method ? parameters.method : 'GET',
        headers: parameters.headers ? parameters.headers : {},
        body: parameters.body ? JSON.stringify(parameters.body) : null
    };

    try {
        if (authentificated) {
            try {
                let token = getToken();
                const duration = getTokenExpiration(token.token);

                if (duration < 0) {
                    if (!refreshTokenVar) {
                        refreshTokenVar = refreshToken(token.refresh_token, true);
                    }
                    try {
                        const token = await refreshTokenVar;
                        token.token = token;
                    } catch (e) {
                    }
                }

                requestConfigInit = addBearerToTheHeader(token.token, requestConfigInit);
            } catch (e) {
                throw e;
            }
        }

        let res = await fetch(parameters.url, requestConfigInit);

        data = await res.json();
        response.data = data;

        if (!res.ok) {
            if (expirationErrorTestAndThrower(authentificated, data, res, true)) {
                let authTokens = getToken();

                if (!refreshTokenVar) {
                    refreshTokenVar = refreshToken(authTokens.refresh_token, false);
                }
                try {
                    const token = await refreshTokenVar;
                    authTokens.token = token;

                    requestConfigInit = addBearerToTheHeader(authTokens.token, requestConfigInit);
                } catch (e) {
                }

                res = await fetch(parameters.url, requestConfigInit);
                data = await res.json();
                response.data = data;

                if (!res.ok) {
                    expirationErrorTestAndThrower(true, data, res, false);
                }
            }
        }
    } catch (err) {
        if (err.message && err.message.includes('JWT Token not found')) {
            err.message = 'LOGOUT NEEDED - JWT Token not found';
        }
        response.error = err;
        response.data = null;
    } finally {
        refreshTokenVar = undefined;
    }
    console.log(response);
    return response;
}


export function expirationErrorTestAndThrower(authentificated, data, res, beforeSecondTry = false) {
    if (data.message && typeof data.message === 'string') {
        if (authentificated && data.message === 'Expired JWT Token') {
            if (beforeSecondTry) {
                return true;
            } else {
                throw new Error('LOGOUT NEEDED - Expiration error even after trying to refresh the token -- ');
            }
        } else {
            if (data.code) {
                throw new Error(data.message);
            }
            throw new Error(data.message);        }
    } else {
        throw new Error('Bad request response.');
    }
}