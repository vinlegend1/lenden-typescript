import * as http from './httpService';
import JwtDecode from 'jwt-decode';

interface DecodedUser {
	userid: string;
	sub: string;
}

const tokenKey = 'token';
const token = getToken();

if (token) http.setToken(token);

export function logout() {
	localStorage.removeItem(tokenKey);
	window.location.assign('/');
}

export function getCurrentUser() {
	const jwt = getToken();
	try {
		if (jwt) {
			const decoded: DecodedUser = JwtDecode(jwt);
			return decoded;
		}
		return null;
	} catch (ex) {
		return null;
	}
}

export function setToken(token: string) {
	localStorage.setItem(tokenKey, token);
}

export function getToken() {
	return localStorage.getItem(tokenKey);
}
export function deleteToken() {
	return localStorage.removeItem(tokenKey);
}

export function tokenListener() {
	window.addEventListener('storage', event => {
		if (event.key === 'token') window.location.reload();
	});
}

tokenListener();
