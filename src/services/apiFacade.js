import {BASE_URL} from "../utils/globalVariables.js"

export const fetchThreads = async () => {
    const response = await fetch(`${BASE_URL}/public/getAllThreads`,{
        method:"GET",
        headers: {
            "Content-Type":"application/json"
        }
    });

    if(!response.ok){
        throw new Error("No network connection")
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export const fetchThreadsByUserId = async (userId) => {
    const response = await fetch(`${BASE_URL}/public/getThreadsByUserId/${userId}`,{
        method:"GET",
        headers: {
            "Content-Type":"application/json"
        }
    });
    if(!response.ok){
        throw new Error("No network connection")
    }
    const data = await response.json();
    console.log(data);
    return data;
}

export const fetchPostsByUserId = async (userId) => {
    const response = await fetch(`${BASE_URL}/public/getPostsByUserId/${userId}`,{
        method:"GET",
        headers: {
            "Content-Type":"application/json"
        }
    });
    if(!response.ok){
        throw new Error("No network connection")
    }
    const data = await response.json();
    console.log(data);
    return data;
}


export const login = async (username, password) => {
        const response = await fetch(`${BASE_URL}/security/auth/login`, {
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



export const register = async (email, username, password) => {
        const response = await fetch(`${BASE_URL}/security/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
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

export const createThread = async (thread, token) => {
    const response = await fetch(`${BASE_URL}/protected/createThread`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
    },
        body: JSON.stringify({
            title: thread.title,
            content: thread.content,
            category: thread.category,
            userName: thread.author
        })
    });
    const data = await response.json();
    if(!data){
        throw new Error("Could not create thread");
    }
    return data;
}


export function formatDate(createdDate) {
    // Extracting individual components
    const [year, month, day, hours, minutes, seconds, milliseconds] = createdDate;
    // Creating a new Date object
    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
    // Formatting the date
    return dateObject.toLocaleString(); // Adjust to your desired format
}
