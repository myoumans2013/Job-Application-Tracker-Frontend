const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getInterviews = async () => {
    const response = await fetch(`${API_BASE_URL}/api/interviews/getAll`);

    if (!response.ok) {
        throw new Error("Failed to grab interviews.");
    }

    return response.json();
}

export const createInterview = async (id, interviewToSend) => {
    const response = await fetch(`${API_BASE_URL}/api/interviews/createInterview/${id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(interviewToSend)
    })
    if (!response.ok) {
        throw new Error("Failed to create Interview.")
    }

    return response.json();
}

export const deleteInterview = async (id) => {
    const response = await fetch(
        `${API_BASE_URL}/api/interviews/deleteInterview/${id}`,
        {
            method: "DELETE"
        }
    );
    if (!response.ok) {
        throw new Error("Interview was unable to be deleted.");
    }
}