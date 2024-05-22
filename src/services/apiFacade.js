import {BASE_URL} from "../utils/globalVariables.js"


export const login = async (username, password) => {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();
        if(!data.token){
            throw new Error("Invalid credentials. Try again");
        }
        return data;
}


export const register = async (username, password) => {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();
        if(!data.token){
            throw new Error("Invalid credentials. Try again");
        }
        return data;
}


export const fetchCategories = async () => {
    const response = await fetch(`${BASE_URL}/public/getCategories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await response.json();
    if(!data){
        throw new Error("Could not fetch categories");
    }
    return data;
}
