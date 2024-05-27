import {BASE_URL} from "../utils/globalVariables.js"
import {BASE_URL2} from "../utils/globalVariables.js"

export const fetchThreads = async () => {
    const response = await fetch(`${BASE_URL2}/public/getAllThreads`,{
        method:"GET",
        headers: {
            "Content-Type":"application/json"
        }
    });

    if(!response.ok){
        throw new Error("No network connection")
    }
    const data = await response.json();
    return data;
}


export const login = async (username, password) => {
        const response = await fetch(`${BASE_URL2}/security/auth/login`, {
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
        const response = await fetch(`${BASE_URL2}/security/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                name: name,
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
    const response = await fetch(`${BASE_URL2}/public/getCategories`, {
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
