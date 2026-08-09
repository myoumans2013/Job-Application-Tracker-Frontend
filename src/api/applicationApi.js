const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getApplications = async () => {
    const response = await fetch(`${API_BASE_URL}/api/applications`)

    if (!response.ok) {
        throw new Error("Failed to fetch applications")
    }

    return response.json();
}
