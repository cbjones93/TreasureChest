import { getToken } from "./authManager";
const baseUrl = '/api/category';

export const getAllCategories = () => {
    return getToken().then((token) => {
        return fetch(baseUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to get categories.");
            }
        });
    });
}

export const getPostByCategoryId = (id) => {
    return getToken().then((token) => {
        return fetch(`/api/post/GetCategory/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(resp => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error("An unknown error occurred while trying to delete post.");
            }
        });
    });
}