const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getApplications = async () => {
    const response = await fetch(`${API_BASE_URL}/api/applications`)

    if (!response.ok) {
        throw new Error("Failed to fetch applications")
    }

    return response.json();
}

// delete Application API
export const deleteApplication = async (id) => {
    const response = await fetch(
        `https://spring-boot-job-application-api.onrender.com/api/applications/${id}`,
        {
            method: "DELETE"
        })

    if (!response.ok) {
        throw new Error("Cannot delete Application")
    }

    return response.json();

}