const TOKEN_KEY = "token";

export function saveToken(token) {
    sessionStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return sessionStorage.getItem(TOKEN_KEY);
}

