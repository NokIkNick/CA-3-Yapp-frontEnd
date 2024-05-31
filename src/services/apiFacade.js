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

export const postSubmit = async (newPostContent, username, currentThreadId) => {
    if (newPostContent.trim()) {
        const response = await fetch(`${BASE_URL}/protected/createPost`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                content: newPostContent,
                userName: username,
                threadId: currentThreadId,
            })
        });
        const data = await response.json();
        return data;
    }
}
export const replySubmit = async (newReplyContent,replyingToPostId,username) => {
        const response = await fetch(`${BASE_URL}/protected/createReply`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                content: newReplyContent,
                userName: username,
                parentPostId: replyingToPostId
            })
        });
        const data = await response.json();
        return data;
};

export const editPost = async (editContent,postIdToEdit) => {
        const response = await fetch(`${BASE_URL}/protected/editPost/${postIdToEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                content: editContent,
            })
        });
        const data = await response.json();
        return data;
};
export const editThread = async (editContent,threadIdToEdit) => {
    const response = await fetch(`${BASE_URL}/protected/editThread/${threadIdToEdit}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            content: editContent,
        })
    });
    const data = await response.json();
    return data;
};

export const editReply = async (editContent,replyIdToEdit) => {
        const response = await fetch(`${BASE_URL}/protected/editReply/${replyIdToEdit}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                content: editContent
            })
        });
        const data = await response.json();
        return data;
}
export const deleteReply = async (replyIdToEdit) => {
    const response = await fetch(`${BASE_URL}/protected/deleteReply/${replyIdToEdit}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    return data;
}
export const deletePost = async (postIdToEdit) => {
    const response = await fetch(`${BASE_URL}/protected/deletePost/${postIdToEdit}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    return data;
}
export const deleteThread = async (threadIdToEdit) => {
    const response = await fetch(`${BASE_URL}/protected/deleteThread/${threadIdToEdit}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    const data = await response.json();
    return data;
}

export const fetchThreadData = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/public/getThreadById/${id}`)
        const data = await response.json();
        console.log(data + "data in fetchThreadData");
        return data;
    } catch (error) {
        console.error('fetching data error', error);
    }
};

export function formatDate(createdDate) {
    // Extracting individual components
    const [year, month, day, hours, minutes, seconds, milliseconds] = createdDate;
    // Creating a new Date object
    const dateObject = new Date(year, month - 1, day, hours+2, minutes, seconds);
    // Formatting the date
    return dateObject.toLocaleString('da-DK'); // Adjust to your desired format
}
