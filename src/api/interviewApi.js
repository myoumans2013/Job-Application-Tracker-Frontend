const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getInterviews = async () => {
    const response = await fetch(`${API_BASE_URL}/api/interviews`);

    if (!response.ok) {
        throw new Error("Failed to grab interviews.");
    }

    return response.json();
}

export const deleteInterview = async () => {

}