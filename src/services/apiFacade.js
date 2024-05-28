import {BASE_URL, BASE_URL2} from "../utils/globalVariables.js"

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
export function formatDate(createdDate) {
    // Extracting individual components
    const [year, month, day, hours, minutes, seconds, milliseconds] = createdDate;
    // Creating a new Date object
    const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
    // Formatting the date
    return dateObject.toLocaleString(); // Adjust to your desired format
}
