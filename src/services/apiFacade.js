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


export const register = async (email, name, username, password) => {
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