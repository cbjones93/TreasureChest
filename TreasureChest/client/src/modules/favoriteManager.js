import { getToken } from "./authManager";
const baseUrl = '/api/favorite';

export const getFavoritesByUserId = (id) => {
    return getToken().then((token) => {
        return fetch(`${baseUrl}/favoritesbyuser/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get favorites.");
            }
        });
    });
}